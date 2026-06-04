import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTABanner() {
  return (
    <section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #164e63 100%)',
      }} />
      <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
      <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: '#6366f1', opacity: 0.12, filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: '#06b6d4', opacity: 0.1, filter: 'blur(60px)' }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}
        >
          <div style={{ fontSize: '3rem', color: 'rgba(99,102,241,0.4)', lineHeight: 1, marginBottom: '16px' }}>"</div>
          <blockquote style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: '#f1f5f9', lineHeight: 1.45, marginBottom: '12px',
          }}>
            Leaders must be close enough to relate to others, but far enough ahead to motivate them.
          </blockquote>
          <p style={{ color: '#818cf8', fontWeight: 500, marginBottom: '36px' }}>— Annumeha, Founder, Right Ads</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              Start Your Project <ArrowRight size={18} />
            </Link>
            <a href="tel:+918377072990" className="btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>
              <Phone size={16} /> +91-8377072990
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
