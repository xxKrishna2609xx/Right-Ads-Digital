import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Happy Clients', color: '#6366f1' },
  { value: 11, suffix: '+', label: 'Years Experience', color: '#06b6d4' },
  { value: 300, suffix: '+', label: 'Websites Built', color: '#f59e0b' },
  { value: 108, suffix: '+', label: 'Google Reviews', color: '#10b981' },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({ value, suffix, label, color, delay }) {
  const [inView, setInView] = useState(false)
  const ref = useRef()
  const count = useCountUp(value, 2000, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="card-hover"
      style={{
        textAlign: 'center',
        padding: '28px 20px',
        borderRadius: '16px',
        background: `${color}08`,
        border: `1px solid ${color}20`,
      }}
    >
      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.8rem', color, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px', fontWeight: 500 }}>{label}</div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="section-sm" style={{ background: 'transparent' }}>
      <div className="divider" />
      <div className="container-main" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
        </div>
      </div>
      <div className="divider" />
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
