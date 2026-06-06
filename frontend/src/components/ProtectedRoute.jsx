import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
        <div className="flex flex-col items-center gap-4">
          {/* Glassmorphic spinner */}
          <div className="w-12 h-12 rounded-full border-4 border-t-accent animate-spin" 
               style={{ borderColor: 'rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--accent-primary)' }}>
          </div>
          <p className="text-sm tracking-wider uppercase opacity-75" style={{ color: 'var(--text-main)' }}>
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
