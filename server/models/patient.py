from datetime import datetime

def patient_schema(patient) -> dict:
    return {
        "id":               str(patient["_id"]),
        "user_id":          str(patient.get("user_id", "")),
        "name":             patient["name"],
        "age":              patient["age"],
        "gender":           patient["gender"],
        "chief_complaint":  patient["chief_complaint"],
        "symptoms":         patient.get("symptoms", []),
        "vitals":           patient.get("vitals", {}),
        "urgency_score":    patient.get("urgency_score", 0),
        "urgency_level":    patient.get("urgency_level", "non-urgent"),
        "ai_assessment":    patient.get("ai_assessment", ""),
        "recommended_action": patient.get("recommended_action", ""),
        "status":           patient.get("status", "waiting"),
        "queue_position":   patient.get("queue_position", 0),
        "created_at":       str(patient.get("created_at", "")),
        "updated_at":       str(patient.get("updated_at", "")),
    }

def create_patient_document(data: dict, user_id) -> dict:
    return {
        "user_id":          user_id,
        "name":             data["name"],
        "age":              data["age"],
        "gender":           data["gender"],
        "chief_complaint":  data["chief_complaint"],
        "symptoms":         data.get("symptoms", []),
        "vitals":           data.get("vitals", {}),
        "urgency_score":    0,
        "urgency_level":    "non-urgent",
        "ai_assessment":    "",
        "recommended_action": "",
        "status":           "waiting",
        "queue_position":   0,
        "created_at":       datetime.utcnow(),
        "updated_at":       datetime.utcnow(),
    }
