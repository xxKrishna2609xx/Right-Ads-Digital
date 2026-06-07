"""
routers/careers.py — Endpoints for career / job application management.

POST /api/careers  → Submit a job application (public)
GET  /api/careers  → List all applications (admin, requires ?api_key=)
"""
import os
import uuid
import shutil
from fastapi import APIRouter, HTTPException, Query, status, UploadFile, File

from config import settings
from database import save_document, get_all_documents
from models.application import ApplicationCreate, ApplicationResponse, ApplicationListResponse

router = APIRouter(prefix="/api/careers", tags=["Careers"])


async def analyze_resume_with_gemini(pdf_bytes: bytes, position: str = None) -> str:
    """
    Calls Google Gemini 2.5 Flash API to analyze the PDF resume's suitability
    for the specified position.
    """
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        return "Analysis unavailable: Gemini API key is not configured."

    try:
        import base64
        import httpx
        
        base64_pdf = base64.b64encode(pdf_bytes).decode("utf-8")
        
        if position:
            prompt = (
                f"Analyze the attached resume for a candidate applying for the position: {position}.\n"
                f"Provide a concise, professional suitability assessment under 150 words.\n"
                f"Highlight key technical skills, relevant experience, and overall fit. "
                f"Format your response with clean bullet points."
            )
        else:
            prompt = (
                "Analyze the attached resume.\n"
                "Provide a concise, professional suitability assessment under 150 words.\n"
                "Highlight key technical skills, relevant experience, and overall background. "
                "Format your response with clean bullet points."
            )

        request_body = {
            "contents": [
                {
                    "parts": [
                        {
                            "inlineData": {
                                "mimeType": "application/pdf",
                                "data": base64_pdf
                            }
                        },
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 1500
            }
        }

        gemini_url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"gemini-2.5-flash:generateContent?key={api_key}"
        )

        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(gemini_url, json=request_body)
            response.raise_for_status()
            data = response.json()

        analysis = (
            data.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
            .strip()
        )
        return analysis if analysis else "Analysis empty."
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Error calling Gemini API for resume analysis: {e}")
        return f"Analysis unavailable due to an error: {str(e)}"


@router.post(
    "/upload-resume",
    status_code=status.HTTP_201_CREATED,
    summary="Upload candidate resume PDF",
)
async def upload_resume(
    file: UploadFile = File(...),
    position: str = Query(None, description="Position the candidate is applying for")
):
    """
    Accepts a candidate's resume PDF.
    If Firestore is initialized, uploads the PDF to Firebase Storage and returns its signed URL.
    Otherwise, saves to a local uploads directory and returns a local URL.
    """
    # 1. Validate PDF file type
    if file.content_type != "application/pdf" and not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF resumes are allowed."
        )

    # Read PDF bytes to pass to Gemini
    pdf_bytes = await file.read()
    await file.seek(0)  # Reset pointer for saving

    # Call Gemini for resume analysis
    resume_analysis = await analyze_resume_with_gemini(pdf_bytes, position)

    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    # 2. Check if Firestore/Firebase is active
    from database import is_using_firestore
    if is_using_firestore():
        try:
            from firebase_admin import storage
            bucket = storage.bucket()
            blob = bucket.blob(f"resumes/{unique_filename}")
            
            blob.upload_from_file(file.file, content_type="application/pdf")
            
            from datetime import timedelta
            url = blob.generate_signed_url(
                version="v4",
                expiration=timedelta(days=365),
                method="GET"
            )
            return {"resume_url": url, "resume_analysis": resume_analysis}
        except Exception as e:
            import logging
            logging.getLogger(__name__).warning(f"Failed to upload resume to Firebase Storage: {e}. Falling back to local upload.")
            
    # 3. Local Upload Fallback
    backend_dir = os.path.dirname(os.path.dirname(__file__))
    uploads_dir = os.path.join(backend_dir, "uploads")
    os.makedirs(uploads_dir, exist_ok=True)
    
    local_path = os.path.join(uploads_dir, unique_filename)
    with open(local_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    local_url = f"http://localhost:8000/uploads/{unique_filename}"
    return {"resume_url": local_url, "resume_analysis": resume_analysis}


@router.post(
    "",
    response_model=ApplicationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a job application",
)
async def create_application(payload: ApplicationCreate):
    """
    Accepts a career application from the careers page.
    Stores it in Firestore (or in-memory during development).
    """
    data = payload.model_dump()
    saved = await save_document("applications", data)
    return ApplicationResponse(**saved)


@router.get(
    "",
    response_model=ApplicationListResponse,
    summary="List all applications (admin only)",
)
async def list_applications(
    api_key: str = Query(..., description="Admin API key"),
):
    """
    Returns all submitted career applications. Protected by ADMIN_API_KEY.
    Usage: GET /api/careers?api_key=your-secret-key
    """
    if api_key != settings.ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key.",
        )

    all_apps = await get_all_documents("applications")
    return ApplicationListResponse(
        total=len(all_apps),
        applications=[ApplicationResponse(**app) for app in all_apps],
    )
