# ⚡ Right Ads Digital Agency

> A premium, high-performance, and visually stunning web application for Right Ads Digital Agency. Features smooth micro-animations, structured services navigation, automated workflows, and a robust FastAPI backend.

---

## 🎨 Design System & Aesthetics

The application is crafted with a **modern dark-mode glassmorphic aesthetic** featuring:
- **Harmonious HSL Palettes**: Elegant deep slates, dark indigos, and vibrant cyan gradients.
- **Premium Typography**: Using Google Fonts (`Outfit` for headings, `Inter` for body copy) instead of system defaults.
- **Dynamic Micro-Animations**: Smooth hover transitions, fade-in-up animations, and responsive sliding states powered by Framer Motion.
- **Responsive Alignment**: Pixel-perfect grid layout optimized across mobile, tablet, and desktop devices.
- **Transparent Branding**: Custom-processed brand logo with anti-aliasing color correction optimized to blend natively into dark-mode environments.

---

## 🚀 Key Features

- 🏠 **Home Page**: Interactive client statistics, certified partner timeline, vision/mission accordions, core service capabilities, client testimonials, and quick consultation request banners.
- 💼 **Services Directory**: Responsive sticky sidebar navigator supporting 14 distinct digital marketing and design services with comprehensive feature checklists.
- 📜 **Certificates**: Official NSIC, ISO, and MSME/Udyam registration validation and details.
- 🎨 **Media Gallery**: Filterable grids showcasing agency conferences, Google Partners meets, and corporate events.
- 🧑‍💻 **Careers Board**: Modern job vacancy listings with a clean application form submission portal.
- 📍 **Branch Locator**: Google Map integration for 6 active corporate and branch offices (Noida HQ, Sector 2, Faridabad, Mathura, Kota, Dehradun).

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Build Tool** | Vite | Ultra-fast HMR and optimized bundler |
| **Frontend** | React (JS) | Component-based interactive UI |
| **Animations** | Framer Motion | Fluid transitions and layout animation |
| **Icons** | Lucide React | Clean, scalable vector outline icons |
| **Styling** | Custom HSL CSS | Pure modern CSS design tokens |
| **Backend** | FastAPI (Python) | Modern, fast, asynchronous web API |
| **Database** | Firebase Admin | Reliable real-time cloud data storage |

---

## 📂 Directory Structure

```text
Right Ads Digital/
├── frontend/               # React + Vite Client Application
│   ├── public/             # Static assets (transparent logos, icons)
│   ├── src/
│   │   ├── assets/         # App asset directories
│   │   ├── components/     # Reusable UI elements (Navbar, Footer, Home sections)
│   │   ├── pages/          # Page layouts (About, Career, Contact, Services, etc.)
│   │   ├── App.css         # Styling defaults and utility animations
│   │   ├── index.css       # Core HSL color variables and global layout system
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite build configuration
│
├── backend/                # Python FastAPI Backend
│   ├── main.py             # Server endpoints & database config
│   ├── requirements.txt    # Python dependency manifest
│   └── venv/               # Python virtual environment
│
├── README.md               # Project documentation
└── .gitignore              # Project-wide git filter configuration
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)

---

### 1. Frontend Setup & Execution

```bash
# Navigate to the frontend directory
cd frontend

# Install package dependencies
npm install

# Run the development server (default port: 5173)
npm run dev
```

The frontend application will be active at **[http://localhost:5173/](http://localhost:5173/)**.

---

### 2. Backend Setup & Execution

```bash
# Navigate to the backend directory
cd backend

# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows (PowerShell):
venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install required python libraries
pip install -r requirements.txt

# Run the development FastAPI server
uvicorn main:app --reload --port 8000
```

The API endpoints will be accessible at **[http://localhost:8000/](http://localhost:8000/)** and the interactive API documentation will be available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 🔒 Environment Configuration

To configure environment variables for the project, create a `.env` file inside the respective directories.

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
FIREBASE_CREDENTIALS_PATH=path/to/firebase-key.json
PORT=8000
```
