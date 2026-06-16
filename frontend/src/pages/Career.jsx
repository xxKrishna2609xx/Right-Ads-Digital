import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Briefcase, MapPin, Clock, CheckCircle, Upload } from 'lucide-react'

import { API_URL } from '../config/api'

const openings = [
  { title: 'SEO Executive', type: 'Full-time', location: 'Noida', exp: '1-3 years', desc: 'Experience in on-page, off-page SEO, keyword research, and Google Analytics.', color: '#6366f1' },
  { title: 'Web Designer', type: 'Full-time', location: 'Noida', exp: '1-2 years', desc: 'Proficiency in Figma, Adobe XD, HTML/CSS. Portfolio required.', color: '#06b6d4' },
  { title: 'Digital Marketing Executive', type: 'Full-time', location: 'Noida / Remote', exp: 'Fresher – 2 years', desc: 'Knowledge of social media platforms, content creation, and paid campaigns.', color: '#f59e0b' },
  { title: 'Business Development Executive', type: 'Full-time', location: 'Noida', exp: '1-3 years', desc: 'B2B sales experience, lead generation, and client relationship management.', color: '#10b981' },
  { title: 'Graphic Designer', type: 'Full-time', location: 'Noida', exp: '1-2 years', desc: 'Expertise in Adobe Illustrator, Photoshop, Canva. Creative portfolio required.', color: '#ec4899' },
  { title: 'Web Developer Intern', type: 'Internship', location: 'Noida / Remote', exp: 'Fresher', desc: 'Work on Frontend (React) and Backend (FastAPI). Knowledge of HTML/CSS, JS, and Git is preferred.', color: '#6366f1' },
  { title: 'ML Engineer Intern', type: 'Internship', location: 'Noida / Remote', exp: 'Fresher', desc: 'Assist in building and testing machine learning models. Familiarity with Python and ML libraries.', color: '#06b6d4' },
  { title: 'Data Analyst Intern', type: 'Internship', location: 'Noida / Remote', exp: 'Fresher', desc: 'Gather, clean, and visualize marketing data. Basic knowledge of SQL and Python is a plus.', color: '#f59e0b' },
  { title: 'Python Developer Intern', type: 'Internship', location: 'Noida', exp: 'Fresher', desc: 'Develop backend APIs, automation scripts, and database integrations using Python.', color: '#10b981' },
]

export default function Career() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', experience: '', message: '' })
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeName, setResumeName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF resumes are allowed.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5 MB.');
      return;
    }
    
    setResumeFile(file);
    setResumeName(file.name);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.position || !form.experience) {
      setError('Please fill in all required fields.')
      return
    }
    if (!resumeFile) {
      setError('Please upload your resume (PDF).')
      return
    }
    setError(null)
    setLoading(true)
    try {
      // 1. Upload resume PDF first
      const uploadData = new FormData()
      uploadData.append('file', resumeFile)

      const uploadRes = await fetch(`${API_URL}/api/careers/upload-resume?position=${encodeURIComponent(form.position)}`, {
        method: 'POST',
        body: uploadData
      })

      if (!uploadRes.ok) {
        const errData = await uploadRes.json()
        throw new Error(errData?.detail || 'Resume upload failed. Please try again.')
      }

      const { resume_url, resume_analysis } = await uploadRes.json()

      // 2. Submit application details with resume_url and resume_analysis
      const res = await fetch(`${API_URL}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          position: form.position,
          experience: form.experience,
          cover_letter: form.message,
          resume_url: resume_url,
          resume_analysis: resume_analysis
        }),
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
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 65%)' }} />
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>Join the Team</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
              Build Your Career at <span className="gradient-text">Right Ads</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              Join a passionate team of digital innovators, marketers, and creators. We offer growth, learning, and the chance to make a real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OPENINGS ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-main">
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '32px' }}>
            Current Openings
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px', marginBottom: '72px' }}>
            {openings.map((job, i) => (
              <motion.div key={job.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="card-hover"
                style={{ padding: '24px', borderRadius: '18px', background: 'var(--bg-surface)', border: `1px solid ${job.color}20` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyBetween: 'space-between', marginBottom: '12px', justifyContent: 'space-between' }}>
                  <Briefcase size={20} style={{ color: job.color }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: job.color, background: `${job.color}15`, padding: '3px 10px', borderRadius: '999px' }}>{job.type}</span>
                </div>
                <h3 style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: '8px' }}>{job.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>{job.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-faint)', fontSize: '0.78rem' }}>
                    <MapPin size={11} /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-faint)', fontSize: '0.78rem' }}>
                    <Clock size={11} /> {job.exp}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── APPLICATION FORM ── */}
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '28px', textAlign: 'center' }}>
              Apply Now
            </h2>
            <div style={{ padding: '40px', borderRadius: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={52} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Our HR team will contact you within 3 working days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <input id="car-name" className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input id="car-email" className="input-field" placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <input id="car-phone" className="input-field" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  
                  {/* Grid for Position and Experience */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <select id="car-position" className="input-field" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} style={{ cursor: 'pointer' }}>
                      <option value="">Select Position *</option>
                      {openings.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
                    </select>
                    <input 
                      id="car-experience" 
                      className="input-field" 
                      placeholder="Experience (e.g., Fresher, 1 year) *" 
                      value={form.experience} 
                      onChange={e => setForm({ ...form, experience: e.target.value })} 
                    />
                  </div>

                  <textarea id="car-msg" className="input-field" rows={4} placeholder="Tell us about yourself..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'none' }} />
                  
                  {/* Resume PDF Upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                      Upload Resume (PDF format, max 5MB) *
                    </label>
                    <div 
                      onClick={() => document.getElementById('resume-file').click()}
                      style={{ 
                        border: '1.5px dashed var(--border-primary)', 
                        borderRadius: '12px', 
                        padding: '16px', 
                        textAlign: 'center', 
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      className="hover:bg-slate-800/10"
                    >
                      <input 
                        type="file" 
                        id="resume-file" 
                        accept=".pdf" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                      />
                      <Upload size={20} style={{ color: '#6366f1' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {resumeName ? resumeName : 'Choose PDF File or Drag & Drop'}
                      </span>
                      {resumeFile && (
                        <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                        </span>
                      )}
                    </div>
                  </div>

                  {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '4px' }}>{error}</p>}
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }} disabled={loading}>
                    {loading ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
