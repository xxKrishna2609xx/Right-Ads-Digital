"""
main.py — FastAPI application entry-point for Right Ads Digital.

Startup:    uvicorn main:app --reload --port 8000
API Docs:   http://localhost:8000/docs
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import is_using_firestore
from routers import leads, careers, chat, admin


# ── Logging ──────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(levelname)s  %(name)s  %(message)s",
)
logger = logging.getLogger(__name__)

# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(
    title="Right Ads Digital — API",
    description=(
        "Backend API for the Right Ads Digital Agency website.\n\n"
        "**Public endpoints** — Contact form, career applications & AI chatbot.\n"
        "**Admin endpoints** — Protected by `?api_key=` query param.\n\n"
        "Swagger UI: `/docs` | ReDoc: `/redoc`"
    ),
    version="1.0.0",
    contact={
        "name": "Right Ads Digital",
        "url": "https://rightads.in",
        "email": "info@rightads.in",
    },
)

# ── CORS ─────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────
app.include_router(leads.router)
app.include_router(careers.router)
app.include_router(chat.router)
app.include_router(admin.router)



# ── Root endpoints ────────────────────────────────────────
@app.get("/", tags=["Status"], summary="Welcome message")
def root():
    storage = "Firestore" if is_using_firestore() else "In-Memory (dev)"
    return {
        "message": "Welcome to the Right Ads Digital API 🚀",
        "docs": "/docs",
        "storage": storage,
        "environment": settings.APP_ENV,
    }


@app.get("/health", tags=["Status"], summary="Health check")
def health():
    return {
        "status": "healthy",
        "storage": "firestore" if is_using_firestore() else "memory",
    }
