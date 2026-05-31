from fastapi import APIRouter, Depends
from controllers.patient import (
    RegisterPatientRequest,
    UpdateStatusRequest,
    UpdateVitalsRequest,
    register_patient,
    get_patients,
    get_patient,
    update_patient_status,
    update_vitals,
    delete_patient,
)
from middleware.auth import get_current_user

router = APIRouter(prefix="/api/patients", tags=["Patients"])

@router.post("/")
def create_patient(
    data: RegisterPatientRequest,
    current_user: dict = Depends(get_current_user)
):
    return register_patient(data, current_user)

@router.get("/")
def list_patients(
    current_user: dict = Depends(get_current_user)
):
    return get_patients(current_user)

@router.get("/{patient_id}")
def retrieve_patient(
    patient_id:   str,
    current_user: dict = Depends(get_current_user)
):
    return get_patient(patient_id, current_user)

@router.put("/{patient_id}/status")
def change_status(
    patient_id:   str,
    data:         UpdateStatusRequest,
    current_user: dict = Depends(get_current_user)
):
    return update_patient_status(patient_id, data, current_user)

@router.put("/{patient_id}/vitals")
def change_vitals(
    patient_id:   str,
    data:         UpdateVitalsRequest,
    current_user: dict = Depends(get_current_user)
):
    return update_vitals(patient_id, data, current_user)

@router.delete("/{patient_id}")
def remove_patient(
    patient_id:   str,
    current_user: dict = Depends(get_current_user)
):
    return delete_patient(patient_id, current_user)