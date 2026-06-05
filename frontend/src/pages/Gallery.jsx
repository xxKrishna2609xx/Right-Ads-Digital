import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

const events = [
  { title: 'Digital Marketing Summit 2023', category: 'Conference', year: '2023', color: '#6366f1' },
  { title: 'Google Partners Meet', category: 'Partnership', year: '2022', color: '#06b6d4' },
  { title: 'Team Building Event', category: 'Internal', year: '2023', color: '#f59e0b' },
  { title: 'Client Appreciation Day', category: 'Client Event', year: '2022', color: '#10b981' },
  { title: 'SEO Workshop', category: 'Training', year: '2023', color: '#ec4899' },
  { title: 'Annual Awards Ceremony', category: 'Awards', year: '2022', color: '#8b5cf6' },
  { title: 'Brand Launch Campaign', category: 'Campaign', year: '2023', color: '#ef4444' },
  { title: 'Webinar: Future of Digital', category: 'Webinar', year: '2023', color: '#14b8a6' },
  { title: 'MSME Business Conclave', category: 'Business', year: '2023', color: '#f97316' },
  { title: 'Creative Design Workshop', category: 'Training', year: '2022', color: '#0891b2' },
  { title: 'Social Media Bootcamp', category: 'Training', year: '2023', color: '#7c3aed' },
  { title: 'Year-End Celebration 2022', category: 'Internal', year: '2022', color: '#64748b' },
]

export default function Gallery() {
  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        padding: '100px 0 72px',
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-hero-page)',
      }} className="bg-grid">
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 65%)' }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>Event Gallery</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Moments from our events, workshops, campaigns, and team activities over the years.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
            {events.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.06, 0.5) }}
                viewport={{ once: true }}
                className="card-hover"
                style={{ borderRadius: '18px', overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}
              >
                {/* Image placeholder */}
                <div style={{
                  height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                  background: `linear-gradient(135deg, ${ev.color}18, ${ev.color}06)`,
                }}>
                  <ImageIcon size={40} style={{ color: `${ev.color}60` }} />
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: `${ev.color}20`, color: ev.color,
                    fontSize: '0.72rem', fontWeight: 700,
                    padding: '3px 10px', borderRadius: '999px',
                  }}>
                    {ev.year}
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ color: ev.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '5px' }}>
                    {ev.category}
                  </div>
                  <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.4 }}>{ev.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
