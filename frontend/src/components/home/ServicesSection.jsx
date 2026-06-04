import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Search, MousePointer, Smartphone, Mail, MessageSquare, Palette, Phone, Building, FileCheck, BadgeCheck, ArrowRight } from 'lucide-react'

const services = [
  { icon: Globe, title: 'Web Design Services', desc: 'Professional websites that convert visitors into clients.', href: '/services/web-design', color: '#6366f1', tag: 'Web' },
  { icon: Search, title: 'SEO', desc: 'Rank higher on Google and drive organic traffic.', href: '/services/seo', color: '#06b6d4', tag: 'Marketing' },
  { icon: MousePointer, title: 'Google AdWords', desc: 'Smart PPC campaigns that maximize your ROI.', href: '/services/google-adwords', color: '#f59e0b', tag: 'Ads' },
  { icon: Building, title: 'Google My Business', desc: 'Dominate local search and attract nearby customers.', href: '/services/google-my-business', color: '#10b981', tag: 'Local' },
  { icon: Smartphone, title: 'Social Media Optimization', desc: 'Build a powerful brand across all social platforms.', href: '/services/social-media', color: '#ec4899', tag: 'Social' },
  { icon: Mail, title: 'Email Marketing', desc: 'Targeted campaigns that generate consistent revenue.', href: '/services/email-marketing', color: '#8b5cf6', tag: 'Marketing' },
  { icon: MessageSquare, title: 'SMS Marketing', desc: 'Reach thousands instantly with direct SMS campaigns.', href: '/services/sms-marketing', color: '#ef4444', tag: 'Marketing' },
  { icon: Palette, title: 'Graphic Design', desc: 'Creative visuals that make your brand unforgettable.', href: '/services/graphic-design', color: '#f97316', tag: 'Design' },
  { icon: Phone, title: 'Toll Free Service', desc: 'Branded 1800 toll-free numbers for your business.', href: '/services/toll-free', color: '#14b8a6', tag: 'Telecom' },
  { icon: FileCheck, title: 'NSIC Registration', desc: 'Unlock new government tendering opportunities.', href: '/services/nsic', color: '#64748b', tag: 'Certificate' },
  { icon: BadgeCheck, title: 'ISO Certification', desc: 'Boost credibility and win enterprise contracts.', href: '/services/iso', color: '#7c3aed', tag: 'Certificate' },
  { icon: Building, title: 'MSME / Udyam Registration', desc: 'Access government benefits and subsidy schemes.', href: '/services/msme', color: '#0891b2', tag: 'Certificate' },
]

export default function ServicesSection() {
  return (
    <section className="section bg-grid" style={{ background: 'rgba(11,15,25,0.85)', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.05) 0%, transparent 60%)',
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div className="section-badge" style={{ margin: '0 auto 12px' }}>What We Do</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '14px' }}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
            By combining powerful technology with experts who help you manage and make sense of it all, we simplify your marketing to get exceptional results.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '18px',
        }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
              viewport={{ once: true }}
            >
              <Link
                to={svc.href}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  className="card-hover"
                  style={{
                    height: '100%',
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(30,41,59,0.45)',
                    border: '1px solid rgba(99,102,241,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = `1px solid ${svc.color}40`
                    e.currentTarget.style.boxShadow = `0 20px 40px ${svc.color}12`
                    e.currentTarget.style.background = `${svc.color}06`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid rgba(99,102,241,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(30,41,59,0.45)'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: `${svc.color}18`, border: `1px solid ${svc.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '14px',
                  }}>
                    <svc.icon size={20} style={{ color: svc.color }} />
                  </div>
                  {/* Tag */}
                  <div style={{ color: svc.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>{svc.tag}</div>
                  {/* Title */}
                  <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px', lineHeight: 1.4 }}>{svc.title}</h3>
                  {/* Desc */}
                  <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '14px' }}>{svc.desc}</p>
                  {/* Arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: svc.color, fontSize: '0.8rem', fontWeight: 600 }}>
                    Learn More <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
