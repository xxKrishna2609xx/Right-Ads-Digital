import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Web Design Services', href: '/services/web-design' },
  { label: 'Website Redesign', href: '/services/website-redesign' },
  { label: 'SEO', href: '/services/seo' },
  { label: 'Google My Business', href: '/services/google-my-business' },
  { label: 'Google AdWords', href: '/services/google-adwords' },
  { label: 'Digital Business Card', href: '/services/digital-business-card' },
  { label: 'Social Media Optimization', href: '/services/social-media' },
  { label: 'SMS Marketing', href: '/services/sms-marketing' },
  { label: 'Email Marketing', href: '/services/email-marketing' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Toll Free Service', href: '/services/toll-free' },
]

const certificates = [
  { label: 'NSIC Registration', href: '/services/nsic' },
  { label: 'ISO Certification', href: '/services/iso' },
  { label: 'MSME / Udyam Registration', href: '/services/msme' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [certOpen, setCertOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      {/* ── TOP INFO BAR ── */}
      <div className="top-bar" style={{ display: 'none' }} id="topbar-desktop">
      </div>
      <div style={{
        background: 'rgba(8,12,20,0.98)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        display: 'none'
      }} className="hidden-mobile">
      </div>

      <div style={{
        background: 'rgba(8,12,20,0.98)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
      }}>
        <div className="container-main">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            fontSize: '0.8rem',
            color: '#64748b',
          }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+918377072990" style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#64748b'}>
                📞 +91-8377072990
              </a>
              <a href="mailto:info@rightads.in" style={{ color: '#64748b', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#64748b'}>
                ✉ info@rightads.in
              </a>
              <span>🕐 Mon – Sun (8AM – 8PM)</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://www.facebook.com/rightads" target="_blank" rel="noreferrer"
                style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.8rem' }}
                onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#64748b'}>
                Facebook
              </a>
              <a href="https://www.instagram.com/rightadsdigital" target="_blank" rel="noreferrer"
                style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.8rem' }}
                onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#64748b'}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="navbar"
        style={{
          background: scrolled ? 'rgba(11,15,25,0.92)' : 'rgba(11,15,25,0.75)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : '1px solid rgba(99,102,241,0.06)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div className="container-main">
          <div className="navbar-inner">

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img 
                src="/logo.png" 
                alt="Right Ads Logo" 
                style={{ 
                  height: '42px', 
                  objectFit: 'contain'
                }} 
              />
            </Link>

            {/* Desktop nav links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
              <NavLink to="/" label="Home" />
              <NavLink to="/about" label="About" />

              {/* Services dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}>
                <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Services
                  <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="dropdown-menu glass-dark"
                    >
                      {services.map(s => (
                        <Link key={s.href} to={s.href} className="dropdown-item">{s.label}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Certificates dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setCertOpen(true)}
                onMouseLeave={() => setCertOpen(false)}>
                <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Certificates
                  <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: certOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                <AnimatePresence>
                  {certOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="dropdown-menu glass-dark"
                    >
                      {certificates.map(c => (
                        <Link key={c.href} to={c.href} className="dropdown-item">{c.label}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/gallery" label="Gallery" />
              <NavLink to="/career" label="Career" />
              <NavLink to="/contact" label="Contact" />
            </div>

            {/* CTA + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="tel:+918377072990" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                📞 Call Us
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: 'none', background: 'transparent', border: 'none',
                  color: '#94a3b8', cursor: 'pointer', padding: '6px',
                  borderRadius: '8px',
                }}
                className="hamburger-btn"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(11,15,25,0.98)',
                borderTop: '1px solid rgba(99,102,241,0.1)',
                overflow: 'hidden',
              }}
            >
              <div className="container-main" style={{ paddingTop: '12px', paddingBottom: '16px' }}>
                <Link to="/" className="mobile-nav-link">Home</Link>
                <Link to="/about" className="mobile-nav-link">About Us</Link>
                <div style={{ padding: '8px 16px 4px', fontSize: '0.7rem', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Services</div>
                {services.map(s => <Link key={s.href} to={s.href} className="mobile-nav-link">{s.label}</Link>)}
                <div style={{ padding: '8px 16px 4px', fontSize: '0.7rem', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Certificates</div>
                {certificates.map(c => <Link key={c.href} to={c.href} className="mobile-nav-link">{c.label}</Link>)}
                <Link to="/gallery" className="mobile-nav-link">Gallery</Link>
                <Link to="/career" className="mobile-nav-link">Career</Link>
                <Link to="/contact" className="mobile-nav-link">Contact</Link>
                <div style={{ marginTop: '12px' }}>
                  <a href="tel:+918377072990" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>📞 +91-8377072990</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Responsive styles injected via style tag */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}

function NavLink({ to, label }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link to={to} className="nav-link" style={{ color: active ? '#a5b4fc' : '#94a3b8', background: active ? 'rgba(99,102,241,0.1)' : 'transparent' }}>
      {label}
    </Link>
  )
}
