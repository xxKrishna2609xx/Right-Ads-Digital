import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ScrollToTop from './components/ScrollToTop'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './pages/Career'
import Gallery from './pages/Gallery'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-body)' }}>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:serviceId" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/gallery" element={<Gallery />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <FloatingButtons />}
      {!isAdminPath && <ChatBot />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* ScrollToTop must be INSIDE <Router> so it can access useLocation */}
        <ScrollToTop />
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App

