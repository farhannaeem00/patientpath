<div align="center">

<!-- BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,12&height=200&section=header&text=PatientPath&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Hospital%20Patient%20Triage%20System&descAlignY=58&descSize=18" width="100%"/>

<!-- STATUS BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />
</p>

<!-- TECH BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.100-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-LLaMA3-8B5CF6?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<!-- ACTION LINKS -->
<p align="center">
  <a href="https://github.com/farhannaeem00/patientpath" target="_blank">
    <img src="https://img.shields.io/badge/%E2%AD%90%20Star-this%20repo-FFD700?style=for-the-badge" />
  </a>
  <a href="https://github.com/farhannaeem00/patientpath/issues" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%90%9B%20Report-Bug-red?style=for-the-badge" />
  </a>
</p>

<br/>

> ### 🏥 *"Patient arrives. AI scores urgency instantly. Critical patients are never missed."*

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Urgency Classification](#-urgency-classification)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔍 Overview

**PatientPath** is a full-stack AI-powered hospital emergency room triage system built with **React + Python FastAPI** and powered by **Groq LLaMA3**. It enables hospital staff to register patients digitally, get instant AI-powered urgency scoring, and manage the ER queue intelligently — so the most critical patients are always seen first.

This is not a basic CRUD project. PatientPath is architected as a **production-grade healthcare system** with JWT role-based authentication, AI triage analysis, automatic queue reordering, vital signs tracking, and a clean professional dashboard — all deployed at zero cost.

---

## 🔴 The Problem

<table>
<tr>
<td width="50%">

**The ER Crisis is Real:**
- 🏥 ER patients wait **4–6 hours** regardless of severity
- 😱 Critical patients sometimes wait behind minor cases
- 👩‍⚕️ Triage nurses are overloaded with manual assessment
- 📋 No intelligent queue management exists
- 🌍 In Pakistan and developing countries, this kills people daily

</td>
<td width="50%">

**What Goes Wrong Without Triage AI:**
- Heart attack patient waits while minor cases go first
- Stroke symptoms missed in crowded waiting rooms
- Nurses manually assess 50+ patients per shift
- No data-driven urgency scoring
- Doctors unaware of critical patients in queue

</td>
</tr>
</table>

---

## 💡 The Solution

PatientPath bridges the **triage intelligence gap** by combining:

```
📋 Digital Intake  +  🤖 AI Urgency Scoring  +  📊 Smart Queue  +  ⚡ Doctor Alerts
```

> Register Patient → AI Analyzes → Queue Reorders → Doctor Treats Right Patient First

In under **30 seconds**, a patient can be registered, AI-triaged, and placed in the correct queue position — automatically.

---

## ✨ Key Features

<table>
<tr>
<td>

### 🔐 Role-Based Authentication
- JWT-based secure auth
- Three roles: Doctor / Nurse / Admin
- Protected routes per role
- bcrypt password hashing (12 rounds)

</td>
<td>

### 🤖 AI Triage Engine
- Powered by **Groq LLaMA3-70B** (free)
- Analyzes symptoms + vitals + age + complaint
- Returns urgency score (0–100)
- Plain-English assessment + action plan

</td>
</tr>
<tr>
<td>

### 📊 Smart ER Queue
- Auto-reorders by urgency score
- Real-time queue position updates
- Filter by urgency level
- One-click status change per patient

</td>
<td>

### 📋 Digital Intake Form
- Symptom checklist (16+ symptoms)
- Vital signs entry (BP, pulse, temp, O2)
- Chief complaint field
- Patient demographics

</td>
</tr>
<tr>
<td>

### 🔄 Vitals Re-Triage
- Update vitals anytime
- AI re-scores urgency automatically
- Queue reorders with new score
- Worsening vitals = higher priority

</td>
<td>

### 📈 Dashboard Analytics
- Total waiting patients
- Critical + urgent counts
- In-treatment + discharged stats
- Top priority patient list

</td>
</tr>
</table>

---

## 🎨 Urgency Classification

| Score | Level | Color | Response Time | Examples |
|---|---|---|---|---|
| 75–100 | **🔴 Critical** | Red | Immediate | Chest pain, stroke, O2 < 90% |
| 50–74 | **🟠 Urgent** | Orange | < 30 minutes | High fever, severe pain |
| 25–49 | **🟡 Semi-Urgent** | Yellow | < 2 hours | Moderate symptoms |
| 0–24 | **🟢 Non-Urgent** | Green | Can wait | Minor complaints |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat) React | 18.x | UI framework |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat) Vite | 5.x | Build tool |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white&style=flat) TailwindCSS | 4.x | Styling |
| React Router | 6.x | Navigation |
| Axios | Latest | HTTP client |
| Lucide React | Latest | Icons |
| React Hot Toast | Latest | Notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=flat) Python | 3.11 | Runtime |
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=flat) FastAPI | 0.100+ | REST API |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) MongoDB + PyMongo | Atlas | Database |
| Groq SDK | Latest | AI inference |
| python-jose | Latest | JWT tokens |
| passlib[bcrypt] | Latest | Password hashing |
| Pydantic | Latest | Data validation |

