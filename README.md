# SkillSync AI — Industry–Academia Skill Gap Analysis Platform

This project is based on the TEAM-08 project PPT:
“Challenges in Aligning Skill Development Programs with Industry Requirements and Emerging Job Market Demands.”

## Included
- React + Vite frontend
- FastAPI Python backend
- Job Description Analyzer
- Curriculum Analyzer
- Skill Gap Analyzer
- Industry Trends dashboard
- AI-style recommendations
- Student Skill Profile
- Reports
- Demo data
- Working prototype NLP-style skill extraction and gap calculations

## Requirements
- Node.js 18+
- Python 3.10+

## Backend
```bash
cd backend
python -m venv venv
```
Windows:
```bash
venv\Scripts\activate
```
macOS/Linux:
```bash
source venv/bin/activate
```
Then:
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend: http://127.0.0.1:8000

## Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL, normally http://localhost:5173

## Demo flow
1. Dashboard
2. Job Analyzer
3. Curriculum Analyzer
4. Skill Gap
5. AI Recommendations
6. Reports

The included NLP/ML layer is a college-project prototype using a controlled skill dictionary, text normalization, weighted scoring and gap calculations. It can later be replaced with a trained NLP/ML model without redesigning the UI.
