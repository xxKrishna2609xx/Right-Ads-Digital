import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Globe, Search, MousePointer, Smartphone, Mail, MessageSquare, Palette, Building, FileCheck, BadgeCheck } from 'lucide-react'

const serviceData = {
  'web-design': {
    title: 'Web Design Services',
    subtitle: 'Professional websites that create powerful first impressions.',
    color: '#6366f1',
    icon: Globe,
    description: 'Right Ads offers professional web design services that combine stunning aesthetics with high-performance functionality. Our websites are built to rank on Google, load fast, and convert visitors into customers.',
    features: ['Custom Website Design', 'Mobile-Responsive Layouts', 'Fast Loading Speed', 'SEO-Optimized Structure', 'CMS Integration', 'E-Commerce Ready', 'Google Analytics Setup', '1-Year Free Support'],
  },
  'website-redesign': {
    title: 'Website Redesign',
    subtitle: 'Transform your old website into a modern digital powerhouse.',
    color: '#06b6d4',
    icon: Globe,
    description: 'Is your website outdated or underperforming? Right Ads specializes in website redesign, modernizing the UI/UX, improving loading speed, and boosting conversions without losing SEO equity.',
    features: ['Full UI/UX Redesign', 'Performance Optimization', 'Mobile-First Approach', 'SEO Preservation', 'CMS Migration', 'Brand Consistency', 'A/B Testing Ready', 'Analytics Integration'],
  },
  'seo': {
    title: 'SEO (Search Engine Optimization)',
    subtitle: 'Dominate Google rankings and drive organic traffic to your business.',
    color: '#f59e0b',
    icon: Search,
    description: 'Our SEO experts use proven, white-hat strategies to rank your website on page 1 of Google. From keyword research to link building, we handle everything to grow your organic traffic sustainably.',
    features: ['Keyword Research & Strategy', 'On-Page SEO Optimization', 'Technical SEO Audit', 'Link Building', 'Local SEO', 'Google Search Console Setup', 'Monthly Reports', 'Competitor Analysis'],
  },
  'google-adwords': {
    title: 'Google AdWords (PPC)',
    subtitle: 'Smart paid campaigns that maximize ROI and bring instant leads.',
    color: '#10b981',
    icon: MousePointer,
    description: 'As a certified Google Partner, Right Ads manages high-performing Google AdWords campaigns that deliver measurable results. We optimize every campaign to maximize your return on ad spend.',
    features: ['Campaign Strategy & Setup', 'Keyword Bid Management', 'Ad Copywriting', 'Landing Page Optimization', 'Remarketing Campaigns', 'Display & Shopping Ads', 'Conversion Tracking', 'Monthly Performance Reports'],
  },
  'google-my-business': {
    title: 'Google My Business',
    subtitle: 'Get found locally and convert nearby customers effortlessly.',
    color: '#6366f1',
    icon: Building,
    description: 'Optimize your Google My Business listing to dominate local search results, attract nearby customers, and boost store visits and calls. Essential for any business with a physical presence.',
    features: ['Profile Optimization', 'Regular Posts & Updates', 'Review Management', 'Q&A Management', 'Photo Upload Optimization', 'Local Citation Building', 'Insights & Analytics', 'Competitor Monitoring'],
  },
  'social-media': {
    title: 'Social Media Optimization',
    subtitle: 'Build a powerful brand presence across all major social platforms.',
    color: '#ec4899',
    icon: Smartphone,
    description: 'Our SMO services ensure your brand stays active, consistent and engaging across Facebook, Instagram, LinkedIn, Twitter and more. We create content that resonates and converts.',
    features: ['Social Media Audit', 'Profile Optimization', 'Content Calendar Creation', 'Creative Post Design', 'Community Management', 'Hashtag Strategy', 'Paid Social Campaigns', 'Monthly Analytics Reports'],
  },
  'email-marketing': {
    title: 'Email Marketing',
    subtitle: 'Targeted campaigns that nurture leads and generate consistent revenue.',
    color: '#8b5cf6',
    icon: Mail,
    description: 'Email marketing remains one of the highest ROI digital channels. Right Ads designs, writes, and manages email campaigns that engage your subscribers and drive repeat business.',
    features: ['Email Strategy & Planning', 'Template Design', 'List Segmentation', 'Automated Drip Campaigns', 'A/B Split Testing', 'Deliverability Optimization', 'Open Rate Analysis', 'Unsubscribe Management'],
  },
  'sms-marketing': {
    title: 'SMS Marketing',
    subtitle: 'Reach thousands instantly with high open-rate SMS campaigns.',
    color: '#ef4444',
    icon: MessageSquare,
    description: 'SMS has a 98% open rate. Right Ads manages bulk SMS campaigns that deliver promotional messages, OTPs, and reminders directly to your customers\' phones for immediate engagement.',
    features: ['Bulk SMS Campaigns', 'Transactional SMS', 'Promotional SMS', 'DND Filter Compliance', 'Personalized Messaging', 'Delivery Reports', 'Short Code Services', 'API Integration'],
  },
  'graphic-design': {
    title: 'Graphic Design',
    subtitle: 'Creative visuals that make your brand unforgettable.',
    color: '#f97316',
    icon: Palette,
    description: 'From logo design to complete brand identity systems, social media creatives, brochures, and print materials — our design team brings your brand to life with creative excellence.',
    features: ['Logo & Brand Identity', 'Social Media Creatives', 'Brochure & Flyer Design', 'Business Cards', 'Banner & Hoarding Design', 'Packaging Design', 'Infographic Creation', 'Video Thumbnails'],
  },
  'toll-free': {
    title: 'Toll Free Service',
    subtitle: 'Boost customer trust and accessibility with 1800 toll-free numbers.',
    color: '#14b8a6',
    icon: Phone,
    description: 'A toll-free number adds professionalism and trust to your business. Right Ads provides 1800 toll-free numbers with cloud telephony features, call routing, and IVR integration.',
    features: ['1800 Toll Free Numbers', 'IVR Setup', 'Call Routing', 'Call Recording', 'Multi-City Connectivity', 'Missed Call Alert', 'Click-to-Call Integration', 'Monthly Call Reports'],
  },
  'nsic': {
    title: 'NSIC Registration for Govt. Tendering',
    subtitle: 'Unlock government contracts with official NSIC registration.',
    color: '#64748b',
    icon: FileCheck,
    description: 'NSIC (National Small Industries Corporation) registration allows your business to participate in government tenders and procurement. Right Ads guides you through the complete process.',
    features: ['Eligibility Assessment', 'Document Preparation', 'Application Filing', 'Follow-up & Coordination', 'Certificate Delivery', 'Renewal Support', 'MSE Tender Access', 'Expert Guidance'],
  },
  'iso': {
    title: 'ISO Certification',
    subtitle: 'Boost credibility and win enterprise contracts with ISO certification.',
    color: '#7c3aed',
    icon: BadgeCheck,
    description: 'ISO certification demonstrates your commitment to quality, safety, and efficiency. Right Ads assists businesses in obtaining ISO 9001, 14001, 45001 and other relevant certifications.',
    features: ['ISO 9001 (Quality)', 'ISO 14001 (Environment)', 'ISO 45001 (Health & Safety)', 'Gap Analysis', 'Documentation Support', 'Audit Preparation', 'Certification Body Liaison', '3-Year Validity Support'],
  },
  'msme': {
    title: 'MSME / Udyam Registration',
    subtitle: 'Access government benefits, subsidies and support schemes.',
    color: '#0891b2',
    icon: Building,
    description: 'Udyam (MSME) registration unlocks a range of government benefits including subsidies, priority lending, and exemptions. Right Ads completes the registration process quickly and accurately.',
    features: ['Udyam Registration', 'MSME Certificate', 'Priority Sector Lending Benefits', 'Government Subsidy Access', 'Credit Guarantee Benefits', 'Tax Concessions', 'Technology Upgradation Support', 'Zero-Cost Dispute Resolution'],
  },
  'digital-business-card': {
    title: 'Digital Business Card',
    subtitle: 'Modern, shareable digital cards that make you memorable.',
    color: '#06b6d4',
    icon: Globe,
    description: 'Replace outdated paper business cards with professional digital business cards that you can share via QR code, WhatsApp, or email. Impress clients and stay connected 24/7.',
    features: ['Custom Design', 'QR Code Integration', 'Contact Save Button', 'Social Media Links', 'Portfolio Showcase', 'WhatsApp Sharing', 'Analytics Tracking', 'Lifetime Hosting'],
  },
}

