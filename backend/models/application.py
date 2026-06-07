"""
models/application.py — Pydantic schemas for career/job applications.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


class ApplicationCreate(BaseModel):
    """Payload sent by the frontend career form."""
    name: str
    email: EmailStr
    phone: str
    position: str                          # Job title they applied for
    experience: Optional[str] = None       # Years / description of experience
    cover_letter: Optional[str] = None     # Why they want to join
    resume_url: Optional[str] = None       # PDF Resume URL
    resume_analysis: Optional[str] = None  # Gemini suitability analysis

    @field_validator("name", "phone", "position")
    @classmethod
    def not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field cannot be empty")
        return v.strip()


class ApplicationResponse(BaseModel):
    """What is returned after a successful application submission."""
    id: str
    name: str
    email: str
    phone: str
    position: str
    experience: Optional[Optional[str]]
    cover_letter: Optional[Optional[str]]
    resume_url: Optional[str] = None
    resume_analysis: Optional[str] = None
    created_at: datetime


class ApplicationListResponse(BaseModel):
    """Paginated list of applications for the admin endpoint."""
    total: int
    applications: list[ApplicationResponse]
