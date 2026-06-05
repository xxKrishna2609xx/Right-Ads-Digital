import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const WELCOME_MESSAGE = {
  role: 'model',
  text: "Hi! I'm **Aria**, the Right Ads AI Assistant 👋\n\nI can help you with our digital marketing services, pricing questions, or guide you to the right solution for your business.\n\nWhat can I help you with today?",
}

function parseMarkdown(text) {
  // Bold
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Line breaks
  text = text.replace(/\n/g, '<br/>')
  return text
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const buildHistory = () =>
    messages
      .filter((m) => m.role !== 'error')
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }))

  const sendMessage = async () => {
    const userText = input.trim()
    if (!userText || loading) return

    setInput('')
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: buildHistory() }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.detail || 'Failed to get a response.')
      }

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }])
    } catch (err) {
      setError(err.message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: err.message || 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE])
    setInput('')
    setError(null)
  }

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="floating-btn"
        style={{
          bottom: '154px',
          right: '24px',
          background: open
            ? 'linear-gradient(135deg, #4f46e5, #0ea5e9)'
            : 'linear-gradient(135deg, #6366f1, #06b6d4)',
          boxShadow: open
            ? '0 0 0 4px rgba(99,102,241,0.25), 0 8px 24px rgba(99,102,241,0.4)'
            : '0 8px 24px rgba(99,102,241,0.3)',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        title="Chat with Aria — AI Assistant"
        aria-label="Open AI Chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} color="white" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Sparkles size={22} color="white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: '220px',
              right: '24px',
              width: '360px',
              maxWidth: 'calc(100vw - 32px)',
              height: '520px',
              maxHeight: 'calc(100vh - 240px)',
              borderRadius: '20px',
              background: 'rgba(11,15,25,0.97)',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.12))',
              borderBottom: '1px solid rgba(99,102,241,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={18} color="white" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif' }}>
                  Aria
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ color: '#64748b', fontSize: '0.72rem' }}>Right Ads AI Assistant</span>
                </div>
              </div>
              <button
                onClick={resetChat}
                title="Start new conversation"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(99,102,241,0.2) transparent',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Avatar */}
                  {msg.role !== 'user' && (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      background: msg.role === 'error'
                        ? 'rgba(239,68,68,0.2)'
                        : 'linear-gradient(135deg, #6366f1, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Bot size={14} color={msg.role === 'error' ? '#f87171' : 'white'} />
                    </div>
                  )}

                  {/* Bubble */}
                  <div style={{
                    maxWidth: '78%',
                    padding: '10px 13px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                      : msg.role === 'error'
                        ? 'rgba(239,68,68,0.12)'
                        : 'rgba(30,41,59,0.8)',
                    border: msg.role === 'user'
                      ? 'none'
                      : msg.role === 'error'
                        ? '1px solid rgba(239,68,68,0.25)'
                        : '1px solid rgba(99,102,241,0.12)',
                    color: msg.role === 'user' ? '#fff' : msg.role === 'error' ? '#f87171' : '#cbd5e1',
                    fontSize: '0.84rem',
                    lineHeight: 1.6,
                    wordBreak: 'break-word',
                  }}
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                  />

                  {/* User avatar */}
                  {msg.role === 'user' && (
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <User size={14} color="#818cf8" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bot size={14} color="white" />
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '14px 14px 14px 4px',
                    background: 'rgba(30,41,59,0.8)',
                    border: '1px solid rgba(99,102,241,0.12)',
                    display: 'flex', gap: '4px', alignItems: 'center',
                  }}>
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick prompts (only shown at start) */}
            {messages.length === 1 && (
              <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['What services do you offer?', 'SEO pricing?', 'Book a consultation'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus() }}
                    style={{
                      padding: '5px 10px', borderRadius: '999px', fontSize: '0.72rem',
                      background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                      color: '#818cf8', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#a5b4fc' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.color = '#818cf8' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <div style={{
              padding: '12px',
              borderTop: '1px solid rgba(99,102,241,0.12)',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-end',
              flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                style={{
                  flex: 1,
                  background: 'rgba(30,41,59,0.6)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: '12px',
                  padding: '10px 13px',
                  color: '#f1f5f9',
                  fontSize: '0.85rem',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.5,
                  maxHeight: '100px',
                  overflowY: 'auto',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.2)'}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                style={{
                  width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                  background: loading || !input.trim()
                    ? 'rgba(99,102,241,0.2)'
                    : 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(99,102,241,0.3)',
                }}
              >
                <Send size={16} color={loading || !input.trim() ? '#475569' : 'white'} />
              </button>
            </div>

            {/* Powered by footer */}
            <div style={{ textAlign: 'center', padding: '6px 0 10px', color: '#334155', fontSize: '0.65rem', letterSpacing: '0.03em' }}>
              Powered by Gemini AI · Right Ads Digital
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
