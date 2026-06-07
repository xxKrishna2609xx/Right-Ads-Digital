import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  Briefcase, 
  LogOut, 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Mail, 
  Phone, 
  FileText, 
  TrendingUp,
  RefreshCw,
  Clock,
  Calculator,
  Sparkles
} from 'lucide-react';
import AdminThemeToggle from '../../components/AdminThemeToggle';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Dashboard() {
  const { logout, getFreshToken } = useAuth();
  
  // Data State
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [calcLeads, setCalcLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  
  // UI State
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'applications' | 'calculator-leads'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedCalcService, setSelectedCalcService] = useState('All');
  const [expandedRows, setExpandedRows] = useState({}); // { id: boolean }

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const idToken = await getFreshToken();
      if (!idToken) {
        throw new Error("Unable to authenticate. Please login again.");
      }

      const headers = {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      };

      const [leadsRes, appsRes, calcRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/leads`, { headers }),
        fetch(`${API_URL}/api/admin/applications`, { headers }),
        fetch(`${API_URL}/api/admin/calculator-leads`, { headers })
      ]);

      if (!leadsRes.ok || !appsRes.ok || !calcRes.ok) {
        if (leadsRes.status === 401 || appsRes.status === 401 || calcRes.status === 401) {
          throw new Error("Session expired or unauthorized. Please re-login.");
        }
        const errorRes = !leadsRes.ok ? leadsRes : (!appsRes.ok ? appsRes : calcRes);
        try {
          const errorData = await errorRes.json();
          throw new Error(errorData.detail || "Failed to load dashboard data.");
        } catch {
          throw new Error("Failed to load dashboard data.");
        }
      }

      const leadsData = await leadsRes.json();
      const appsData = await appsRes.json();
      const calcData = await calcRes.json();

      setLeads(leadsData.leads || []);
      setApplications(appsData.applications || []);
      setCalcLeads(calcData.leads || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch data from backend. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (collection, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${collection === 'leads' ? 'lead' : collection === 'applications' ? 'application' : 'calculator lead'}?`)) {
      return;
    }

    setActionLoading(true);
    try {
      const idToken = await getFreshToken();
      const headers = {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      };

      const res = await fetch(`${API_URL}/api/admin/${collection}/${id}`, {
        method: 'DELETE',
        headers
      });

      if (!res.ok) {
        throw new Error(`Failed to delete item.`);
      }

      if (collection === 'leads') {
        setLeads(leads.filter(item => item.id !== id));
      } else if (collection === 'applications') {
        setApplications(applications.filter(item => item.id !== id));
      } else if (collection === 'calculator-leads') {
        setCalcLeads(calcLeads.filter(item => item.id !== id));
      }
    } catch (err) {
      alert(err.message || "Error deleting item");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const serviceOptions = ['All', ...new Set(leads.map(l => l.service).filter(Boolean))];
  const positionOptions = ['All', ...new Set(applications.map(a => a.position).filter(Boolean))];
  const calcServiceOptions = ['All', ...new Set(calcLeads.flatMap(l => l.services).filter(Boolean))];

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.message && l.message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesService = selectedService === 'All' || l.service === selectedService;
    
    return matchesSearch && matchesService;
  });

  const filteredApplications = applications.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      (a.cover_letter && a.cover_letter.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPosition = selectedPosition === 'All' || a.position === selectedPosition;
    
    return matchesSearch && matchesPosition;
  });

  const filteredCalcLeads = calcLeads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.website && l.website.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.services && l.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesService = selectedCalcService === 'All' || l.services.includes(selectedCalcService);
    
    return matchesSearch && matchesService;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const leadsToday = leads.filter(l => new Date(l.created_at) >= today).length;
  const applicationsThisWeek = applications.filter(a => {
    const appDate = new Date(a.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return appDate >= oneWeekAgo;
  }).length;

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', paddingTop: '110px', paddingBottom: '72px', backgroundColor: 'var(--bg-body)', position: 'relative' }}>
      {/* Floating theme toggle */}
      <AdminThemeToggle />

      <div className="container-main" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* ── HEADER BLOCK ── */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
          <div>
            <div className="section-badge" style={{ marginBottom: '10px' }}>Admin Dashboard</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.5rem', lineHeight: 1.1 }}>
              Agency Management <span className="gradient-text">Console</span>
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Monitor incoming business leads and applicant profiles.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={fetchData}
              className="btn-outline"
              style={{ padding: '10px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', height: '44px' }}
              disabled={loading}
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span style={{ fontSize: '0.85rem' }}>Refresh</span>
            </button>
            <button
              onClick={logout}
              className="btn-outline"
              style={{ 
                padding: '10px 16px', 
                borderRadius: '12px', 
                height: '44px',
                borderColor: 'rgba(239, 68, 68, 0.2)', 
                color: '#ef4444', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '0.85rem'
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* ── ERROR MESSAGE ── */}
        {error && (
          <div 
            style={{ 
              padding: '16px 20px', 
              borderRadius: '16px', 
              marginBottom: '28px', 
              fontSize: '0.875rem', 
              border: '1px solid rgba(239, 68, 68, 0.2)', 
              backgroundColor: 'rgba(239, 68, 68, 0.08)', 
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <span>{error}</span>
            <button onClick={fetchData} style={{ background: 'none', border: 'none', color: '#f87171', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
              Try Again
            </button>
          </div>
        )}

        {/* ── KPI STATS CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          
          {/* Card 1 */}
          <div className="glass card-hover" style={{ borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Total Leads
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', marginTop: '12px', lineHeight: 1 }}>
                  {loading ? '...' : leads.length}
                </h3>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>
                <Users size={24} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>
              <TrendingUp size={14} /> Direct business inquiries
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass card-hover" style={{ borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Leads Today
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', marginTop: '12px', lineHeight: 1 }}>
                  {loading ? '...' : leadsToday}
                </h3>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee' }}>
                <Clock size={24} />
              </div>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Since midnight local time
            </div>
          </div>

          {/* Card 3 - Quote Leads */}
          <div className="glass card-hover" style={{ borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Quote Leads
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', marginTop: '12px', lineHeight: 1 }}>
                  {loading ? '...' : calcLeads.length}
                </h3>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                <Calculator size={24} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>
              <TrendingUp size={14} /> Interactive quote inquiries
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass card-hover" style={{ borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Total Applications
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', marginTop: '12px', lineHeight: 1 }}>
                  {loading ? '...' : applications.length}
                </h3>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                <Briefcase size={24} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
              <TrendingUp size={14} /> Career candidate entries
            </div>
          </div>

          {/* Card 5 */}
          <div className="glass card-hover" style={{ borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Apps This Week
                </p>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2.2rem', marginTop: '12px', lineHeight: 1 }}>
                  {loading ? '...' : applicationsThisWeek}
                </h3>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}>
                <Calendar size={24} />
              </div>
            </div>
            <div style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              In the past 7 days
            </div>
          </div>

        </div>

        {/* ── TABS & FILTER BAR ── */}
        <div className="glass" style={{ borderRadius: '24px', padding: '28px', marginBottom: '36px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            
            {/* Tabs */}
            <div style={{ 
              display: 'flex', 
              padding: '4px', 
              borderRadius: '12px', 
              backgroundColor: 'rgba(0, 0, 0, 0.15)', 
              border: '1px solid var(--border-subtle)' 
            }}>
              <button
                onClick={() => { setActiveTab('leads'); setSearchQuery(''); }}
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: activeTab === 'leads' ? '#6366f1' : 'transparent',
                  color: activeTab === 'leads' ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: activeTab === 'leads' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Users size={16} />
                Leads ({leads.length})
              </button>
              <button
                onClick={() => { setActiveTab('calculator-leads'); setSearchQuery(''); }}
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: activeTab === 'calculator-leads' ? '#6366f1' : 'transparent',
                  color: activeTab === 'calculator-leads' ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: activeTab === 'calculator-leads' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Calculator size={16} />
                Quote Leads ({calcLeads.length})
              </button>
              <button
                onClick={() => { setActiveTab('applications'); setSearchQuery(''); }}
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '8px', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: activeTab === 'applications' ? '#6366f1' : 'transparent',
                  color: activeTab === 'applications' ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: activeTab === 'applications' ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <Briefcase size={16} />
                Applications ({applications.length})
              </button>
            </div>

            {/* Filter controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1 }}>
              
              {/* Search Box */}
              <div style={{ position: 'relative', width: '260px' }}>
                <span style={{ position: 'absolute', top: 0, bottom: 0, left: '14px', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--text-muted)' }}>
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder={`Search by name, email, details...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '40px', paddingRight: '12px', height: '42px', fontSize: '0.85rem' }}
                />
              </div>

              {/* Service Filter dropdown */}
              {activeTab === 'leads' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <Filter size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="input-field"
                    style={{ height: '42px', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {serviceOptions.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              ) : activeTab === 'calculator-leads' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <Filter size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <select
                    value={selectedCalcService}
                    onChange={(e) => setSelectedCalcService(e.target.value)}
                    className="input-field"
                    style={{ height: '42px', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {calcServiceOptions.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              ) : (
                /* Position Filter dropdown */
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <Filter size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="input-field"
                    style={{ height: '42px', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {positionOptions.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                </div>
              )}

            </div>

          </div>

          {/* ── DATA SECTION ── */}
          <div style={{ 
            marginTop: '28px', 
            borderRadius: '16px', 
            border: '1px solid var(--border-primary)', 
            overflow: 'hidden', 
            backgroundColor: 'rgba(0, 0, 0, 0.05)' 
          }}>
            {loading ? (
              <div style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  border: '3px solid rgba(99, 102, 241, 0.1)', 
                  borderTopColor: '#6366f1', 
                  borderRadius: '50%' 
                }} className="animate-spin" />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Retrieving latest records...</p>
              </div>
            ) : activeTab === 'leads' ? (
              
              /* Leads Table View */
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderBottom: '1px solid var(--border-primary)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Date</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Name</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Contact Info</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Requested Service</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Source</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: 'table-row-group' }}>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '36px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          No leads found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const isExpanded = !!expandedRows[lead.id];
                        return (
                          <React.Fragment key={lead.id}>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'transparent' }} className="hover:bg-slate-800/10">
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                {formatDate(lead.created_at)}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 600 }}>{lead.name}</td>
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Mail size={12} style={{ color: 'var(--text-muted)' }} /> {lead.email}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Phone size={12} style={{ color: 'var(--text-muted)' }} /> {lead.phone}
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                <span className="section-badge" style={{ margin: 0, padding: '4px 10px', fontSize: '0.7rem', textTransform: 'none', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                  {lead.service || 'General Enquiry'}
                                </span>
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                                {lead.source || 'website'}
                              </td>
                              <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                  <button
                                    onClick={() => toggleRow(lead.id)}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#818cf8',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(99, 102, 241, 0.05)'
                                    }}
                                    className="hover:bg-slate-700/20"
                                    title="View Message"
                                  >
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </button>
                                  <button
                                    onClick={() => handleDelete('leads', lead.id)}
                                    disabled={actionLoading}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#f87171',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                      opacity: actionLoading ? 0.5 : 1
                                    }}
                                    className="hover:bg-red-500/10"
                                    title="Delete Record"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr style={{ backgroundColor: 'rgba(99, 102, 241, 0.02)' }}>
                                <td colSpan="6" style={{ padding: '24px' }}>
                                  <div style={{ 
                                    borderRadius: '12px', 
                                    border: '1px solid var(--border-subtle)', 
                                    padding: '20px', 
                                    backgroundColor: 'rgba(0,0,0,0.1)' 
                                  }}>
                                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                                      Enquiry Details / Message
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                      {lead.message}
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            ) : activeTab === 'calculator-leads' ? (
              
              /* Calculator Leads Table View */
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderBottom: '1px solid var(--border-primary)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Date</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Name</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Contact Info</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Selected Services</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Budget Estimate</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: 'table-row-group' }}>
                    {filteredCalcLeads.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '36px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          No calculator leads found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredCalcLeads.map((lead) => {
                        const isExpanded = !!expandedRows[lead.id];
                        return (
                          <React.Fragment key={lead.id}>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'transparent' }} className="hover:bg-slate-800/10">
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                {formatDate(lead.created_at)}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 600 }}>{lead.name}</td>
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Mail size={12} style={{ color: 'var(--text-muted)' }} /> {lead.email}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Phone size={12} style={{ color: 'var(--text-muted)' }} /> {lead.phone}
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {lead.services.map((srv, idx) => (
                                    <span key={idx} className="section-badge" style={{ margin: 0, padding: '4px 10px', fontSize: '0.7rem', textTransform: 'none', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                      {srv}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.85rem', fontWeight: 700, color: '#818cf8' }}>
                                ₹{lead.min_budget.toLocaleString('en-IN')} - ₹{lead.max_budget.toLocaleString('en-IN')}
                              </td>
                              <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                  <button
                                    onClick={() => toggleRow(lead.id)}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#818cf8',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(99, 102, 241, 0.05)'
                                    }}
                                    className="hover:bg-slate-700/20"
                                    title="View Details"
                                  >
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </button>
                                  <button
                                    onClick={() => handleDelete('calculator-leads', lead.id)}
                                    disabled={actionLoading}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#f87171',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                      opacity: actionLoading ? 0.5 : 1
                                    }}
                                    className="hover:bg-red-500/10"
                                    title="Delete Record"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr style={{ backgroundColor: 'rgba(99, 102, 241, 0.02)' }}>
                                <td colSpan="6" style={{ padding: '24px' }}>
                                  <div style={{ 
                                    borderRadius: '12px', 
                                    border: '1px solid var(--border-subtle)', 
                                    padding: '20px', 
                                    backgroundColor: 'rgba(0,0,0,0.1)' 
                                  }}>
                                    <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                                      Detailed Service Configuration
                                    </h4>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                                      {Object.entries(lead.details || {}).map(([key, val]) => {
                                        const serviceIdToName = {
                                          seo: 'SEO Optimization',
                                          web: 'Web Development',
                                          smm: 'Social Media Marketing',
                                          ppc: 'Paid Ads Management',
                                          design: 'Graphic Design'
                                        };
                                        return (
                                          <div key={key} style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', fontWeight: 600 }}>
                                              {serviceIdToName[key] || key}
                                            </span>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, marginTop: '4px', display: 'block' }}>
                                              {val}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {lead.website && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Company Website:</span>
                                        <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline' }}>
                                          {lead.website}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            ) : (

              /* Applications Table View */
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderBottom: '1px solid var(--border-primary)' }}>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Date</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Applicant Name</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Contact Info</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Position Applied</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Experience</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Resume</th>
                      <th style={{ padding: '16px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ display: 'table-row-group' }}>
                    {filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ padding: '36px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                          No applications found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => {
                        const isExpanded = !!expandedRows[app.id];
                        return (
                          <React.Fragment key={app.id}>
                            <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'transparent' }} className="hover:bg-slate-800/10">
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                {formatDate(app.created_at)}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.9rem', fontWeight: 600 }}>{app.name}</td>
                              <td style={{ padding: '16px 20px', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Mail size={12} style={{ color: 'var(--text-muted)' }} /> {app.email}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                    <Phone size={12} style={{ color: 'var(--text-muted)' }} /> {app.phone}
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '16px 20px' }}>
                                <span style={{ 
                                  fontSize: '0.75rem', 
                                  fontWeight: 700, 
                                  padding: '4px 10px', 
                                  borderRadius: '20px', 
                                  backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                                  color: '#06b6d4',
                                  border: '1px solid rgba(6, 182, 212, 0.2)' 
                                }}>
                                  {app.position}
                                </span>
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {app.experience || 'Not specified'}
                              </td>
                              <td style={{ padding: '16px 20px', fontSize: '0.85rem' }}>
                                {app.resume_url ? (
                                  <a 
                                    href={app.resume_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                      color: '#6366f1', 
                                      fontWeight: 600, 
                                      textDecoration: 'underline',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                  >
                                    <FileText size={14} /> View PDF
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>No Resume</span>
                                )}
                              </td>
                              <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                  <button
                                    onClick={() => toggleRow(app.id)}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#06b6d4',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(6, 182, 212, 0.05)'
                                    }}
                                    className="hover:bg-slate-700/20"
                                    title="View Cover Letter"
                                  >
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </button>
                                  <button
                                    onClick={() => handleDelete('applications', app.id)}
                                    disabled={actionLoading}
                                    style={{ 
                                      background: 'none', 
                                      border: 'none', 
                                      cursor: 'pointer', 
                                      padding: '8px', 
                                      borderRadius: '8px',
                                      color: '#f87171',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                      opacity: actionLoading ? 0.5 : 1
                                    }}
                                    className="hover:bg-red-500/10"
                                    title="Delete Record"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr style={{ backgroundColor: 'rgba(6, 182, 212, 0.02)' }}>
                                <td colSpan="7" style={{ padding: '24px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {/* Cover Letter */}
                                    <div style={{ 
                                      borderRadius: '12px', 
                                      border: '1px solid var(--border-subtle)', 
                                      padding: '20px', 
                                      backgroundColor: 'rgba(0,0,0,0.1)' 
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                                        <FileText size={16} />
                                        <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                          Cover Letter / Applicant Note
                                        </h4>
                                      </div>
                                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                        {app.cover_letter || 'No cover letter was attached.'}
                                      </p>
                                    </div>

                                    {/* Gemini Resume Analysis */}
                                    {app.resume_analysis && (
                                      <div style={{ 
                                        borderRadius: '12px', 
                                        border: '1px solid rgba(99, 102, 241, 0.2)', 
                                        padding: '20px', 
                                        backgroundColor: 'rgba(99, 102, 241, 0.04)',
                                        boxShadow: 'inset 0 0 12px rgba(99, 102, 241, 0.05)'
                                      }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', marginBottom: '10px' }}>
                                          <Sparkles size={16} />
                                          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Resume Suitability Analysis (Powered by Gemini)
                                          </h4>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                          {app.resume_analysis}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
