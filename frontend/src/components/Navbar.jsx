import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Sun, Moon, Lock, Wifi, WifiOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
  const { theme, toggleTheme } = useTheme()

  const [dbStatus, setDbStatus] = useState('checking') // 'checking' | 'connected' | 'disconnected'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true
    const checkConnection = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const res = await fetch(`${API_URL}/health`, { signal: controller.signal })
        clearTimeout(timeoutId)
        if (res.ok && active) {
          setDbStatus('connected')
        } else if (active) {
          setDbStatus('disconnected')
        }
      } catch (err) {
        if (active) {
          setDbStatus('disconnected')
        }
      }
    }
    checkConnection()
    const interval = setInterval(checkConnection, 30000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const isDark = theme === 'dark'

  return (
    <>
      {/* ── TOP INFO BAR ── */}
      <div style={{
        background: 'var(--bg-topbar)',
        borderBottom: '1px solid var(--border-faint)',
      }}>
        <div className="container-main">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            fontSize: '0.8rem',
            color: 'var(--top-bar-text)',
          }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+918377072990" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                📞 +91-8377072990
              </a>
              <a href="mailto:info@rightads.in" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                ✉ info@rightads.in
              </a>
              <span style={{ color: 'var(--text-muted)' }}>🕐 Mon – Sun (8AM – 8PM)</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://www.facebook.com/rightads" target="_blank" rel="noreferrer"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                Facebook
              </a>
              <a href="https://www.instagram.com/rightadsdigital" target="_blank" rel="noreferrer"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
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
          background: scrolled ? 'var(--bg-navbar)' : 'var(--bg-navbar-transparent)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid var(--border-primary)' : '1px solid var(--border-faint)',
          boxShadow: scrolled ? `0 4px 30px var(--shadow-navbar)` : 'none',
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
                  objectFit: 'contain',
                  filter: isDark ? 'none' : 'brightness(0.85) saturate(1.2)',
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
              <NavLink to="/calculator" label="Calculator" />
              <NavLink to="/career" label="Career" />
              <NavLink to="/contact" label="Contact" />
            </div>

            {/* CTA + Theme Toggle + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

              {/* Connection Status Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  border: dbStatus === 'connected'
                    ? '1.5px solid #10b981'
                    : dbStatus === 'disconnected'
                    ? '1.5px solid #ef4444'
                    : '1.5px solid var(--text-muted)',
                  color: dbStatus === 'connected'
                    ? '#10b981'
                    : dbStatus === 'disconnected'
                    ? '#ef4444'
                    : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: 'transparent',
                  userSelect: 'none',
                }}
                className="desktop-status-tag"
                title={
                  dbStatus === 'connected'
                    ? 'Connected to Right Ads Backend API'
                    : dbStatus === 'disconnected'
                    ? 'Disconnected from Backend API'
                    : 'Checking backend connection...'
                }
              >
                {dbStatus === 'connected' ? (
                  <>
                    <Wifi size={13} style={{ strokeWidth: 2.5 }} />
                    <span>Connected</span>
                  </>
                ) : dbStatus === 'disconnected' ? (
                  <>
                    <WifiOff size={13} style={{ strokeWidth: 2.5 }} />
                    <span>Disconnected</span>
                  </>
                ) : (
                  <>
                    <span className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block' }} />
                    <span>Connecting...</span>
                  </>
                )}
              </div>

              {/* Theme Toggle Switch */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                id="theme-toggle-btn"
              >
                <div className="theme-toggle-knob">
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.span
                        key="moon"
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Moon size={11} color="white" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sun"
                        initial={{ rotate: 30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -30, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Sun size={11} color="white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </button>

              {/* Admin Panel */}
              <Link
                to="/admin/login"
                title="Admin Panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                  e.currentTarget.style.background = 'var(--bg-surface-hover)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'var(--bg-surface)'
                }}
              >
                <Lock size={15} />
              </Link>

              <a href="tel:+918377072990" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                📞 Call Us
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: 'none', background: 'transparent', border: 'none',
                  color: 'var(--text-nav)', cursor: 'pointer', padding: '6px',
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
                background: 'var(--overlay-mobile)',
                borderTop: '1px solid var(--border-subtle)',
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
                <Link to="/calculator" className="mobile-nav-link">Budget Calculator</Link>
                <Link to="/career" className="mobile-nav-link">Career</Link>
                <Link to="/contact" className="mobile-nav-link">Contact</Link>
                <Link to="/admin/login" className="mobile-nav-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={14} /> Admin Panel
                </Link>

                {/* Mobile connection status */}
                <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>System Status</span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      border: dbStatus === 'connected' ? '1px solid #10b981' : dbStatus === 'disconnected' ? '1px solid #ef4444' : '1px solid var(--text-muted)',
                      color: dbStatus === 'connected' ? '#10b981' : dbStatus === 'disconnected' ? '#ef4444' : 'var(--text-muted)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}
                  >
                    {dbStatus === 'connected' ? (
                      <>
                        <Wifi size={11} />
                        <span>Connected</span>
                      </>
                    ) : dbStatus === 'disconnected' ? (
                      <>
                        <WifiOff size={11} />
                        <span>Disconnected</span>
                      </>
                    ) : (
                      <span>Checking...</span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <a href="tel:+918377072990" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>📞 +91-8377072990</a>
                  {/* Mobile theme toggle */}
                  <button
                    onClick={toggleTheme}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 16px', borderRadius: '12px', border: '1.5px solid var(--border-primary)',
                      background: 'var(--bg-surface)', color: 'var(--text-primary)',
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Inter, sans-serif',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .desktop-status-tag { display: none !important; }
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
    <Link to={to} className="nav-link" style={{ color: active ? 'var(--text-nav-active)' : 'var(--text-nav)', background: active ? 'var(--bg-highlight)' : 'transparent' }}>
      {label}
    </Link>
  )
}
