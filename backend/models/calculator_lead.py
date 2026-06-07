"""
models/calculator_lead.py — Pydantic schemas for marketing budget calculator leads.
"""
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, EmailStr, field_validator


class CalculatorLeadCreate(BaseModel):
    """Payload sent when a prospect submits a budget calculation."""
    name: str
    email: EmailStr
    phone: str
    website: Optional[str] = None
    services: List[str]                      # e.g. ["SEO", "Web Design"]
    details: Dict[str, Any]                  # e.g. {"seo_keywords": "20", "web_pages": "6-15"}
    min_budget: float                        # Estimated minimum budget
    max_budget: float                        # Estimated maximum budget

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Name cannot be empty")
        return v.strip()

    @field_validator("phone")
    @classmethod
    def phone_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Phone cannot be empty")
        return v.strip()

    @field_validator("services")
    @classmethod
    def services_not_empty(cls, v: List[str]) -> List[str]:
        if not v:
            raise ValueError("At least one service must be selected")
        return v


class CalculatorLeadResponse(BaseModel):
    """Returned from Firestore database."""
    id: str
    name: str
    email: str
    phone: str
    website: Optional[str]
    services: List[str]
    details: Dict[str, Any]
    min_budget: float
    max_budget: float
    created_at: datetime


class CalculatorLeadListResponse(BaseModel):
    """Returned when admin requests all calculator leads."""
    total: int
    leads: List[CalculatorLeadResponse]