### Infrastructure
| Service | Purpose | Cost |
|---|---|---|
| Vercel | Frontend + Backend | **Free** |
| MongoDB Atlas | Cloud database (M0) | **Free** |
| Groq API | LLaMA3-70B inference | **Free** |

> 💡 **Total infrastructure cost: $0/month**

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                                                                 │
│   React + Vite + TailwindCSS                                   │
│   Landing → Auth → Dashboard → Intake → Queue → Patient Detail │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST API
                           │ JWT Bearer Token
┌──────────────────────────▼──────────────────────────────────────┐
│                   PYTHON + FASTAPI BACKEND                      │
│                                                                 │
│  ┌──────────────┐  ┌───────────────────────────────────────┐   │
│  │  /api/auth   │  │           /api/patients               │   │
│  │  register    │  │  POST /        → register patient     │   │
│  │  login       │  │  GET  /        → get queue            │   │
│  │  me          │  │  GET  /{id}    → patient detail       │   │
│  └──────────────┘  │  PUT  /{id}/status → update status   │   │
│                    │  PUT  /{id}/vitals → update vitals    │   │
│                    │  DELETE /{id}  → remove patient       │   │
│                    └──────────────┬────────────────────────┘   │
│                                   │                             │
│  ┌────────────────────────────────▼──────────────────────────┐  │
│  │                    SERVICE LAYER                          │  │
│  │                                                           │  │
│  │  ai_triage.py         →      queue_manager.py            │  │
│  │  Groq LLaMA3-70B             Reorder by urgency score    │  │
│  │  Symptom + vitals            Auto queue positions        │  │
│  │  Returns score 0-100         Stats calculation           │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ PyMongo
┌──────────────────────────▼──────────────────────────────────────┐
│                   MongoDB Atlas (M0 Free)                       │
│                                                                 │
│   users collection          patients collection                 │
│   ├── name                  ├── name / age / gender            │
│   ├── email                 ├── chief_complaint                 │
│   ├── role                  ├── symptoms []                     │
│   └── password (hashed)     ├── vitals {}                       │
│                             ├── urgency_score                   │
│                             ├── urgency_level                   │
│                             ├── ai_assessment                   │
│                             ├── recommended_action              │
│                             ├── status                          │
│                             └── queue_position                  │
└─────────────────────────────────────────────────────────────────┘
```

### AI Triage Flow

```
Patient registered with symptoms + vitals
              ↓
FastAPI sends data to Groq LLaMA3-70B
              ↓
AI analyzes:
  - Symptom severity
  - Vital signs abnormality
  - Age risk factors
  - Chief complaint urgency
              ↓
Returns:
  urgency_score    → 0-100
  urgency_level    → critical/urgent/semi-urgent/non-urgent
  ai_assessment    → plain English explanation
  recommended_action → what to do immediately
              ↓
