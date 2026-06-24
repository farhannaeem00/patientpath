from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import get_db
from routes.auth import router as auth_router
from routes.patients import router as patient_router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="PatientPath API",
    description="AI-Powered Hospital Patient Triage System",
    version="1.0.0"
)

# ── CORS ──────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        os.getenv("CLIENT_URL", "*"),
        "https://patientpathclient.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Health Check ──────────────────────────────────────
@app.get("/")
def root():
    return {"message": "✅ PatientPath API is running"}

# ── DB Test ───────────────────────────────────────────
@app.get("/test-db")
def test_db():
    try:
        db = get_db()
        db.command("ping")
        return {"message": "✅ MongoDB connected successfully"}
    except Exception as e:
        return {"message": f"❌ Connection failed: {str(e)}"}

# ── Routers ───────────────────────────────────────────
app.include_router(auth_router)
app.include_router(patient_router)
