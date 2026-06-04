import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Briefcase, MapPin, Clock, CheckCircle } from 'lucide-react'

const openings = [
  { title: 'SEO Executive', type: 'Full-time', location: 'Noida', exp: '1-3 years', desc: 'Experience in on-page, off-page SEO, keyword research, and Google Analytics.', color: '#6366f1' },
  { title: 'Web Designer', type: 'Full-time', location: 'Noida', exp: '1-2 years', desc: 'Proficiency in Figma, Adobe XD, HTML/CSS. Portfolio required.', color: '#06b6d4' },
  { title: 'Digital Marketing Executive', type: 'Full-time', location: 'Noida / Remote', exp: 'Fresher – 2 years', desc: 'Knowledge of social media platforms, content creation, and paid campaigns.', color: '#f59e0b' },
  { title: 'Business Development Executive', type: 'Full-time', location: 'Noida', exp: '1-3 years', desc: 'B2B sales experience, lead generation, and client relationship management.', color: '#10b981' },
  { title: 'Graphic Designer', type: 'Full-time', location: 'Noida', exp: '1-2 years', desc: 'Expertise in Adobe Illustrator, Photoshop, Canva. Creative portfolio required.', color: '#ec4899' },
]

export default function Career() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return alert('Please fill required fields.')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        padding: '100px 0 72px',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #080c14 0%, #0f172a 100%)',
      }} className="bg-grid">
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 65%)' }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>Join the Team</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#f1f5f9', lineHeight: 1.15, marginBottom: '16px' }}>
              Build Your Career at <span className="gradient-text">Right Ads</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              Join a passionate team of digital innovators, marketers, and creators. We offer growth, learning, and the chance to make a real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: '32px' }}>
            Current Openings
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px', marginBottom: '72px' }}>
            {openings.map((job, i) => (
              <motion.div key={job.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="card-hover"
                style={{ padding: '24px', borderRadius: '18px', background: 'rgba(30,41,59,0.5)', border: `1px solid ${job.color}20` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Briefcase size={20} style={{ color: job.color }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: job.color, background: `${job.color}15`, padding: '3px 10px', borderRadius: '999px' }}>{job.type}</span>
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>{job.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>{job.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', fontSize: '0.78rem' }}>
                    <MapPin size={11} /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', fontSize: '0.78rem' }}>
                    <Clock size={11} /> {job.exp}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── APPLICATION FORM ── */}
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', marginBottom: '28px', textAlign: 'center' }}>
              Apply Now
            </h2>
            <div style={{ padding: '40px', borderRadius: '24px', background: 'rgba(30,41,59,0.55)', border: '1px solid rgba(99,102,241,0.15)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={52} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.4rem', marginBottom: '8px' }}>Application Submitted!</h3>
                  <p style={{ color: '#64748b' }}>Our HR team will contact you within 3 working days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <input id="car-name" className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input id="car-email" className="input-field" placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <input id="car-phone" className="input-field" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  <select id="car-position" className="input-field" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} style={{ cursor: 'pointer' }}>
                    <option value="">Select Position</option>
                    {openings.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
                  </select>
                  <textarea id="car-msg" className="input-field" rows={4} placeholder="Tell us about yourself..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'none' }} />
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }} disabled={loading}>
                    {loading ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
