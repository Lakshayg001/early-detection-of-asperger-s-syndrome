from fastapi import FastAPI, BackgroundTasks, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid
import datetime

app = FastAPI(title="AspireSense API", version="0.1.0")

class AssessmentSubmission(BaseModel):
    name: str
    age: int
    gender: str
    familyHistory: bool
    jaundice: Optional[bool] = False
    responses: Dict[str, str]
    gazeData: Optional[List[Dict]] = None
    video_filename: Optional[str] = None
    audio_filename: Optional[str] = None

import os
import shutil
import uuid
import logging
from pathlib import Path
from ml_engine import ml_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AspireSense")

# Setup storage
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/api/assessment/submit")
async def submit_assessment(submission: AssessmentSubmission):
    assessment_id = str(uuid.uuid4())
    logger.info(f"Received assessment submission for {submission.name}")
    
    # Check for media files in uploads/ using the session_id or similar
    # For now we assume the frontend might send paths or we use the name as a proxy for the demo
    # Better: The frontend sends the specific filenames it uploaded
    
    video_path = submission.dict().get("video_filename")
    audio_path = submission.dict().get("audio_filename")
    
    v_full = str(UPLOAD_DIR / video_path) if video_path else None
    a_full = str(UPLOAD_DIR / audio_path) if audio_path else None

    logger.info("Triggering Multi-modal Deep Fusion Inference...")
    ml_input = submission.dict()
    ml_input.update(submission.responses)

    results = await ml_service.process_assessment(
        questionnaire_data=ml_input,
        eye_tracking_data=submission.gazeData,
        video_path=v_full,
        audio_path=a_full
    )
    
    logger.info(f"Inference complete. Risk Score: {results['risk_score']}%")
    return {
        "assessment_id": assessment_id,
        "status": "completed",
        "results": results
    }

@app.post("/api/assessment/upload-media")
async def upload_media(file: UploadFile = File(...)):
    # Generate unique filename
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    file_path = UPLOAD_DIR / filename
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    logger.info(f"Media uploaded: {filename}")
    return {"filename": filename, "status": "uploaded"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AspireSense AI Engine - Active & Fully Backed"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "ml_engine": "online", "models": "loaded"}
