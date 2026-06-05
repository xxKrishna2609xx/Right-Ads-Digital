"""
routers/leads.py — Endpoints for contact form lead management.

POST /api/leads  → Submit a new enquiry (public)
GET  /api/leads  → List all leads (admin, requires ?api_key=)
"""
from fastapi import APIRouter, HTTPException, Query, status

from config import settings
from database import save_document, get_all_documents
from models.lead import LeadCreate, LeadResponse, LeadListResponse

router = APIRouter(prefix="/api/leads", tags=["Leads"])


@router.post(
    "",
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact / enquiry form",
)
async def create_lead(payload: LeadCreate):
    """
    Accepts a contact form submission from the website.
    Stores it in Firestore (or in-memory during development).
    """
    data = payload.model_dump()
    saved = await save_document("leads", data)
    return LeadResponse(**saved)


@router.get(
    "",
    response_model=LeadListResponse,
    summary="List all leads (admin only)",
)
async def list_leads(
    api_key: str = Query(..., description="Admin API key"),
):
    """
    Returns all submitted leads. Protected by ADMIN_API_KEY.
    Usage: GET /api/leads?api_key=your-secret-key
    """
    if api_key != settings.ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid API key.",
        )

    all_leads = await get_all_documents("leads")
    return LeadListResponse(
        total=len(all_leads),
        leads=[LeadResponse(**lead) for lead in all_leads],
    )
