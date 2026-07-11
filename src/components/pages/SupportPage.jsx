import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { BtnPrimary, Tag } from '../ui'
import { firebaseReady } from '../../lib/firebase'
import { createTicket } from '../../lib/tickets'

const CATEGORIES = ['Hardware', 'Software', 'Network & Connectivity', 'Account & Access', 'Email & Communication', 'Other']
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent']

const EMPTY_FORM = { name: '', email: '', company: '', category: '', priority: 'Medium', subject: '', description: '' }

export default function SupportPage() {
  const { showToast } = useApp()
  const [form, setForm] = useState(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [ticket, setTicket] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!firebaseReady) {
      setError('Support tickets aren\'t connected yet — this app needs a Firebase project configured (see .env.example).')
      return
    }
    setSending(true); setError('')
    try {
      const result = await createTicket({
        subject: form.subject,
        description: form.description,
        category: form.category || 'Other',
        priority: form.priority,
        requesterName: form.name,
        requesterEmail: form.email,
        requesterCompany: form.company,
      })
      setTicket(result)
      setForm(EMPTY_FORM)
      showToast(`✅ Ticket #${result.ticketNumber} submitted — we'll be in touch shortly.`)
    } catch (err) {
      setError('Something went wrong submitting your ticket. Please try again or call us directly.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 15px',
    border: '1.5px solid var(--input-border)',
    borderRadius: 'var(--r-md)',
    fontSize: 14, fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    background: 'var(--input-bg)',
    outline: 'none',
    transition: 'border-color var(--dur-fast) var(--ease)',
  }
  const labelStyle = {
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--text-muted)', marginBottom: 7, display: 'block',
  }
  const focusHandlers = {
    onFocus: e => e.target.style.borderColor = 'var(--green)',
    onBlur: e => e.target.style.borderColor = 'var(--input-border)',
  }

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ background: 'var(--green-deep)', padding: '72px 5% 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(35,139,69,0.2) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Tag light>IT Help Desk</Tag>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,56px)', color: '#fff', lineHeight: 1.1, marginTop: 18, marginBottom: 14 }}>
            Submit a support ticket.
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.8 }}>
            Tell us what's going on and our help desk team will pick it up — you'll get a ticket number to track it.
          </p>
        </div>
      </div>

      {/* Body */}
      <section style={{ padding: '72px 5%', background: 'var(--bg-page)' }}>
        <div className="contact-grid" style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>

          {/* Form card */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-xl)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            {ticket ? (
              <div style={{ textAlign: 'center', padding: '32px 12px' }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🎟️</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-primary)', marginBottom: 10 }}>
                  Ticket #{ticket.ticketNumber} submitted
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 24px' }}>
                  We've logged your request. Our team will reach out at the email you provided — please keep your ticket number handy for reference.
                </p>
                <BtnPrimary onClick={() => setTicket(null)}>Submit Another Ticket →</BtnPrimary>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-primary)', marginBottom: 6 }}>Describe your issue</h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>Managed IT clients get priority routing — everyone else hears back within one business day.</p>

                {!firebaseReady && (
                  <div style={{ background: 'var(--green-glass)', border: '1px solid rgba(35,139,69,0.25)', borderRadius: 'var(--r-md)', padding: '12px 16px', marginBottom: 20, fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    ⚠️ This form isn't connected to a backend yet. Set up a Firebase project and add its config to <code>.env.local</code> (see <code>.env.example</code>) to start receiving tickets.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="booking-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" style={inputStyle} {...focusHandlers} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle} {...focusHandlers} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Company Name</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp Ltd" style={inputStyle} {...focusHandlers} />
                  </div>

                  <div className="booking-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option value="">— Select a category —</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Priority</label>
                      <select name="priority" value={form.priority} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Subject *</label>
                    <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Brief summary of the issue" style={inputStyle} {...focusHandlers} />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Description *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
                      placeholder="What's happening? Include any error messages, when it started, and what you've already tried."
                      style={{ ...inputStyle, resize: 'vertical' }} {...focusHandlers} />
                  </div>

                  {error && (
                    <p style={{ fontSize: 12.5, color: '#c0392b', marginBottom: 14, lineHeight: 1.6 }}>{error}</p>
                  )}

                  <BtnPrimary style={{ width: '100%', justifyContent: 'center', fontSize: 15, opacity: sending ? 0.7 : 1 }}>
                    {sending ? 'Submitting…' : 'Submit Ticket →'}
                  </BtnPrimary>
                  <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 11, textAlign: 'center' }}>
                    🔒 Your data is protected. We never share your information.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 84 }}>
            <div style={{ background: 'var(--green-deep)', borderRadius: 'var(--r-xl)', padding: '28px 24px', color: '#fff' }}>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: 18 }}>What happens next</h3>
              {[
                ['1', 'Your ticket is logged instantly and assigned a tracking number.'],
                ['2', 'A help desk technician triages it based on priority.'],
                ['3', 'We follow up by email — urgent issues get a call.'],
              ].map(([n, text]) => (
                <div key={n} style={{ display: 'flex', gap: 13, marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{n}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-xl)', padding: '20px 22px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>🚨</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 5 }}>Something on fire?</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>For a critical outage, skip the form and call us directly at <strong>+12042021791</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
