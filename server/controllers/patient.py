from fastapi import HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
from datetime import datetime
from config.database import get_db
from models.patient import patient_schema, create_patient_document
from services.ai_triage import analyze_patient
from services.queue_manager import reorder_queue, get_queue_stats

# ── Request Schemas ───────────────────────────────────
class VitalsSchema(BaseModel):
    blood_pressure:    Optional[str] = "N/A"
    pulse:             Optional[str] = "N/A"
    temperature:       Optional[str] = "N/A"
    oxygen_saturation: Optional[str] = "N/A"

class RegisterPatientRequest(BaseModel):
    name:            str
    age:             int
    gender:          str
    chief_complaint: str
    symptoms:        List[str] = []
    vitals:          Optional[VitalsSchema] = None

class UpdateStatusRequest(BaseModel):
    status: str

class UpdateVitalsRequest(BaseModel):
    vitals: VitalsSchema

# ── Register Patient ──────────────────────────────────
def register_patient(data: RegisterPatientRequest, current_user: dict):
    db = get_db()

    if not data.name or not data.chief_complaint:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide patient name and chief complaint"
        )

    if data.age < 0 or data.age > 150:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide a valid age"
        )

    # Build patient document
    vitals_dict = data.vitals.dict() if data.vitals else {}
    patient_data = {
        "name":            data.name,
        "age":             data.age,
        "gender":          data.gender,
        "chief_complaint": data.chief_complaint,
        "symptoms":        data.symptoms,
        "vitals":          vitals_dict,
    }

    doc    = create_patient_document(patient_data, current_user["_id"])
    result = db["patients"].insert_one(doc)
    doc["_id"] = result.inserted_id

    # Run AI triage in background
    try:
        ai_result = analyze_patient(patient_data)
        db["patients"].update_one(
            {"_id": result.inserted_id},
            {"$set": {
                "urgency_score":      ai_result["urgency_score"],
                "urgency_level":      ai_result["urgency_level"],
                "ai_assessment":      ai_result["ai_assessment"],
                "recommended_action": ai_result["recommended_action"],
                "updated_at":         datetime.utcnow(),
            }}
        )
        # Reorder queue after new patient
        reorder_queue()

        # Get updated patient
        doc = db["patients"].find_one({"_id": result.inserted_id})

    except Exception as e:
        print(f"AI triage error: {e}")

    return {
        "success": True,
        "data":    patient_schema(doc),
    }

# ── Get All Patients (Queue) ──────────────────────────
def get_patients(current_user: dict):
    db = get_db()

    patients = list(
        db["patients"]
        .find({"status": {"$ne": "discharged"}})
        .sort([
            ("queue_position", 1),
            ("urgency_score", -1),
        ])
    )

    stats = get_queue_stats()

    return {
        "success": True,
        "count":   len(patients),
        "stats":   stats,
        "data":    [patient_schema(p) for p in patients],
    }

# ── Get Single Patient ────────────────────────────────
def get_patient(patient_id: str, current_user: dict):
    db = get_db()

    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    patient = db["patients"].find_one({"_id": obj_id})

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    return {
        "success": True,
        "data":    patient_schema(patient),
    }

# ── Update Patient Status ─────────────────────────────
def update_patient_status(
    patient_id: str,
    data: UpdateStatusRequest,
    current_user: dict
):
    db = get_db()

    if data.status not in ["waiting", "in-treatment", "discharged"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be: waiting, in-treatment, or discharged"
        )

    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    patient = db["patients"].find_one_and_update(
        {"_id": obj_id},
        {"$set": {
            "status":     data.status,
            "updated_at": datetime.utcnow(),
        }},
        return_document=True,
    )

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    # Reorder queue after status change
    reorder_queue()

    return {
        "success": True,
        "data":    patient_schema(patient),
    }

# ── Update Vitals ─────────────────────────────────────
def update_vitals(
    patient_id: str,
    data: UpdateVitalsRequest,
    current_user: dict
):
    db = get_db()

    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    patient = db["patients"].find_one({"_id": obj_id})
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    # Update vitals
    db["patients"].update_one(
        {"_id": obj_id},
        {"$set": {
            "vitals":     data.vitals.dict(),
            "updated_at": datetime.utcnow(),
        }}
    )

    # Re-run AI triage with new vitals
    try:
        patient_data = {
            "name":            patient["name"],
            "age":             patient["age"],
            "gender":          patient["gender"],
            "chief_complaint": patient["chief_complaint"],
            "symptoms":        patient.get("symptoms", []),
            "vitals":          data.vitals.dict(),
        }
        ai_result = analyze_patient(patient_data)
        db["patients"].update_one(
            {"_id": obj_id},
            {"$set": {
                "urgency_score":      ai_result["urgency_score"],
                "urgency_level":      ai_result["urgency_level"],
                "ai_assessment":      ai_result["ai_assessment"],
                "recommended_action": ai_result["recommended_action"],
            }}
        )
        reorder_queue()
    except Exception as e:
        print(f"AI re-triage error: {e}")

    updated = db["patients"].find_one({"_id": obj_id})

    return {
        "success": True,
        "data":    patient_schema(updated),
    }

# ── Delete Patient ────────────────────────────────────
def delete_patient(patient_id: str, current_user: dict):
    db = get_db()

    try:
        obj_id = ObjectId(patient_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid patient ID"
        )

    patient = db["patients"].find_one_and_delete({"_id": obj_id})

    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )

    reorder_queue()

    return {
        "success": True,
        "message": "Patient removed successfully",
    }