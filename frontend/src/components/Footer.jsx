import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

const branches = [
  { city: 'Noida (HQ)', address: 'A-71, 3rd Floor, Sector 15, Noida, UP 201301' },
  { city: 'Noida Branch', address: 'B-135, 4th Floor, Sector 2, Noida, UP 201301' },
  { city: 'Faridabad (Regd.)', address: '1718, N.E Part-2, Faridabad 121005' },
  { city: 'Mathura Branch', address: '6/3A, Krishna Nagar, Mathura 281001' },
  { city: 'Kota Branch', address: '80 Feet Link Road, Kota, Rajasthan 324001' },
  { city: 'Dehradun Branch', address: 'Subhash Nagar, Dehradun' },
]

const services = [
  { label: 'Web Design Services', href: '/services/web-design' },
  { label: 'SEO', href: '/services/seo' },
  { label: 'Google AdWords', href: '/services/google-adwords' },
  { label: 'Social Media Optimization', href: '/services/social-media' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'Email Marketing', href: '/services/email-marketing' },
  { label: 'SMS Marketing', href: '/services/sms-marketing' },
  { label: 'Toll Free Service', href: '/services/toll-free' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Event Gallery', href: '/gallery' },
  { label: 'Career', href: '/career' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'NSIC Registration', href: '/services/nsic' },
  { label: 'ISO Certification', href: '/services/iso' },
  { label: 'MSME / Udyam', href: '/services/msme' },
]

// Footer stays dark in both themes — brand consistency
const footerLinkStyle = {
  display: 'flex', alignItems: 'center', gap: '6px',
  color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none',
  transition: 'color 0.2s ease', marginBottom: '8px',
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-footer)', borderTop: '1px solid rgba(99,102,241,0.15)' }}>
      <div className="container-main" style={{ paddingTop: '64px', paddingBottom: '48px' }}>

        {/* 4-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
              <img
                src="/logo.png"
                alt="Right Ads Logo"
                style={{ height: '40px', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.75, marginBottom: '16px' }}>
              Leading Digital Marketing Agency in Noida with 11+ years of experience. Official Google Partner & Bing Accredited Professional.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <a href="tel:+918377072990" style={footerLinkStyle} onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                <Phone size={13} /> +91-8377072990
              </a>
              <a href="mailto:info@rightads.in" style={footerLinkStyle} onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                <Mail size={13} /> info@rightads.in
              </a>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: FacebookIcon, href: 'https://www.facebook.com/rightads', label: 'Facebook' },
                { icon: InstagramIcon, href: 'https://www.instagram.com/rightadsdigital', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                    background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(99,102,241,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#6b7280', textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Our Services</h4>
            {services.map(s => (
              <Link key={s.href} to={s.href} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                <span style={{ color: '#6366f1', fontSize: '0.9rem' }}>›</span> {s.label}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Quick Links</h4>
            {quickLinks.map(l => (
              <Link key={l.href} to={l.href} style={footerLinkStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#818cf8'} onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                <span style={{ color: '#6366f1', fontSize: '0.9rem' }}>›</span> {l.label}
              </Link>
            ))}
          </div>

          {/* Offices */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Our Offices</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {branches.map(b => (
                <div key={b.city} style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={12} style={{ color: '#6366f1', marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600, marginBottom: '2px' }}>{b.city}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.72rem', lineHeight: 1.5 }}>{b.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom bar */}
        <div style={{
          marginTop: '24px', display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '12px',
        }}>
          <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>
            © 2024 Right Ads Digital. All rights reserved. Designed & Developed by{' '}
            <span style={{ color: '#818cf8', fontWeight: 500 }}>Right Ads</span>.
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4892942431206!2d77.30940131455851!3d28.585094692978355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f97fb7b77%3A0x57e50ec90fd80e55!2sNoida%20Sector-%2015!5e0!3m2!1sen!2sin!4v1629899609046!5m2!1sen!2sin"
            width="200" height="80" style={{ border: '0', borderRadius: '8px', opacity: 0.65 }}
            allowFullScreen="" loading="lazy" title="Right Ads Location"
          />
        </div>
      </div>
    </footer>
  )
}
