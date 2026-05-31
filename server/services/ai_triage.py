import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_patient(patient_data: dict) -> dict:
    prompt = f"""
You are an expert emergency room triage physician AI.
Analyze this patient and determine urgency level.
Respond ONLY with valid JSON. No explanation, no markdown.

PATIENT DATA:
Name: {patient_data.get('name')}
Age: {patient_data.get('age')}
Gender: {patient_data.get('gender')}
Chief Complaint: {patient_data.get('chief_complaint')}
Symptoms: {', '.join(patient_data.get('symptoms', []))}
Vitals:
  Blood Pressure: {patient_data.get('vitals', {}).get('blood_pressure', 'N/A')}
  Pulse: {patient_data.get('vitals', {}).get('pulse', 'N/A')} bpm
  Temperature: {patient_data.get('vitals', {}).get('temperature', 'N/A')} F
  Oxygen Saturation: {patient_data.get('vitals', {}).get('oxygen_saturation', 'N/A')}%

Respond with EXACTLY this JSON:
{{
  "urgency_score": 85,
  "urgency_level": "critical",
  "ai_assessment": "Plain English explanation of patient condition",
  "recommended_action": "What should be done immediately"
}}

Urgency levels and scores:
- "critical"    → score 75-100 (life threatening, immediate attention)
- "urgent"      → score 50-74  (serious, seen within 30 minutes)
- "semi-urgent" → score 25-49  (moderate, seen within 2 hours)
- "non-urgent"  → score 0-24   (minor, can wait)

Consider these critical signs:
- Chest pain → always urgent or critical
- Difficulty breathing → critical
- Unconscious/unresponsive → critical
- Severe bleeding → critical
- Stroke symptoms → critical
- O2 saturation below 90 → critical
- Pulse above 150 or below 40 → critical
- Temperature above 104F → urgent

Return ONLY the JSON object.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.1,
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}],
    )

    content = response.choices[0].message.content.strip()
    cleaned = content \
        .replace("```json", "") \
        .replace("```", "") \
        .strip()

    try:
        parsed = json.loads(cleaned)
    except Exception as e:
        raise ValueError(f"AI returned invalid JSON: {e}")

    if (
        "urgency_score"     not in parsed or
        "urgency_level"     not in parsed or
        "ai_assessment"     not in parsed or
        "recommended_action" not in parsed
    ):
        raise ValueError("AI response missing required fields")

    return parsed
