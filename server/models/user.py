from datetime import datetime

def user_schema(user) -> dict:
    return {
        "id":         str(user["_id"]),
        "name":       user["name"],
        "email":      user["email"],
        "role":       user.get("role", "nurse"),
        "created_at": str(user.get("created_at", "")),
    }

def create_user_document(
    name: str,
    email: str,
    hashed_password: str,
    role: str = "nurse"
) -> dict:
    return {
        "name":       name,
        "email":      email,
        "password":   hashed_password,
        "role":       role,
        "created_at": datetime.utcnow(),
    }