MongoDB updated with AI results
              ↓
Queue reorders automatically
Critical patients → position 1
```

---

## 📁 Project Structure

```
patientpath/
│
├── 📁 client/                           # React Frontend
│   ├── 📁 public/
│   │   └── favicon.svg
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── PatientCard.jsx          # Patient list item
│   │   │   ├── UrgencyBadge.jsx         # Urgency level badge
│   │   │   ├── VitalsForm.jsx           # Vitals input form
│   │   │   └── SkeletonCard.jsx         # Loading skeleton
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx          # Global auth state
│   │   ├── 📁 hooks/
│   │   │   └── usePageTitle.js          # Dynamic page titles
│   │   ├── 📁 pages/
│   │   │   ├── Landing.jsx              # Marketing page
│   │   │   ├── Login.jsx                # Sign in
│   │   │   ├── Register.jsx             # Staff registration
│   │   │   ├── Dashboard.jsx            # ER overview + stats
│   │   │   ├── Intake.jsx               # New patient form
│   │   │   ├── Queue.jsx                # ER queue view
│   │   │   ├── Patient.jsx              # Patient detail
│   │   │   └── NotFound.jsx             # 404 page
│   │   ├── 📁 utils/
│   │   │   └── api.js                   # Axios + interceptors
│   │   ├── App.jsx                      # Router + routes
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Tailwind imports
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── 📁 server/                           # Python FastAPI Backend
    ├── 📁 config/
    │   └── database.py                  # MongoDB connection
    ├── 📁 controllers/
    │   ├── auth.py                      # Register, login, getMe
    │   └── patient.py                   # Patient CRUD + triage
    ├── 📁 middleware/
    │   └── auth.py                      # JWT guard
    ├── 📁 models/
    │   ├── user.py                      # User schema
    │   └── patient.py                   # Patient schema
    ├── 📁 routes/
    │   ├── auth.py                      # Auth endpoints
    │   └── patients.py                  # Patient endpoints
    ├── 📁 services/
    │   ├── ai_triage.py                 # Groq AI triage engine
    │   └── queue_manager.py             # Queue reordering logic
    ├── 📁 utils/
    │   └── auth.py                      # JWT + bcrypt utils
    ├── .env
    ├── main.py                          # FastAPI entry point
    └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites

```bash
python --version    # 3.11 or higher
node --version      # 18.x or higher
pip --version       # latest
```

