import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Eye, Lightbulb, HelpCircle } from 'lucide-react'

const items = [
  {
    icon: Eye,
    title: 'Our Vision',
    content: 'To identify and provide ideal solutions for the betterment of our clients. To establish a fully functional marketing solution through professionalism and transparency.',
    color: '#6366f1',
  },
  {
    icon: Lightbulb,
    title: 'Ideas & Solutions',
    content: 'While creating a world class website, we make your first online impression into a long lasting one. We never let you go from the mind of your customer — keeping you always in front of your potential audience through our effective digital marketing tools.',
    color: '#06b6d4',
  },
  {
    icon: HelpCircle,
    title: 'Why Choose Right Ads?',
    content: 'We are the experts of online media with accreditation as official Partner of Google & Microsoft. We understand industrial and manufacturing business processes through our expertise, producing award-winning solutions that help our clients achieve their goals.',
    color: '#f59e0b',
  },
]

const capabilities = [
  'Google Adwords', 'Digital Marketing', 'Web Designing', 'Web Development',
  'Content Marketing', 'Creative Advertising', 'Online Branding', 'Web Hosting',
  'Lead Generation', 'Project Management', 'Social Media', 'SEO & SEM',
]

export default function VisionSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.03), transparent)' }}>
      <div className="container-main">
        <div className="grid-2">

          {/* Left – Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge">Our Story</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '16px' }}>
              Our Best <span className="gradient-text">Work</span>
            </h2>
            <p style={{ color: '#64748b', marginBottom: '28px', lineHeight: 1.75 }}>
              By combining powerful technology with experts who help you manage and make sense of it all, we simplify your marketing to get exceptional results.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: open === i ? `${item.color}0d` : 'rgba(30,41,59,0.45)',
                    border: open === i ? `1px solid ${item.color}35` : '1px solid rgba(99,102,241,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                        background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <item.icon size={17} style={{ color: item.color }} />
                      </div>
                      <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.95rem' }}>{item.title}</span>
                    </div>
                    <ChevronDown
                      size={17} style={{ color: '#64748b', transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
                    />
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <div style={{
                          padding: '0 20px 18px', color: '#64748b', fontSize: '0.875rem', lineHeight: 1.75,
                          borderTop: `1px solid ${item.color}20`, paddingTop: '14px',
                        }}>
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              padding: '36px', borderRadius: '24px', position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.05))',
              border: '1px solid rgba(99,102,241,0.2)',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '180px', height: '180px',
                borderRadius: '50%', background: '#6366f1', opacity: 0.08, filter: 'blur(40px)',
                transform: 'translate(30%, -30%)',
              }} />
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '24px' }}>
                <span className="gradient-text">How Right Ads Can Help</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {capabilities.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    viewport={{ once: true }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '0.8rem', color: '#94a3b8', padding: '8px 10px', borderRadius: '8px',
                      background: 'rgba(99,102,241,0.06)',
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
