import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    badge: '🏆 Google Partner Agency',
    title: 'Grow Your Business',
    highlight: 'Digitally',
    subtitle: 'Right Ads is a leading Digital Marketing Agency in Noida with 11+ years of expertise. We help businesses achieve maximum ROI through innovative digital strategies.',
    cta: 'Get Free Consultation',
    ctaLink: '/contact',
    secondary: 'Our Services',
    secondaryLink: '/services/web-design',
    stat1: { value: '500+', label: 'Happy Clients' },
    stat2: { value: '11+', label: 'Years Experience' },
    accentColor: '#6366f1',
  },
  {
    badge: '📈 Digital Marketing Experts',
    title: 'Dominate Google',
    highlight: 'Search Rankings',
    subtitle: 'Our SEO, Google AdWords and Social Media strategies ensure your brand stays one step ahead. Accredited Bing Professionals managing your every campaign.',
    cta: 'Start Your Campaign',
    ctaLink: '/contact',
    secondary: 'Explore SEO Plans',
    secondaryLink: '/services/seo',
    stat1: { value: '4.6★', label: 'Average Rating' },
    stat2: { value: '108+', label: 'Google Reviews' },
    accentColor: '#06b6d4',
  },
  {
    badge: '🌐 Web Development',
    title: 'Stunning Websites',
    highlight: 'That Convert',
    subtitle: 'From custom web design to complete redesigns — we create professional online experiences that turn visitors into loyal customers for your business.',
    cta: 'View Our Work',
    ctaLink: '/gallery',
    secondary: 'Web Design Services',
    secondaryLink: '/services/web-design',
    stat1: { value: '300+', label: 'Websites Built' },
    stat2: { value: '99%', label: 'Client Satisfaction' },
    accentColor: '#f59e0b',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const go = (dir) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + slides.length) % slides.length)
  }

  const slide = slides[current]

  return (
    <section className="hero-section bg-grid">
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{
            position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
            background: `radial-gradient(circle, ${slide.accentColor}30 0%, transparent 70%)`,
            top: '-10%', left: '-5%',
            transition: 'background 0.8s ease',
          }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          style={{
            position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
            bottom: '10%', right: '5%',
          }}
        />
      </div>

      <div className="container-main" style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '720px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <motion.div
                className="section-badge"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ color: slide.accentColor, borderColor: `${slide.accentColor}40`, background: `${slide.accentColor}15` }}
              >
                {slide.badge}
              </motion.div>

              {/* Heading */}
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1.1,
                color: '#f1f5f9',
                marginBottom: '16px',
                marginTop: '8px',
              }}>
                {slide.title}{' '}
                <span style={{
                  background: `linear-gradient(135deg, ${slide.accentColor}, #06b6d4)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {slide.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{
                color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.75,
                marginBottom: '36px', maxWidth: '560px',
              }}>
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <Link to={slide.ctaLink} className="btn-primary">
                  {slide.cta} <ArrowRight size={16} />
                </Link>
                <Link to={slide.secondaryLink} className="btn-outline">
                  {slide.secondary}
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '40px' }}>
                {[slide.stat1, slide.stat2].map((s, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem',
                      background: `linear-gradient(135deg, ${slide.accentColor}, #06b6d4)`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{s.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide controls at bottom */}
      <div style={{
        position: 'absolute', bottom: '32px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10, padding: '0 24px', maxWidth: '1280px', margin: '0 auto',
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: i === current ? slide.accentColor : 'rgba(148,163,184,0.3)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ dir: -1, icon: <ChevronLeft size={18} /> }, { dir: 1, icon: <ChevronRight size={18} /> }].map(({ dir, icon }) => (
            <button key={dir} onClick={() => go(dir)}
              className="glass"
              style={{
                width: '40px', height: '40px', borderRadius: '10px', border: 'none',
                color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease', background: 'rgba(30,41,59,0.5)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(99,102,241,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)' }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <div style={{
          width: '26px', height: '42px', borderRadius: '999px',
          border: '2px solid rgba(99,102,241,0.35)',
          display: 'flex', justifyContent: 'center', paddingTop: '8px',
        }}>
          <div style={{ width: '4px', height: '10px', borderRadius: '999px', background: '#6366f1' }} />
        </div>
      </motion.div>
    </section>
  )
}
