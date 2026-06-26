from fastapi import HTTPException, status
from pydantic import BaseModel
from config.database import get_db
from models.user import create_user_document, user_schema
from utils.auth import hash_password, verify_password, create_access_token

class RegisterRequest(BaseModel):
    name:     str
    email:    str        # ← changed from EmailStr to str
    password: str
    role:     str = "nurse"

class LoginRequest(BaseModel):
    email:    str        # ← changed from EmailStr to str
    password: str

def register_user(data: RegisterRequest):
    db = get_db()

    if not data.name or not data.email or not data.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide all fields"
        )

    if len(data.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters"
        )

    if data.role not in ["doctor", "nurse", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be doctor, nurse, or admin"
        )

    existing = db["users"].find_one({"email": data.email.lower()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed = hash_password(data.password)
    doc    = create_user_document(
        data.name, data.email.lower(), hashed, data.role
    )
    result  = db["users"].insert_one(doc)
    doc["_id"] = result.inserted_id

    token = create_access_token({"id": str(result.inserted_id)})

    return {
        "success": True,
        "token":   token,
        "user":    user_schema(doc),
    }

def login_user(data: LoginRequest):
    db = get_db()

    if not data.email or not data.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please provide email and password"
        )

    user = db["users"].find_one({"email": data.email.lower()})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"id": str(user["_id"])})

    return {
        "success": True,
        "token":   token,
        "user":    user_schema(user),
    }

def get_me(current_user: dict):
    return {
        "success": True,
        "user":    user_schema(current_user),
    }