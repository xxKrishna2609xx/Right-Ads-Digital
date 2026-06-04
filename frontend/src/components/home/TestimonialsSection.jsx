import { motion } from 'framer-motion'

const testimonials = [
  { name: 'Rajesh Kumar', role: 'CEO, TechSoft Solutions', text: 'Right Ads transformed our online presence completely. Our website traffic increased by 300% within 3 months. Highly recommend their SEO services!', rating: 5 },
  { name: 'Priya Sharma', role: 'Director, Fashion Hub', text: 'The team at Right Ads is exceptional. They delivered a stunning website redesign and our Google Ads campaigns are performing brilliantly. Best agency in Noida!', rating: 5 },
  { name: 'Amit Gupta', role: 'Owner, Gupta Enterprises', text: 'We got our MSME registration and SEO done through Right Ads. Professional, timely and truly results-driven. Very satisfied!', rating: 5 },
  { name: 'Sunita Verma', role: 'MD, Verma Industries', text: 'Right Ads has managed our digital marketing for 2 years. Their social media and Google strategies helped us grow 5x. Outstanding team!', rating: 4 },
]

export default function TestimonialsSection() {
  return (
    <section className="section" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(6,182,212,0.03) 100%)',
    }}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div className="section-badge" style={{ margin: '0 auto 12px' }}>Client Reviews</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
            Trusted by hundreds of businesses across India for exceptional digital results.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-hover"
              style={{
                padding: '28px', borderRadius: '18px',
                background: 'rgba(30,41,59,0.55)', border: '1px solid rgba(99,102,241,0.12)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '0.875rem' }}>★</span>)}
                {[...Array(5 - t.rating)].map((_, j) => <span key={j} style={{ color: '#334155', fontSize: '0.875rem' }}>★</span>)}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                }}>{t.name.charAt(0)}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                  <div style={{ color: '#475569', fontSize: '0.75rem' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
