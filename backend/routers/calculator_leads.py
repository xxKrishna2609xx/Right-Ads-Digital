from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

from database import save_document, get_all_documents, delete_document
from services.auth import verify_firebase_token
from models.calculator_lead import CalculatorLeadCreate, CalculatorLeadResponse, CalculatorLeadListResponse

router = APIRouter(
    prefix="/api",
    tags=["calculator_leads"]
)


@router.post("/calculator-leads", response_model=CalculatorLeadResponse, status_code=status.HTTP_201_CREATED)
async def create_calculator_lead(lead: CalculatorLeadCreate):
    """
    Public endpoint to save a prospect's budget calculation results.
    """
    saved_doc = await save_document("calculator_leads", lead.model_dump())
    return saved_doc


@router.get("/admin/calculator-leads", response_model=CalculatorLeadListResponse, dependencies=[Depends(verify_firebase_token)])
async def get_calculator_leads():
    """
    Protected admin endpoint to retrieve all calculator leads, newest first.
    """
    leads = await get_all_documents("calculator_leads")
    return {"total": len(leads), "leads": leads}


@router.delete("/admin/calculator-leads/{lead_id}", dependencies=[Depends(verify_firebase_token)])
async def delete_calculator_lead(lead_id: str):
    """
    Protected admin endpoint to delete a calculator lead by ID.
    """
    success = await delete_document("calculator_leads", lead_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Calculator lead with ID {lead_id} not found"
        )
    return {"status": "success", "message": "Calculator lead deleted successfully"}
