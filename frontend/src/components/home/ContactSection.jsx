import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

export default function ContactSection() {
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
        body: JSON.stringify({ ...form, source: 'home_contact' }),
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
    <section className="section" style={{ background: 'var(--bg-section-alt)' }}>
      <div className="container-main">
        <div className="grid-2">

          {/* Left – Info */}
          <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="section-badge">Get In Touch</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '14px', color: 'var(--text-heading)' }}>
              You Can <span className="gradient-text">Contact Us</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '32px' }}>
              Looking for a new website, SEO strategy, or wanting to grow online? We're here to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: Phone, label: 'Phone Us', value: '+91-8377072990', href: 'tel:+918377072990', color: '#6366f1' },
                { icon: Mail, label: 'Mail Us', value: 'info@rightads.in', href: 'mailto:info@rightads.in', color: '#06b6d4' },
                { icon: MapPin, label: 'Noida Office (HQ)', value: 'A-71, 3rd Floor, Sector 15, Noida, UP 201301', href: '#', color: '#f59e0b' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a key={label} href={href}
                  className="card-hover"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px', borderRadius: '14px', textDecoration: 'none',
                    background: 'var(--bg-surface)', border: '1px solid var(--border-card)',
                  }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: `${color}18`, border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-faint)', fontSize: '0.75rem', marginBottom: '2px' }}>{label}</div>
                    <div style={{ color: 'var(--text-subheading)', fontWeight: 500, fontSize: '0.875rem' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right – Form */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div style={{
              padding: '36px', borderRadius: '24px',
              background: 'var(--bg-surface)', border: '1px solid var(--border-primary)',
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={52} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                    className="btn-outline" style={{ marginTop: '20px' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.2rem', marginBottom: '24px' }}>Send Us a Message</h3>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <input id="hs-name" className="input-field" placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      <input id="hs-email" className="input-field" placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <input id="hs-phone" className="input-field" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    <textarea id="hs-msg" className="input-field" rows={5} placeholder="Your Message" style={{ resize: 'none' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '4px' }}>{error}</p>}
                    <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }} disabled={loading}>
                      {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
