import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import AdminThemeToggle from '../../components/AdminThemeToggle';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error("Login failed:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to login. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="bg-grid"
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        px: '16px', 
        py: '64px',
        backgroundColor: 'var(--bg-body)',
        overflow: 'hidden'
      }}
    >
      {/* Floating Theme Toggle Switch */}
      <AdminThemeToggle />

      {/* Decorative gradient glowing spots in background */}
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          opacity: 0.15,
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          opacity: 0.15,
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
        }}
      />

      <div style={{ width: '100%', maxWidth: '420px', zIndex: 10, padding: '0 16px' }}>
        {/* Logo or Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', borderRadius: '16px', marginBottom: '16px' }}>
            <img 
              src="/logo.png" 
              alt="Right Ads Digital" 
              style={{ height: '36px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }} 
            />
            <span className="gradient-text" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', tracking: '0.05em', marginLeft: '10px' }}>
              RIGHT ADS
            </span>
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', lineHeight: 1.2 }}>Admin Portal</h1>
          <p style={{ marginTop: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Sign in to manage leads and applications
          </p>
        </div>

        {/* Login Card */}
        <div className="glass shadow-2xl" style={{ borderRadius: '24px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
          {/* Card Border glow */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444' 
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="admin@rightads.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '48px', height: '48px' }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '48px', paddingRight: '48px', height: '48px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'var(--text-muted)',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ justifyContent: 'center', width: '100%', height: '48px', marginTop: '8px' }}
            >
              {submitting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid rgba(255,255,255,0.2)', 
                    borderTopColor: '#ffffff', 
                    borderRadius: '50%' 
                  }} className="animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Sign In <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a 
            href="/" 
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              color: 'var(--text-secondary)',
              textDecoration: 'none'
            }}
            className="hover:underline"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
