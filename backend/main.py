"""
main.py — FastAPI application entry-point for Right Ads Digital.

Startup:    uvicorn main:app --reload --port 8000
API Docs:   http://localhost:8000/docs
"""
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config import settings
from database import is_using_firestore
from routers import leads, careers, chat, admin, calculator_leads


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
logger.info(f"CORS Allowed Origins: {settings.allowed_origins_list}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Security Headers Middleware ───────────────────────────
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
    return response


# ── Routers ───────────────────────────────────────────────
app.include_router(leads.router)
app.include_router(careers.router)
app.include_router(chat.router)
app.include_router(admin.router)
app.include_router(calculator_leads.router)


# ── Static Files Fallback ──────────────────────────────────
# Serve static files from backend/uploads directory for local resume storage fallback
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")



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
