import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      {/* ScrollToTop must be INSIDE <Router> so it can access useLocation */}
      <ScrollToTop />
      <div className="min-h-screen" style={{ background: 'var(--dark)' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
        <FloatingButtons />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
