"""
routers/careers.py — Endpoints for career / job application management.

POST /api/careers  → Submit a job application (public)
GET  /api/careers  → List all applications (admin, requires ?api_key=)
"""
from fastapi import APIRouter, HTTPException, Query, status

from config import settings
from database import save_document, get_all_documents
from models.application import ApplicationCreate, ApplicationResponse, ApplicationListResponse

router = APIRouter(prefix="/api/careers", tags=["Careers"])


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
