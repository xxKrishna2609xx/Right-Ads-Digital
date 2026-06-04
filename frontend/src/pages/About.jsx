import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Award, Users, Target, CheckCircle, Globe, Zap } from 'lucide-react'

export default function About() {
  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        padding: '100px 0 72px',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #080c14 0%, #0f172a 100%)',
      }} className="bg-grid">
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 65%)' }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>About Us</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#f1f5f9', lineHeight: 1.15, marginBottom: '16px' }}>
              A Few Words <span className="gradient-text">About Right Ads</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              11+ years of digital excellence, empowering hundreds of businesses across India to achieve maximum ROI through innovative digital strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">

          {/* Story + badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px' }}>
            <motion.div initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '20px' }}>
                Our <span className="gradient-text">Story</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#64748b', lineHeight: 1.8, fontSize: '0.95rem' }}>
                <p>Right Ads brings you tailored solutions to meet your needs and budget. We have <strong style={{ color: '#fff' }}>11 years experience in digital services</strong>. Our promise is to provide an enthusiastic team to deliver maximum return with best results for your business.</p>
                <p>We are proud to be amongst the digital marketing agencies who are <strong style={{ color: '#818cf8' }}>Google Partners</strong> and accredited Bing Professionals. You can rest assured that our services are designed to deliver the best results for your business.</p>
                <p>Right Ads is one of the leading Digital Marketing companies in Delhi NCR, India. The sole objective is to maximize the ROI of their clients and assist them in identifying the right marketing medium.</p>
                <p>A professional team with diversified experience in the field of Technology, Marketing, Branding, Website Design & Development, Mobile App Development and Project Management. With cumulative experience of over 11 years across Digital Marketing, SMO, SEO, Web Technologies, Online Branding, and Online Reputation Management.</p>
                <p>The company offers services to <strong style={{ color: '#fff' }}>Corporate Companies, SME, MSME</strong> and Entrepreneurs.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { icon: Award, title: 'Google Partner', desc: 'Official certified Google Partner agency', color: '#6366f1' },
                  { icon: Globe, title: 'Bing Accredited', desc: 'Microsoft Bing Accredited Professional', color: '#06b6d4' },
                  { icon: Users, title: '500+ Clients', desc: 'SMEs, MSMEs and Enterprise clients', color: '#f59e0b' },
                  { icon: Target, title: 'ROI Focused', desc: 'Maximum return on your investment', color: '#10b981' },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className="card-hover" style={{
                    padding: '20px', borderRadius: '16px',
                    background: `${color}08`, border: `1px solid ${color}20`,
                  }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, marginBottom: '12px' }}>
                      <Icon size={19} style={{ color }} />
                    </div>
                    <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{title}</h4>
                    <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mission / Vision / Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: Target, title: 'Our Mission', color: '#6366f1', desc: 'To maximize the ROI of our clients and assist them in identifying the right marketing medium through innovative digital strategies and expert guidance.' },
              { icon: Zap, title: 'Our Vision', color: '#06b6d4', desc: 'To identify and provide ideal solutions for the betterment of our clients. To establish a fully functional marketing solution through professionalism and transparency.' },
              { icon: CheckCircle, title: 'Our Values', color: '#f59e0b', desc: 'Integrity, innovation and client success are at the heart of everything we do. We believe in transparent communication and delivering measurable results.' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ padding: '28px', borderRadius: '18px', background: `${color}08`, border: `1px solid ${color}22` }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, marginBottom: '16px' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.75 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '64px 0', textAlign: 'center', borderTop: '1px solid rgba(99,102,241,0.1)', background: 'rgba(99,102,241,0.04)' }}>
        <div className="container-main">
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '10px' }}>
            Ready to Grow Your Business?
          </h2>
          <p style={{ color: '#64748b', marginBottom: '28px' }}>Let's discuss how Right Ads can help you achieve your digital goals.</p>
          <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-story { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .about-mvv { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
