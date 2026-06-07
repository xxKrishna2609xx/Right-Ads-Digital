import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Search, 
  Volume2, 
  Palette, 
  CheckCircle, 
  HelpCircle,
  IndianRupee
} from 'lucide-react';

const Instagram = ({ size = 20, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const servicesList = [
  { id: 'seo', title: 'SEO Optimization', icon: Search, desc: 'Rank higher on Google search results.', color: '#6366f1' },
  { id: 'web', title: 'Web Development', icon: Globe, desc: 'Responsive, premium business websites.', color: '#06b6d4' },
  { id: 'smm', title: 'Social Media Marketing', icon: Instagram, desc: 'Growth, strategy, and content campaigns.', color: '#ec4899' },
  { id: 'ppc', title: 'Paid Ads Management', icon: Volume2, desc: 'PPC lead generation campaigns (Google/FB).', color: '#f59e0b' },
  { id: 'design', title: 'Graphic Design', icon: Palette, desc: 'Marketing collaterals and custom creatives.', color: '#10b981' }
];

export default function BudgetCalculator() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  
  // Service configuration parameters
  const [params, setParams] = useState({
    seo: '20 Keywords',
    web: '6-15 Pages (Corporate)',
    smm: '3-4 Platforms',
    ppc: '₹25k - ₹1 Lakh',
    design: '10-20 Designs/mo'
  });

  // Lead details
  const [lead, setLead] = useState({
    name: '',
    email: '',
    phone: '',
    website: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Calculated Budget Output State
  const [estimate, setEstimate] = useState({
    minMonthly: 0,
    maxMonthly: 0,
    minSetup: 0,
    maxSetup: 0,
    breakdown: []
  });

  const handleToggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleParamChange = (service, value) => {
    setParams(prev => ({ ...prev, [service]: value }));
  };

  // Perform core calculation
  const calculateBudget = () => {
    let minM = 0;
    let maxM = 0;
    let minS = 0;
    let maxS = 0;
    const itemsBreakdown = [];

    selectedServices.forEach(srv => {
      if (srv === 'seo') {
        let price = { min: 12000, max: 18000 };
        if (params.seo === '20 Keywords') price = { min: 20000, max: 28000 };
        if (params.seo === '50 Keywords') price = { min: 35000, max: 48000 };
        if (params.seo === '100+ Keywords') price = { min: 60000, max: 80000 };
        minM += price.min;
        maxM += price.max;
        itemsBreakdown.push({ name: 'SEO Optimization', type: 'Monthly', min: price.min, max: price.max, param: params.seo });
      }

      if (srv === 'web') {
        let price = { min: 15000, max: 22000 };
        if (params.web === '6-15 Pages (Corporate)') price = { min: 28000, max: 42000 };
        if (params.web === '15+ Pages (E-commerce)') price = { min: 60000, max: 90000 };
        minS += price.min;
        maxS += price.max;
        itemsBreakdown.push({ name: 'Web Development', type: 'One-time Setup', min: price.min, max: price.max, param: params.web });
      }

      if (srv === 'smm') {
        let price = { min: 15000, max: 20000 };
        if (params.smm === '3-4 Platforms') price = { min: 25000, max: 35000 };
        if (params.smm === '5+ Platforms') price = { min: 45000, max: 60000 };
        minM += price.min;
        maxM += price.max;
        itemsBreakdown.push({ name: 'Social Media Management', type: 'Monthly', min: price.min, max: price.max, param: params.smm });
      }

      if (srv === 'ppc') {
        let price = { min: 6000, max: 9000 };
        if (params.ppc === '₹25k - ₹1 Lakh') price = { min: 12000, max: 18000 };
        if (params.ppc === '₹1 Lakh - ₹5 Lakhs') price = { min: 25000, max: 38000 };
        if (params.ppc === '₹5 Lakhs+') price = { min: 50000, max: 70000 };
        minM += price.min;
        maxM += price.max;
        itemsBreakdown.push({ name: 'Paid Ads Management', type: 'Monthly', min: price.min, max: price.max, param: params.ppc });
      }

      if (srv === 'design') {
        let price = { min: 8000, max: 12000 };
        if (params.design === '10-20 Designs/mo') price = { min: 15000, max: 22000 };
        if (params.design === 'Unlimited/Dedicated Designer') price = { min: 35000, max: 50000 };
        minM += price.min;
        maxM += price.max;
        itemsBreakdown.push({ name: 'Graphic Design', type: 'Monthly', min: price.min, max: price.max, param: params.design });
      }
    });

    setEstimate({
      minMonthly: minM,
      maxMonthly: maxM,
      minSetup: minS,
      maxSetup: maxS,
      breakdown: itemsBreakdown
    });
  };

  const handleNextStep = () => {
    if (step === 1 && selectedServices.length === 0) {
      setError('Please select at least one service.');
      return;
    }
    setError('');
    
    if (step === 2) {
      calculateBudget();
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    if (!lead.name || !lead.email || !lead.phone) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    // Prepare human-readable service detail list
    const detailPayload = {};
    selectedServices.forEach(s => {
      detailPayload[s] = params[s];
    });

    const activeServicesNames = servicesList
      .filter(s => selectedServices.includes(s.id))
      .map(s => s.title);

    try {
      const res = await fetch(`${API_URL}/api/calculator-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          website: lead.website,
          services: activeServicesNames,
          details: detailPayload,
          min_budget: estimate.minMonthly + estimate.minSetup,
          max_budget: estimate.maxMonthly + estimate.maxSetup
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again.');
      }

      setSuccess(true);
      setStep(5); // Go to results view
    } catch (err) {
      setError(err.message || 'Something went wrong. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* ── HERO BANNER ── */}
      <section 
        style={{
          padding: '100px 0 60px',
          position: 'relative', 
          overflow: 'hidden',
          background: 'var(--bg-hero-page)',
        }} 
        className="bg-grid"
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 65%)' }} />
        
        <div className="container-main" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-badge" style={{ margin: '0 auto 16px' }}>
              <Sparkles size={12} style={{ marginRight: '6px' }} /> Marketing Tools
            </div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '16px' }}>
              Dynamic <span className="gradient-text">Budget Calculator</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Estimate your monthly marketing spend and one-time project costs instantly based on your custom service metrics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STEPPER COMPONENT ── */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container-main" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Progress Indicators */}
          {step < 5 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', position: 'relative' }}>
              {/* Progress Line */}
              <div style={{ position: 'absolute', left: '20px', right: '20px', height: '2px', backgroundColor: 'var(--border-subtle)', zIndex: 1 }} />
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '20px', 
                  width: `${(step - 1) * 33.3}%`, 
                  height: '2px', 
                  backgroundColor: '#6366f1', 
                  zIndex: 2,
                  transition: 'width 0.3s ease'
                }} 
              />

              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  style={{ 
                    zIndex: 3, 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: '1.5px solid',
                    backgroundColor: step > s ? '#6366f1' : step === s ? 'var(--bg-body)' : 'var(--bg-surface-solid)',
                    borderColor: step >= s ? '#6366f1' : 'var(--border-primary)',
                    color: step > s ? '#ffffff' : step === s ? '#6366f1' : 'var(--text-muted)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step > s ? <Check size={16} /> : s}
                </div>
              ))}
            </div>
          )}

          {/* Stepper Content */}
          <div className="glass" style={{ borderRadius: '24px', padding: '36px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
            
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Services */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>Select Required Services</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '28px' }}>
                    Choose the channels you want to calculate budget for. You can select multiple.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                    {servicesList.map(srv => {
                      const isSelected = selectedServices.includes(srv.id);
                      return (
                        <div 
                          key={srv.id}
                          onClick={() => handleToggleService(srv.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '18px 24px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            background: isSelected ? 'rgba(99, 102, 241, 0.06)' : 'rgba(0,0,0,0.1)',
                            border: '1px solid',
                            borderColor: isSelected ? '#6366f1' : 'var(--border-primary)',
                            boxShadow: isSelected ? '0 0 16px rgba(99,102,241,0.06)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                          className="card-hover"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ 
                              padding: '10px', 
                              borderRadius: '12px', 
                              backgroundColor: `${srv.color}15`, 
                              color: srv.color,
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              <srv.icon size={20} />
                            </div>
                            <div>
                              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{srv.title}</h3>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{srv.desc}</p>
                            </div>
                          </div>
                          
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: '1.5px solid',
                            borderColor: isSelected ? '#6366f1' : 'var(--border-primary)',
                            backgroundColor: isSelected ? '#6366f1' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff'
                          }}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '16px' }}>{error}</p>}

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleNextStep} className="btn-primary">
                      Next Step <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Configure Parameters */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>Customize Metrics</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '28px' }}>
                    Define the scale/scope for each selected marketing service to calculate pricing accurately.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                    
                    {/* SEO Parameters */}
                    {selectedServices.includes('seo') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          SEO Target Keywords Count:
                        </label>
                        <select 
                          className="input-field" 
                          value={params.seo} 
                          onChange={(e) => handleParamChange('seo', e.target.value)}
                        >
                          <option value="10 Keywords">10 Keywords (Local SEO / Startups)</option>
                          <option value="20 Keywords">20 Keywords (Mid-size target / Regional)</option>
                          <option value="50 Keywords">50 Keywords (Highly competitive market)</option>
                          <option value="100+ Keywords">100+ Keywords (E-commerce / Enterprise)</option>
                        </select>
                      </div>
                    )}

                    {/* Web Parameters */}
                    {selectedServices.includes('web') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Website Size / Page Count:
                        </label>
                        <select 
                          className="input-field" 
                          value={params.web} 
                          onChange={(e) => handleParamChange('web', e.target.value)}
                        >
                          <option value="1-5 Pages (Landing/Basic)">1-5 Pages (Landing Page / Portfolio)</option>
                          <option value="6-15 Pages (Corporate)">6-15 Pages (Corporate Business Site)</option>
                          <option value="15+ Pages (E-commerce)">15+ Pages (E-commerce Store / Custom portal)</option>
                        </select>
                      </div>
                    )}

                    {/* SMM Parameters */}
                    {selectedServices.includes('smm') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Social Media Platforms to Manage:
                        </label>
                        <select 
                          className="input-field" 
                          value={params.smm} 
                          onChange={(e) => handleParamChange('smm', e.target.value)}
                        >
                          <option value="1-2 Platforms">1-2 Platforms (e.g. FB + Instagram)</option>
                          <option value="3-4 Platforms">3-4 Platforms (e.g. FB, Insta, LinkedIn, X)</option>
                          <option value="5+ Platforms">5+ Platforms (All channels + dedicated custom postings)</option>
                        </select>
                      </div>
                    )}

                    {/* PPC Parameters */}
                    {selectedServices.includes('ppc') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Expected Monthly Ad Spend:
                        </label>
                        <select 
                          className="input-field" 
                          value={params.ppc} 
                          onChange={(e) => handleParamChange('ppc', e.target.value)}
                        >
                          <option value="Under ₹25k">Under ₹25,000 / month</option>
                          <option value="₹25k - ₹1 Lakh">₹25,000 - ₹1,00,000 / month</option>
                          <option value="₹1 Lakh - ₹5 Lakhs">₹1,00,000 - ₹5,00,000 / month</option>
                          <option value="₹5 Lakhs+">₹5,00,000+ / month</option>
                        </select>
                      </div>
                    )}

                    {/* Graphic Parameters */}
                    {selectedServices.includes('design') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Monthly Creative Deliverables:
                        </label>
                        <select 
                          className="input-field" 
                          value={params.design} 
                          onChange={(e) => handleParamChange('design', e.target.value)}
                        >
                          <option value="5-10 Designs/mo">5-10 Custom Creatives / month</option>
                          <option value="10-20 Designs/mo">10-20 Custom Creatives / month</option>
                          <option value="Unlimited/Dedicated Designer">Unlimited / Dedicated Graphic Designer</option>
                        </select>
                      </div>
                    )}

                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handlePrevStep} className="btn-outline">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button onClick={handleNextStep} className="btn-primary">
                      Next Step <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Preview Calculations */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>Budget Summary Preview</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '24px' }}>
                    Here is a quick look at your estimates based on your chosen service configurations.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                    
                    {/* Setup / One-time costs */}
                    {estimate.maxSetup > 0 && (
                      <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.04em' }}>One-time Setup Budget</p>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                          <IndianRupee size={16} /> {estimate.minSetup.toLocaleString('en-IN')} – <IndianRupee size={16} /> {estimate.maxSetup.toLocaleString('en-IN')}
                        </h4>
                      </div>
                    )}

                    {/* Monthly Marketing Retainer */}
                    {estimate.maxMonthly > 0 && (
                      <div style={{ padding: '16px 20px', borderRadius: '14px', backgroundColor: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#818cf8', letterSpacing: '0.04em' }}>Estimated Monthly Retainer</p>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                          <IndianRupee size={16} /> {estimate.minMonthly.toLocaleString('en-IN')} – <IndianRupee size={16} /> {estimate.maxMonthly.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', fontWeight: 400, marginLeft: '4px', color: 'var(--text-muted)' }}>/ month</span>
                        </h4>
                      </div>
                    )}

                    {/* Items Breakdown list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Itemized Breakdown:</p>
                      {estimate.breakdown.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', paddingBottom: '10px', borderBottom: '1px dashed var(--border-subtle)' }}>
                          <div>
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>({item.param})</span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            ₹{item.min.toLocaleString('en-IN')} - ₹{item.max.toLocaleString('en-IN')} {item.type === 'Monthly' ? '/mo' : ''}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handlePrevStep} className="btn-outline">
                      <ChevronLeft size={16} /> Back
                    </button>
                    <button onClick={handleNextStep} className="btn-primary">
                      Proceed to Save <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Capture Contact Details */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>Save & Email Estimate</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '28px' }}>
                    Fill in your details to save your breakdown in our portal and receive the full estimate directly via email.
                  </p>

                  <form onSubmit={handleSubmitDetails} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name *</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="input-field"
                          value={lead.name}
                          onChange={(e) => setLead({ ...lead, name: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address *</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className="input-field"
                          value={lead.email}
                          onChange={(e) => setLead({ ...lead, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="input-field"
                          value={lead.phone}
                          onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Company Website (Optional)</label>
                        <input
                          type="url"
                          placeholder="https://yourcompany.com"
                          className="input-field"
                          value={lead.website}
                          onChange={(e) => setLead({ ...lead, website: e.target.value })}
                        />
                      </div>
                    </div>

                    {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '4px' }}>{error}</p>}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                      <button type="button" onClick={handlePrevStep} className="btn-outline">
                        <ChevronLeft size={16} /> Back
                      </button>
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : <><Send size={16} /> Submit & Calculate</>}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 5: Success Results Page */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ textAlign: 'center', py: '20px' }}
                >
                  <CheckCircle size={56} style={{ color: '#22c55e', margin: '0 auto 16px', display: 'block' }} />
                  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.8rem', marginBottom: '10px' }}>Calculation Saved Successfully!</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                    Thank you, {lead.name}. Your marketing budget estimate has been recorded. Our team will review your requirements and reach out to schedule your strategy session.
                  </p>

                  {/* Visual Output Card */}
                  <div className="glass" style={{ maxWidth: '480px', margin: '0 auto 36px', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)', background: 'rgba(99,102,241,0.02)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>Your Estimated Range</p>
                    
                    {estimate.maxSetup > 0 && (
                      <div style={{ margin: '12px 0' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Setup Investment:</span>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IndianRupee size={16} /> {estimate.minSetup.toLocaleString('en-IN')} – <IndianRupee size={16} /> {estimate.maxSetup.toLocaleString('en-IN')}
                        </h4>
                      </div>
                    )}

                    {estimate.maxMonthly > 0 && (
                      <div style={{ margin: '12px 0' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Retainer:</span>
                        <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
                          <IndianRupee size={18} /> {estimate.minMonthly.toLocaleString('en-IN')} – <IndianRupee size={18} /> {estimate.maxMonthly.toLocaleString('en-IN')}
                        </h4>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
                    <button onClick={() => { setStep(1); setSelectedServices([]); setLead({ name: '', email: '', phone: '', website: '' }); }} className="btn-outline">
                      Calculate Again
                    </button>
                    <a href="/contact" className="btn-primary">
                      Book Free consultation
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>
      </section>
    </main>
  );
}
