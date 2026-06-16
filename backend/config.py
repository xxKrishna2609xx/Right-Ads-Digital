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

    # ── Dev Mock Auth ──
    MOCK_ADMIN_UID: str = "mock-admin-uid"
    MOCK_ADMIN_EMAIL: str = "dev-admin@rightads.in"

    # ── Chatbot Guardrail Topics ──
    CHATBOT_ALLOWED_TOPICS: list[str] = [
        # Company & general
        r"\bright ads?\b", r"\brightads\b", r"\bcompan", r"\bagenc", r"\bnoida\b",
        r"\boffice\b", r"\bbranch", r"\bcontact\b", r"\bphone\b", r"\bemail\b",
        r"\bpric", r"\bpackage", r"\bplan\b", r"\bcost\b", r"\bfee\b", r"\brate\b",
        r"\bconsult", r"\bbook\b", r"\bappointment\b", r"\bteam\b", r"\bexpert",
        r"\bexperienc", r"\bcertif", r"\baward", r"\breview\b", r"\brating\b",
        r"\bpartner\b", r"\bgoogle partner\b", r"\bbing\b", r"\bclient",
        r"\bworking hour", r"\btiming\b", r"\bopen\b", r"\bservice",
        # Digital marketing
        r"\bdigital market", r"\bseo\b", r"\bsearch engine", r"\bkeyword",
        r"\bbacklink", r"\brank", r"\btraffic\b", r"\borganic\b", r"\bonline\b",
        r"\bwebsite\b", r"\bweb design", r"\bweb develop", r"\bredesi",
        r"\bgoogle ads?\b", r"\badwords\b", r"\bppc\b", r"\bcampaign\b",
        r"\bads?\b", r"\badvertis", r"\bgoogle my business\b", r"\bgmb\b",
        r"\blocal seo\b", r"\bsocial media\b", r"\binstagram\b", r"\bfacebook\b",
        r"\bsmo\b", r"\bsms market", r"\bbulk sms\b", r"\bemail market",
        r"\bgraphic design\b", r"\blogo\b", r"\bbranding\b", r"\bcreative",
        r"\btoll.?free\b", r"\b1800\b", r"\bdigital business card\b", r"\bnfc\b",
        r"\blead gen", r"\bconver", r"\broi\b", r"\banalytics\b", r"\bperform",
        r"\bcontent\b", r"\bblogs?\b", r"\bcopy\b", r"\bwhatsapp market",
        # Business registrations
        r"\bnsic\b", r"\biso certif", r"\bmsme\b", r"\budyam\b", r"\bregist",
        r"\bgovernment\b", r"\bsmall business\b", r"\bstartup\b", r"\bbusiness",
        # Greetings and general help
        r"\bhello\b", r"\bhi\b", r"\bhey\b", r"\bhelp\b", r"\bwhat can you\b",
        r"\bwho are you\b", r"\baria\b", r"\bthanks?\b", r"\bthank you\b",
        r"\bbye\b", r"\bgoodbye\b", r"\bhow are you\b", r"\bwhat do you\b",
        r"\btell me about\b",
    ]

    CHATBOT_BLOCKED_TOPICS: list[str] = [
        r"\bpython\b", r"\bjava\b", r"\bcoding\b", r"\bprogramm",
        r"\brecipe\b", r"\bcook\b", r"\bfood\b", r"\bweather\b",
        r"\bsport\b", r"\bcricket\b", r"\bfootball\b", r"\bfilm\b",
        r"\bmovie\b", r"\bsong\b", r"\bmusic\b", r"\blyric\b",
        r"\bmath\b", r"\bequation\b", r"\bhistory\b", r"\bgeograph",
        r"\bscience\b", r"\bphysic\b", r"\bchemist", r"\bbiolog",
        r"\bmedic\b", r"\bdoctor\b", r"\bhospital\b", r"\bdisease",
        r"\bpolitics?\b", r"\belection\b", r"\bgovernment scheme",
        r"\bjoke\b", r"\bfunny\b", r"\bstory\b", r"\bpoem\b",
        r"\brelationship\b", r"\blov\b", r"\bmarriage\b",
        r"\bcrypto\b", r"\bbitcoin\b", r"\bstock market\b", r"\binvest",
        r"\bhack\b", r"\bcheat\b", r"\bscam\b",
    ]

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


# Singleton — import `settings` everywhere
settings = Settings()