// Sidebar nav items
const allServices = [
  { label: 'Web Design Services', href: '/services/web-design' },
  { label: 'Website Redesign', href: '/services/website-redesign' },
  { label: 'SEO', href: '/services/seo' },
  { label: 'Google AdWords', href: '/services/google-adwords' },
  { label: 'Google My Business', href: '/services/google-my-business' },
  { label: 'Social Media Optimization', href: '/services/social-media' },
  { label: 'Email Marketing', href: '/services/email-marketing' },
  { label: 'SMS Marketing', href: '/services/sms-marketing' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Toll Free Service', href: '/services/toll-free' },
  { label: 'Digital Business Card', href: '/services/digital-business-card' },
  { label: 'NSIC Registration', href: '/services/nsic' },
  { label: 'ISO Certification', href: '/services/iso' },
  { label: 'MSME / Udyam Registration', href: '/services/msme' },
]

export default function Services() {
  const { serviceId } = useParams()
  const service = serviceData[serviceId]

  if (!service) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#fff' }}>Service Not Found</h2>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  const ServiceIcon = service.icon

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        padding: '96px 0 72px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #080c14 0%, #0f172a 100%)',
      }} className="bg-grid">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 50%, ${service.color}18 0%, transparent 65%)`,
        }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Icon */}
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px', margin: '0 auto 20px',
              background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 16px 40px ${service.color}35`,
            }}>
              <ServiceIcon size={32} color="white" />
            </div>
            <div className="section-badge" style={{
              margin: '0 auto 16px',
              color: service.color,
              borderColor: `${service.color}40`,
              background: `${service.color}15`,
            }}>
              Our Services
            </div>
            <h1 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#f1f5f9', lineHeight: 1.15, marginBottom: '16px',
            }}>
              {service.title}
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto' }}>
              {service.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-main">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '40px',
            alignItems: 'start',
          }}>

            {/* ── SIDEBAR ── */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                position: 'sticky', top: '100px',
                borderRadius: '18px', overflow: 'hidden',
                background: 'rgba(30,41,59,0.5)',
                border: '1px solid rgba(99,102,241,0.15)',
              }}
            >
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(99,102,241,0.1)',
                background: 'rgba(99,102,241,0.06)',
              }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  All Services
                </h3>
              </div>
              <nav style={{ padding: '8px 0' }}>
                {allServices.map(s => {
                  const isActive = s.href === `/services/${serviceId}`
                  return (
                    <Link
                      key={s.href}
                      to={s.href}
                      style={{
                        display: 'block',
                        padding: '10px 20px',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        borderLeft: isActive ? `3px solid ${service.color}` : '3px solid transparent',
                        color: isActive ? '#fff' : '#64748b',
                        background: isActive ? `${service.color}10` : 'transparent',
                        fontWeight: isActive ? 600 : 400,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#cbd5e1'
                          e.currentTarget.style.background = 'rgba(99,102,241,0.06)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#64748b'
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      {s.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.aside>

            {/* ── CONTENT AREA ── */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Overview */}
              <div style={{
                padding: '36px', borderRadius: '20px', marginBottom: '24px',
                background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(99,102,241,0.12)',
              }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#fff', marginBottom: '16px' }}>
                  Overview
                </h2>
                <p style={{ color: '#94a3b8', lineHeight: 1.85, fontSize: '1rem', marginBottom: '28px' }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a href="tel:+918377072990" className="btn-primary">
                    <Phone size={15} /> Call for Quote
                  </a>
                  <Link to="/contact" className="btn-outline">
                    Get Free Consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* What's Included */}
              <div style={{
                padding: '36px', borderRadius: '20px',
                background: `${service.color}06`,
                border: `1px solid ${service.color}20`,
              }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#fff', marginBottom: '24px' }}>
                  What's Included
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {service.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '12px 14px', borderRadius: '10px',
                        background: `${service.color}0c`,
                        border: `1px solid ${service.color}18`,
                      }}
                    >
                      <CheckCircle size={14} style={{ color: service.color, flexShrink: 0 }} />
                      <span style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500 }}>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{
        padding: '64px 0', textAlign: 'center',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        background: `${service.color}06`,
      }}>
        <div className="container-main">
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff', marginBottom: '10px' }}>
            Interested in {service.title}?
          </h2>
          <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '1rem' }}>
            Contact our experts today for a free consultation and customized quote.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a href="tel:+918377072990" className="btn-primary">
              <Phone size={16} /> +91-8377072990
            </a>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Responsive sidebar collapse */}
      <style>{`
        @media (max-width: 768px) {
          .services-layout { grid-template-columns: 1fr !important; }
          aside { position: static !important; top: auto !important; }
        }
      `}</style>
    </main>
  )
}
