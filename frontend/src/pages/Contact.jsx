import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'
import { CONTACT_INFO } from '../config/contact'
import { API_URL } from '../config/api'

const branches = CONTACT_INFO.branches

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_page' }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.detail || 'Submission failed. Please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        padding: '100px 0 72px',
        position: 'relative', overflow: 'hidden',
        background: 'var(--bg-hero-page)',
      }} className="bg-grid">
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 65%)' }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>Contact Us</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Have a project in mind? Let's discuss how Right Ads can help your business grow digitally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">

          {/* Info + Form row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '72px', alignItems: 'start' }}>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-heading)', marginBottom: '28px' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                {[
                  { icon: Phone, label: 'Phone (Admin & Sales)', value: CONTACT_INFO.phone.display, href: `tel:${CONTACT_INFO.phone.raw}`, color: '#6366f1' },
                  { icon: Mail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, color: '#06b6d4' },
                  { icon: Clock, label: 'Working Hours', value: CONTACT_INFO.hours, href: '#', color: '#f59e0b' },
                  { icon: MapPin, label: 'Noida HQ', value: CONTACT_INFO.branches[0].address, href: '#', color: '#10b981' },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <a key={label} href={href} className="card-hover" style={{
                    display: 'flex', alignItems: 'flex-start', gap: '14px',
                    padding: '16px', borderRadius: '14px', textDecoration: 'none',
                    background: 'var(--bg-surface)', border: '1px solid var(--border-card)',
                  }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0, background: `${color}18`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-faint)', fontSize: '0.72rem', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{label}</div>
                      <div style={{ color: 'var(--text-subheading)', fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.5 }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-primary)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4892942431206!2d77.30940131455851!3d28.585094692978355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f97fb7b77%3A0x57e50ec90fd80e55!2sNoida%20Sector-%2015!5e0!3m2!1sen!2sin!4v1629899609046!5m2!1sen!2sin"
                  width="100%" height="240" style={{ border: '0', display: 'block' }}
                  allowFullScreen="" loading="lazy" title="Right Ads Noida"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div style={{ padding: '36px', borderRadius: '22px', background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '48px 0' }}>
                    <CheckCircle size={52} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Our team will get back to you within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                      className="btn-outline" style={{ marginTop: '20px' }}>Send Another</button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.3rem', marginBottom: '24px' }}>Send a Message</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <input id="cp-name" className="input-field" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      <input id="cp-email" className="input-field" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                      <input id="cp-phone" className="input-field" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      <textarea id="cp-msg" className="input-field" rows={5} placeholder="Your Message" style={{ resize: 'none' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                      {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '4px' }}>{error}</p>}
                      <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }} disabled={loading}>
                        {loading ? 'Sending...' : <><Send size={16} /> Submit Message</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── BRANCH OFFICES ── */}
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '32px', textAlign: 'center' }}>
              Our Offices Across India
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {branches.map((b, i) => (
                <motion.div key={b.city}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="card-hover"
                  style={{ padding: '20px', borderRadius: '16px', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MapPin size={15} style={{ color: '#6366f1', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>{b.city}</h3>
                      <p style={{ color: 'var(--text-faint)', fontSize: '0.8rem', lineHeight: 1.55, marginBottom: '6px' }}>{b.address}</p>
                      <a href={`tel:${b.phone.replace(/\D/g, '')}`} style={{ color: '#818cf8', fontSize: '0.8rem', textDecoration: 'none' }}>{b.phone}</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
