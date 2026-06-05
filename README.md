# ⚡ Right Ads Digital — Agency Website

> A premium, full-stack digital agency website for **Right Ads Digital** — built with React + Vite on the frontend and FastAPI (Python) on the backend. Features stunning dark-mode glassmorphic design, smooth Framer Motion animations, real API-connected contact forms, and Firebase Firestore integration.

---

## 📸 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast, component-based UI |
| **Animations** | Framer Motion | Fluid transitions & micro-interactions |
| **Icons** | Lucide React | Clean scalable vector icons |
| **Styling** | Custom HSL CSS | Dark-mode design tokens |
| **Backend** | FastAPI (Python) | Async REST API |
| **Validation** | Pydantic v2 | Type-safe request/response schemas |
| **Database** | Firebase Firestore | Cloud data storage |
| **Dev Store** | In-Memory Fallback | Works without Firebase credentials |

---

## 🚀 Quick Start

> **You need two terminals** — one for the backend, one for the frontend.  
> Start the **backend first**, then the frontend.

---

### ① Backend — FastAPI Server

```bash
# 1. Navigate into the backend folder
cd backend

# 2. Create a Python virtual environment
python -m venv venv

# 3. Activate the virtual environment
#    Windows (PowerShell):
venv\Scripts\Activate.ps1
#    macOS / Linux:
source venv/bin/activate

# 4. Install all Python dependencies
pip install -r requirements.txt

# 5. (Optional) Copy the environment template and edit it
copy .env.example .env      # Windows
cp .env.example .env        # macOS/Linux

# 6. Start the development server
uvicorn main:app --reload --port 8000
```

✅ Backend is now running at:

| URL | Description |
| :--- | :--- |
| `http://localhost:8000/` | Welcome & status |
| `http://localhost:8000/health` | Health check |
| `http://localhost:8000/docs` | **Swagger UI** (interactive API docs) |
| `http://localhost:8000/redoc` | ReDoc API reference |

---

### ② Frontend — React + Vite Dev Server

```bash
# 1. Navigate into the frontend folder
cd frontend

# 2. Install Node dependencies
npm install

# 3. Start the development server
npm run dev
```

✅ Frontend is now running at **`http://localhost:5173`**

> The frontend reads `VITE_API_URL` from `frontend/.env` (already pre-configured to point at `http://localhost:8000`).

---

## 🔑 Environment Configuration

### Backend — `backend/.env`

```env
# App mode
APP_ENV=development
DEBUG=True

# Allowed frontend origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174

# Admin key to access GET /api/leads and GET /api/careers
ADMIN_API_KEY=changeme-set-a-strong-key-here

# Path to Firebase service account JSON (leave empty to use in-memory fallback)
FIREBASE_CREDENTIALS_PATH=
```

### Frontend — `frontend/.env`

```env
# URL of the FastAPI backend
VITE_API_URL=http://localhost:8000
```

---

## 🛰️ API Endpoints

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Welcome message & storage mode |
| `GET` | `/health` | Public | Health check |
| `POST` | `/api/leads` | Public | Submit a contact/enquiry form |
| `GET` | `/api/leads?api_key=` | API Key | List all leads (admin) |
| `POST` | `/api/careers` | Public | Submit a job application |
| `GET` | `/api/careers?api_key=` | API Key | List all applications (admin) |

**Example — submit a lead:**
```bash
curl -X POST http://localhost:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","phone":"9876543210","message":"Need SEO help"}'
```

---

## 📂 Project Structure

```
Right Ads Digital/
│
├── frontend/                   # ⚛️  React + Vite Application
│   ├── public/
│   │   ├── logo.png            # Transparent brand logo (dark-mode optimised)
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky nav with dropdowns
│   │   │   ├── Footer.jsx      # 4-col footer with branches
│   │   │   ├── ScrollToTop.jsx # Auto scroll-to-top on navigation
│   │   │   └── home/           # Landing page section components
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page (assembles sections)
│   │   │   ├── Services.jsx    # 14-service sidebar layout
│   │   │   ├── About.jsx       # Company timeline & highlights
│   │   │   ├── Contact.jsx     # Form + map + 6 branch offices
│   │   │   ├── Career.jsx      # Job listings + application form
│   │   │   └── Gallery.jsx     # Event photo gallery
│   │   ├── index.css           # Global design tokens & CSS utilities
│   │   └── App.jsx             # Router + layout shell
│   ├── .env                    # VITE_API_URL (pre-configured)
│   └── package.json
│
├── backend/                    # 🐍  FastAPI Application
│   ├── main.py                 # App entry-point & router mounts
│   ├── config.py               # Pydantic-settings (.env loader)
│   ├── database.py             # Firebase + in-memory fallback
│   ├── models/
│   │   ├── lead.py             # Contact form schemas
│   │   └── application.py     # Career application schemas
│   ├── routers/
│   │   ├── leads.py            # /api/leads endpoints
│   │   └── careers.py         # /api/careers endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template (copy to .env)
│   └── venv/                   # Python virtual environment
│
├── README.md
└── .gitignore
```

---

## 🔥 Key Features

- 🎨 **Glassmorphic dark-mode design** with custom HSL color palette
- ✨ **Framer Motion** animations — hero carousel, scroll reveals, micro-interactions
- 📱 **Fully responsive** — mobile, tablet & desktop optimised
- 🔗 **14 service pages** with sticky sidebar navigation
- 📬 **Working contact forms** — all connected to the FastAPI backend
- 🗂️ **Career board** — job listings + live application submission
- 📍 **6 branch offices** mapped across India
- 🔒 **Admin API** — read all leads & applications via API key
- ☁️ **Firebase-ready** — swap to Firestore with a single `.env` change
- 🏠 **Scroll-to-top** — every page navigation resets to the top

---

## 🔒 Firebase Setup (Optional)

By default the backend uses an **in-memory store** (data resets on restart).  
To persist data to Firestore:

1. Go to the [Firebase Console](https://console.firebase.google.com/) → your project → **Project Settings → Service Accounts**
2. Click **Generate new private key** → download as `firebase-key.json`
3. Place `firebase-key.json` inside `backend/`
4. Update `backend/.env`:
   ```env
   FIREBASE_CREDENTIALS_PATH=firebase-key.json
   ```
5. Restart the backend — it will log `✅ Firebase Firestore initialised successfully.`

---

## 🧑‍💻 Author

**Krishna Goyal** — Web Development Intern  
Right Ads Digital, Noida • June 2026
