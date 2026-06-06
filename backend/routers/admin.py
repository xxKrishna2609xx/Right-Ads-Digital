from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

from database import get_all_documents, delete_document
from services.auth import verify_firebase_token
from models.lead import LeadListResponse
from models.application import ApplicationListResponse

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
    dependencies=[Depends(verify_firebase_token)] # Protect all endpoints in this router
)


@router.get("/leads", response_model=LeadListResponse)
async def get_leads():
    """Get all leads, newest first. Requires valid admin token."""
    leads = await get_all_documents("leads")
    return {"total": len(leads), "leads": leads}


@router.get("/applications", response_model=ApplicationListResponse)
async def get_applications():
    """Get all job applications, newest first. Requires valid admin token."""
    apps = await get_all_documents("applications")
    return {"total": len(apps), "applications": apps}


@router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str):
    """Delete a lead by ID. Requires valid admin token."""
    success = await delete_document("leads", lead_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead with ID {lead_id} not found"
        )
    return {"status": "success", "message": "Lead deleted successfully"}


@router.delete("/applications/{app_id}")
async def delete_application(app_id: str):
    """Delete an application by ID. Requires valid admin token."""
    success = await delete_document("applications", app_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID {app_id} not found"
        )
    return {"status": "success", "message": "Application deleted successfully"}
