import { motion } from 'framer-motion'
import { CheckCircle, Award, Users, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  { icon: Award, text: 'Official Google Partner' },
  { icon: CheckCircle, text: 'Bing Accredited Professionals' },
  { icon: Users, text: 'Serving 500+ Corporate & SME Clients' },
  { icon: Target, text: 'Maximum ROI Focused Strategies' },
]

export default function AboutSection() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.06) 0%, transparent 60%)',
      }} />

      <div className="container-main">
        <div className="grid-2">

          {/* Left - Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              border: '1px solid rgba(99,102,241,0.2)',
              padding: '40px',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px', height: '60px'
                }}>
                  <img 
                    src="/logo.png" 
                    alt="Right Ads Logo" 
                    style={{ 
                      height: '56px', 
                      objectFit: 'contain'
                    }} 
                  />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  Right Ads Digital
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Making Digital Simpler</p>
              </div>

              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { year: '2012', event: 'Right Ads Founded in Delhi NCR' },
                  { year: '2015', event: 'Google Partner Certification' },
                  { year: '2018', event: 'Expanded to 6 Cities across India' },
                  { year: '2023', event: '500+ Clients, 11 Years of Excellence' },
                ].map(({ year, event }) => (
                  <div key={year} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.8rem', width: '36px', flexShrink: 0 }}>{year}</div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                    <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{event}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{
                position: 'absolute', bottom: '-20px', right: '-16px',
                background: 'rgba(30,41,59,0.9)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '14px', padding: '12px 18px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>4.6 ★</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>108 Google Reviews</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">About Right Ads</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px' }}>
              A Few Words{' '}
              <span className="gradient-text">About Us</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '28px' }}>
              <p>
                Right Ads brings you tailored solutions to meet your needs and budget. With <strong style={{ color: '#fff' }}>11+ years of experience</strong> in digital services, our promise is to provide an enthusiastic team to deliver maximum return with best results for your business.
              </p>
              <p>
                We are proud to be amongst the digital marketing agencies who are <strong style={{ color: '#818cf8' }}>Google Partners</strong> and accredited Bing Professionals. Our services are designed entirely to deliver the best results for your business.
              </p>
              <p>
                We offer services to <strong style={{ color: '#fff' }}>Corporate Companies, SMEs, MSMEs</strong> and Entrepreneurs with 11+ years of expertise across Technology, Marketing, Branding, Web Design & Development, and Project Management.
              </p>
            </div>

            {/* Highlights grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 14px', borderRadius: '10px',
                  background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
                }}>
                  <Icon size={15} color="#818cf8" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{text}</span>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary">Learn More About Us</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
