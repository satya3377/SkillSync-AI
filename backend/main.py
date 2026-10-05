from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

app = FastAPI(
    title="SkillSync AI API",
    version="1.0.0",
    description="Industry–Academia Skill Gap Analysis Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://skill-sync-ai-six.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SKILLS = {
    "Python": ["python"],
    "SQL": ["sql", "mysql", "postgresql", "database"],
    "Machine Learning": ["machine learning", "ml", "scikit-learn", "sklearn"],
    "Deep Learning": ["deep learning", "tensorflow", "pytorch"],
    "NLP": ["natural language processing", "nlp", "spacy", "nltk"],
    "Power BI": ["power bi", "powerbi"],
    "Excel": ["excel", "microsoft excel"],
    "Java": ["java"],
    "JavaScript": ["javascript", "js"],
    "React": ["react", "react.js"],
    "HTML/CSS": ["html", "css"],
    "Cloud Computing": ["cloud computing", "cloud", "aws", "azure", "gcp"],
    "AWS": ["aws", "amazon web services"],
    "Azure": ["azure", "microsoft azure"],
    "Git/GitHub": ["git", "github"],
    "Kubernetes": ["kubernetes", "k8s"],
    "Linux": ["linux", "ubuntu", "unix"],
    "CI/CD": ["ci/cd", "continuous integration", "continuous deployment"],
    "Docker": ["docker", "containerization"],
    "Data Visualization": ["data visualization", "visualization", "tableau"],
    "Statistics": ["statistics", "statistical analysis"],
    "Data Analysis": ["data analysis", "data analytics", "analytics"],
    "Communication": ["communication", "communication skills"],
    "Problem Solving": ["problem solving", "problem-solving"],
    "Cybersecurity": ["cybersecurity", "cyber security"],
    "Agile": ["agile", "scrum"],
}

TREND_DATA = [
    {"skill": "Python", "demand": 92, "category": "Programming"},
    {"skill": "SQL", "demand": 85, "category": "Data"},
    {"skill": "Cloud Computing", "demand": 82, "category": "Cloud"},
    {"skill": "Machine Learning", "demand": 78, "category": "AI/ML"},
    {"skill": "Power BI", "demand": 74, "category": "Analytics"},
    {"skill": "Data Visualization", "demand": 70, "category": "Analytics"},
    {"skill": "Git/GitHub", "demand": 68, "category": "Development"},
    {"skill": "React", "demand": 65, "category": "Web"},
]

SAMPLE_JOB = """We are looking for a Data Analyst who can work with Python, SQL, Excel and Power BI.
The candidate should understand data analysis, statistics and data visualization. Experience with
machine learning, cloud computing and Git/GitHub is an advantage. Strong communication and
problem-solving skills are required."""

SAMPLE_CURRICULUM = """Programming with Python, Database Management and SQL, Statistics,
Data Analysis, Web Technologies, Machine Learning fundamentals, Communication Skills,
Software Engineering and practical laboratory training."""

class AnalyzeRequest(BaseModel):
    text: str

class GapRequest(BaseModel):
    industry_skills: dict[str, float]
    curriculum_skills: dict[str, float]

def extract_skills(text: str):
    normalized = text.lower()
    found = []
    for skill, aliases in SKILLS.items():
        if any(re.search(r"(?<!\w)" + re.escape(alias.lower()) + r"(?!\w)", normalized) for alias in aliases):
            found.append(skill)
    return found

def skill_scores(text: str):
    found = extract_skills(text)
    words = max(len(re.findall(r"\b[\w+#./-]+\b", text)), 1)
    scores = {}
    for skill in found:
        occurrences = 0
        for alias in SKILLS[skill]:
            occurrences += len(re.findall(r"(?<!\w)" + re.escape(alias.lower()) + r"(?!\w)", text.lower()))
        scores[skill] = min(98, max(35, 45 + occurrences * 16 + min(words, 100) // 8))
    return scores

@app.get("/")
def root():
    return {"message": "SkillSync AI API is running", "version": "1.0.0"}

@app.get("/api/demo")
def demo():
    return {
        "job_description": SAMPLE_JOB,
        "curriculum": SAMPLE_CURRICULUM,
        "job_skills": skill_scores(SAMPLE_JOB),
        "curriculum_skills": skill_scores(SAMPLE_CURRICULUM),
        "trends": TREND_DATA,
    }

@app.post("/api/analyze-job")
def analyze_job(request: AnalyzeRequest):
    skills = skill_scores(request.text)
    return {"type": "job", "skills": skills, "skill_count": len(skills),
            "message": "Job description analyzed successfully."}

@app.post("/api/analyze-curriculum")
def analyze_curriculum(request: AnalyzeRequest):
    skills = skill_scores(request.text)
    return {"type": "curriculum", "skills": skills, "skill_count": len(skills),
            "message": "Curriculum analyzed successfully."}

@app.post("/api/gap-analysis")
def gap_analysis(request: GapRequest):
    all_skills = sorted(set(request.industry_skills) | set(request.curriculum_skills))
    result = []
    for skill in all_skills:
        industry = float(request.industry_skills.get(skill, 0))
        curriculum = float(request.curriculum_skills.get(skill, 0))
        gap = round(max(industry - curriculum, 0), 1)
        level = "High" if gap >= 35 else "Medium" if gap >= 15 else "Low"
        result.append({"skill": skill, "industry": round(industry,1),
                       "curriculum": round(curriculum,1), "gap": gap, "level": level})
    result.sort(key=lambda x: x["gap"], reverse=True)
    return {
        "results": result,
        "high_priority": [x for x in result if x["level"] == "High"],
        "medium_priority": [x for x in result if x["level"] == "Medium"],
        "low_priority": [x for x in result if x["level"] == "Low"],
    }

@app.get("/api/trends")
def trends():
    return {"trends": TREND_DATA}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    data = await file.read()
    text = data.decode("utf-8", errors="ignore")
    return {"filename": file.filename, "characters": len(text), "skills": skill_scores(text)}
