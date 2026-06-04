import { motion } from 'framer-motion'

const team = [
  { name: 'Mr. Hukum Singh', role: 'Business Analyst', initial: 'HS', color: '#6366f1' },
  { name: 'Mrs. H. Singh', role: 'Admin Dept & HR', initial: 'HS', color: '#06b6d4' },
  { name: 'Mrs. Gunjan', role: 'Back Office Admin', initial: 'GU', color: '#f59e0b' },
  { name: 'Sheetal', role: 'Sales Department', initial: 'SH', color: '#10b981' },
  { name: 'Abdus', role: 'Marketing Department', initial: 'AB', color: '#ec4899' },
]

export default function TeamSection() {
  return (
    <section className="section" style={{ background: 'rgba(11,15,25,0.6)' }}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div className="section-badge" style={{ margin: '0 auto 12px' }}>The People</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '12px' }}>
            Our <span className="gradient-text">Team</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
            A group of passionate professionals working together to deliver measurable digital results.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="card-hover"
              style={{
                textAlign: 'center', padding: '28px 24px', borderRadius: '18px',
                width: '160px', background: 'rgba(30,41,59,0.55)',
                border: '1px solid rgba(99,102,241,0.12)',
              }}
            >
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px', margin: '0 auto 14px',
                background: `linear-gradient(135deg, ${member.color}, ${member.color}80)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 900, fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif',
              }}>{member.initial}</div>
              <h3 style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem', marginBottom: '4px' }}>{member.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.75rem' }}>{member.role}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginTop: '10px' }}>
                {[...Array(4)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '0.75rem' }}>★</span>)}
                <span style={{ color: '#334155', fontSize: '0.75rem' }}>★</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
