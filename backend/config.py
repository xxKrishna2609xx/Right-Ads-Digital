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
    # Alternative: Set this to the stringified JSON credentials directly
    FIREBASE_CREDENTIALS_JSON: str = ""

    # ── Gemini AI ──
    # Google Gemini API key for the AI chatbot endpoint.
    GEMINI_API_KEY: str = ""

    # ── Contact details ──
    CONTACT_PHONE: str = "+91-8377072990"
    CONTACT_EMAIL: str = "info@rightads.in"
    CONTACT_HOURS: str = "Mon – Sun, 8 AM – 8 PM"
    CONTACT_URL: str = "https://rightads.in"
    OFFICES_LIST: list[dict[str, str]] = [
        {"city": "Noida HQ", "address": "A-71, 3rd Floor, Sector 15, Noida, UP 201301"},
        {"city": "Noida Branch", "address": "B-135, 4th Floor, Sector 2, Noida, UP 201301"},
        {"city": "Faridabad (Regd.)", "address": "1718, N.E Part-2, Faridabad 121005"},
        {"city": "Mathura", "address": "6/3A, Krishna Nagar, Mathura 281001"},
        {"city": "Kota", "address": "80 Feet Link Road, Kota, Rajasthan 324001"},
        {"city": "Dehradun", "address": "Subhash Nagar, Dehradun"},
    ]

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


# Singleton — import `settings` everywhere
settings = Settings()