Free accounts needed:
- [MongoDB Atlas](https://mongodb.com/atlas)
- [Groq Console](https://console.groq.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/farhannaeem00/patientpath.git
cd patientpath
```

---

### 2. Backend Setup

```bash
cd server
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

Create `server/.env`:

```env
PORT=8000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/patientpath
SECRET_KEY=patientpath_super_secret_key_2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
uvicorn main:app --reload --port 8000
```

✅ Expected:
```
INFO: Uvicorn running on http://127.0.0.1:8000
INFO: Application startup complete.
```

Visit `http://localhost:8000/docs` for **interactive API docs**.

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start frontend:

```bash
npm run dev
```

✅ Expected:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### 4. Open in Browser

```
http://localhost:5173
```

🎉 **PatientPath is running locally!**

---

### 5. Quick Test

1. Register as **Doctor** → Login
2. Click **Register Patient**
3. Enter: Name, Age, Chief Complaint = "chest pain"
4. Select symptoms: chest pain, shortness of breath
5. Enter vitals → Submit
6. Watch AI assign urgency score automatically!

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register staff | ❌ |
| `POST` | `/api/auth/login` | Login + JWT | ❌ |
| `GET` | `/api/auth/me` | Current user | ✅ |

**Register Request:**
```json
{
  "name":     "Dr. Ahmed",
  "email":    "ahmed@hospital.com",
  "password": "securepass",
  "role":     "doctor"
}
```

---

### Patients

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/patients/` | Register + triage | ✅ |
| `GET` | `/api/patients/` | Get queue + stats | ✅ |
| `GET` | `/api/patients/{id}` | Patient detail | ✅ |
| `PUT` | `/api/patients/{id}/status` | Update status | ✅ |
| `PUT` | `/api/patients/{id}/vitals` | Update vitals | ✅ |
| `DELETE` | `/api/patients/{id}` | Remove patient | ✅ |

**Register Patient Request:**
```json
{
  "name":            "Ahmed Khan",
  "age":             45,
  "gender":          "male",
  "chief_complaint": "chest pain",
  "symptoms":        ["chest pain", "shortness of breath"],
  "vitals": {
    "blood_pressure":    "150/90",
    "pulse":             "110",
    "temperature":       "98.6",
    "oxygen_saturation": "94"
  }
}
```

**AI Triage Response:**
```json
{
  "success": true,
  "data": {
    "name":               "Ahmed Khan",
    "urgency_score":      88,
    "urgency_level":      "critical",
    "ai_assessment":      "Patient presents with chest pain and low O2...",
    "recommended_action": "Immediate ECG and cardiac monitoring required",
    "queue_position":     1,
    "status":             "waiting"
  }
}
```

**Queue Response:**
```json
{
  "success": true,
  "count": 5,
  "stats": {
    "total_waiting":    5,
    "critical":         2,
    "urgent":           1,
    "in_treatment":     1,
    "discharged_today": 3
  },
  "data": [...]
}
```

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing](https://via.placeholder.com/900x500/0a192f/2563EB?text=PatientPath+%7C+AI+Hospital+Triage+System)

### 📊 Dashboard
![Dashboard](https://via.placeholder.com/900x500/0a192f/2563EB?text=ER+Dashboard+%7C+Stats+%7C+Critical+Patients)

### 📋 Patient Intake Form
![Intake](https://via.placeholder.com/900x500/0a192f/2563EB?text=Patient+Intake+Form+%7C+Symptoms+%7C+Vitals)

### 🚨 ER Queue
![Queue](https://via.placeholder.com/900x500/7f1d1d/ef4444?text=ER+Queue+%7C+Critical+Score+88%2F100)

### 🤖 AI Triage Result
![Patient](https://via.placeholder.com/900x500/0a192f/2563EB?text=AI+Assessment+%7C+Score+Ring+%7C+Vitals)

---

## 🛣️ Future Roadmap

```
v1.1 — Short Term
├── [ ] Real-time updates with WebSockets
├── [ ] SMS alerts to doctors for critical patients
├── [ ] Patient history across multiple visits
├── [ ] Vital signs trend charts
└── [ ] Search and filter patients in queue

v1.2 — Medium Term
├── [ ] Trained ML model for triage (scikit-learn)
├── [ ] Nurse notes and doctor comments per patient
├── [ ] Shift management for hospital staff
├── [ ] Multi-hospital support
└── [ ] Mobile app for nurses (React Native)

v2.0 — Long Term
├── [ ] Integration with hospital HIS systems
├── [ ] Prescription management module
├── [ ] Lab results integration
├── [ ] Insurance and billing module
└── [ ] Government health ministry dashboard
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m "Add: AmazingFeature"`
4. Push: `git push origin feature/AmazingFeature`
5. Open a Pull Request

**Commit Convention:**
```
Add:      New feature
Fix:      Bug fix
Update:   Improvement
Refactor: Code restructure
Docs:     Documentation
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/farhannaeem00.png" width="100" style="border-radius:50%"/>

### Farhan Naeem

**BS Computer Science Student**
Full Stack Developer | AI Enthusiast | Problem Solver

[![GitHub](https://img.shields.io/badge/GitHub-farhannaeem00-181717?style=for-the-badge&logo=github)](https://github.com/farhannaeem00)

</div>

---

## 📄 License

```
MIT License — Copyright (c) 2025 Farhan Naeem

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,4,12&height=100&section=footer" width="100%"/>

**⭐ Star this repo if it helped you!**

Made with ❤️ and 🏥 by [Farhan Naeem](https://github.com/farhannaeem00)

</div>
