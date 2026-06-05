"""
config.py — Application settings loaded from environment variables.
Uses pydantic-settings for type-safe configuration with .env support.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # ── App ──
    APP_ENV: str = "development"
    DEBUG: bool = True

    # ── CORS ──
    # Comma-separated list of allowed frontend origins
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173"

    # ── Admin protection ──
    # Set a strong secret in production. Protects GET /api/leads and GET /api/careers
    ADMIN_API_KEY: str = "changeme-set-a-strong-key-in-env"

    # ── Firebase ──
    # Set this to the path of your serviceAccountKey.json to enable Firestore.
    # Leave empty to use the in-memory fallback (great for development/demo).
    FIREBASE_CREDENTIALS_PATH: str = ""

    # ── Gemini AI ──
    # Google Gemini API key for the AI chatbot endpoint.
    GEMINI_API_KEY: str = ""

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


# Singleton — import `settings` everywhere
settings = Settings()
