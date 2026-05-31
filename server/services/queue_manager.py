from config.database import get_db
from bson import ObjectId

# ── Urgency Priority Order ────────────────────────────
URGENCY_PRIORITY = {
    "critical":   1,
    "urgent":     2,
    "semi-urgent": 3,
    "non-urgent": 4,
}

def reorder_queue(user_id=None):
    """
    Reorders all waiting patients by urgency score.
    Higher urgency score = lower queue position number.
    """
    db = get_db()

    # Get all waiting patients
    query = {"status": "waiting"}

    patients = list(
        db["patients"].find(query).sort([
            ("urgency_score", -1),  # highest score first
            ("created_at", 1),      # oldest first if same score
        ])
    )

    # Update queue positions
    for i, patient in enumerate(patients):
        db["patients"].update_one(
            {"_id": patient["_id"]},
            {"$set": {"queue_position": i + 1}}
        )

    return len(patients)

def get_queue_stats(user_id=None):
    """Returns queue statistics."""
    db    = get_db()
    query = {}

    total      = db["patients"].count_documents({**query, "status": "waiting"})
    critical   = db["patients"].count_documents({**query, "status": "waiting", "urgency_level": "critical"})
    urgent     = db["patients"].count_documents({**query, "status": "waiting", "urgency_level": "urgent"})
    in_treatment = db["patients"].count_documents({**query, "status": "in-treatment"})
    discharged = db["patients"].count_documents({**query, "status": "discharged"})

    return {
        "total_waiting":   total,
        "critical":        critical,
        "urgent":          urgent,
        "in_treatment":    in_treatment,
        "discharged_today": discharged,
    }
