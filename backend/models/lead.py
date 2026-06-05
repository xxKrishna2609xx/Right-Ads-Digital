"""
models/lead.py — Pydantic schemas for contact form leads.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


class LeadCreate(BaseModel):
    """Payload sent by the frontend contact forms."""
    name: str
    email: EmailStr
    phone: str
    message: str
    service: Optional[str] = None          # Which service they're interested in
    source: Optional[str] = "website"      # e.g. "home_contact" | "contact_page"

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

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()


class LeadResponse(BaseModel):
    """What is returned after a successful lead submission."""
    id: str
    name: str
    email: str
    phone: str
    message: str
    service: Optional[str]
    source: Optional[str]
    created_at: datetime


class LeadListResponse(BaseModel):
    """Paginated list of leads for the admin endpoint."""
    total: int
    leads: list[LeadResponse]
