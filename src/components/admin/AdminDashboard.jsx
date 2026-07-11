import React, { useEffect, useMemo, useState } from 'react'
import { signOutAgent } from '../../lib/auth'
import { STATUSES, subscribeTickets, subscribeComments, updateTicketStatus, addComment } from '../../lib/adminTickets'
import { BtnPrimary } from '../ui'

const PRIORITY_COLOR = { Low: 'var(--text-muted)', Medium: 'var(--green)', High: '#c8862b', Urgent: '#c0392b' }
const STATUS_LABEL = Object.fromEntries(STATUSES.map(s => [s.id, s.label]))

function timeAgo(ts) {
  if (!ts?.toDate) return ''
  const diff = Date.now() - ts.toDate().getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

function StatusBadge({ status }) {
  const colors = {
    new: { bg: 'var(--green-glass2)', fg: 'var(--green)' },
    'in-progress': { bg: 'rgba(200,168,75,0.15)', fg: 'var(--gold)' },
    resolved: { bg: 'rgba(35,139,69,0.15)', fg: 'var(--green-dark)' },
    closed: { bg: 'var(--bg-surface3)', fg: 'var(--text-muted)' },
  }
  const c = colors[status] || colors.new
  return (
    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 'var(--r-full)', background: c.bg, color: c.fg, whiteSpace: 'nowrap' }}>
      {STATUS_LABEL[status] || status}
    </span>
  )
}

function TicketRow({ ticket, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6,
      padding: '14px 16px', borderRadius: 'var(--r-lg)',
      background: active ? 'var(--green-glass2)' : 'transparent',
      border: `1px solid ${active ? 'rgba(35,139,69,0.25)' : 'transparent'}`,
      marginBottom: 4,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>#{ticket.ticketNumber}</span>
        <StatusBadge status={ticket.status} />
      </div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.subject}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.requesterName}</span>
        <span style={{ fontSize: 11, color: 'var(--text-faint)', flexShrink: 0 }}>{timeAgo(ticket.createdAt)}</span>
      </div>
    </button>
  )
}

function TicketDetail({ ticket, onClose, agentEmail }) {
  const [comments, setComments] = useState([])
  const [reply, setReply] = useState('')
  const [internal, setInternal] = useState(false)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    if (!ticket) return
    return subscribeComments(ticket.id, setComments)
  }, [ticket?.id])

  const handleStatusChange = (e) => updateTicketStatus(ticket.id, e.target.value)

  const handleReply = async (e) => {
    e.preventDefault()
    if (!reply.trim()) return
    setPosting(true)
    try {
      await addComment(ticket.id, { authorName: agentEmail, body: reply.trim(), internal })
      setReply(''); setInternal(false)
    } finally {
      setPosting(false)
    }
  }

  const fieldStyle = { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }
  const labelStyle = { fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 3, display: 'block' }

  return (
    <div className="admin-detail-panel" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 12, justifyContent: 'space-between' }}>
        <button className="admin-back-btn" onClick={onClose} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'var(--green)', flexShrink: 0 }}>← Back</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Ticket #{ticket.ticketNumber}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text-primary)', lineHeight: 1.25 }}>{ticket.subject}</h2>
        </div>
        <select value={ticket.status} onChange={handleStatusChange} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', cursor: 'pointer', flexShrink: 0 }}>
          {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14 }}>
        <div><span style={labelStyle}>Requester</span><span style={fieldStyle}>{ticket.requesterName}</span></div>
        <div><span style={labelStyle}>Email</span><span style={fieldStyle}>{ticket.requesterEmail}</span></div>
        <div><span style={labelStyle}>Company</span><span style={fieldStyle}>{ticket.requesterCompany || '—'}</span></div>
        <div><span style={labelStyle}>Category</span><span style={fieldStyle}>{ticket.category}</span></div>
        <div><span style={labelStyle}>Priority</span><span style={{ ...fieldStyle, color: PRIORITY_COLOR[ticket.priority] || fieldStyle.color, fontWeight: 700 }}>{ticket.priority}</span></div>
        <div><span style={labelStyle}>Opened</span><span style={fieldStyle}>{timeAgo(ticket.createdAt)}</span></div>
      </div>

      <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)' }}>
        <span style={labelStyle}>Description</span>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{ticket.description}</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {comments.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>No replies yet.</p>}
        {comments.map(c => (
          <div key={c.id} style={{ background: c.internal ? 'rgba(200,168,75,0.1)' : 'var(--bg-page)', border: `1px solid ${c.internal ? 'rgba(200,168,75,0.25)' : 'var(--border)'}`, borderRadius: 'var(--r-md)', padding: '10px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{c.authorName}{c.internal ? ' · internal note' : ''}</span>
              <span style={{ fontSize: 10, color: 'var(--text-faint)', flexShrink: 0 }}>{timeAgo(c.createdAt)}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{c.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReply} style={{ padding: '14px 22px', borderTop: '1px solid var(--border)' }}>
        <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} placeholder="Write a reply…"
          style={{ width: '100%', padding: '10px 13px', border: '1.5px solid var(--input-border)', borderRadius: 'var(--r-md)', fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text-primary)', background: 'var(--input-bg)', outline: 'none', resize: 'vertical', marginBottom: 10 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={internal} onChange={e => setInternal(e.target.checked)} />
            Internal note (not sent to customer)
          </label>
          <BtnPrimary style={{ padding: '9px 18px', fontSize: 13, opacity: posting ? 0.7 : 1 }}>{posting ? 'Posting…' : 'Post Reply →'}</BtnPrimary>
        </div>
      </form>
    </div>
  )
}

export default function AdminDashboard({ agentEmail }) {
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => subscribeTickets(setTickets), [])

  const filtered = useMemo(() => (
    filter === 'all' ? tickets : tickets.filter(t => t.status === filter)
  ), [tickets, filter])

  const selected = tickets.find(t => t.id === selectedId) || null

  const counts = useMemo(() => {
    const c = { all: tickets.length }
    STATUSES.forEach(s => { c[s.id] = tickets.filter(t => t.status === s.id).length })
    return c
  }, [tickets])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/hu4tec-logo.png" alt="hub4teq logo" width={34} height={34} style={{ width: 34, height: 34, objectFit: 'contain', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>Help Desk</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="admin-agent-email" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{agentEmail}</span>
          <button onClick={signOutAgent} style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'var(--green)', padding: '7px 14px', borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)' }}>Sign Out</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 5%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {[{ id: 'all', label: 'All' }, ...STATUSES].map(s => (
            <button key={s.id} onClick={() => setFilter(s.id)} style={{
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700,
              padding: '8px 14px', borderRadius: 'var(--r-full)',
              background: filter === s.id ? 'var(--green)' : 'var(--bg-surface)',
              color: filter === s.id ? '#fff' : 'var(--text-secondary)',
              border: `1px solid ${filter === s.id ? 'var(--green)' : 'var(--border)'}`,
            }}>{s.label} ({counts[s.id] || 0})</button>
          ))}
        </div>

        <div className="admin-grid" style={{ flex: 1, minHeight: 0 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 10, overflowY: 'auto' }}>
            {filtered.length === 0 && <p style={{ fontSize: 13, color: 'var(--text-faint)', padding: '16px 10px' }}>No tickets here.</p>}
            {filtered.map(t => (
              <TicketRow key={t.id} ticket={t} active={t.id === selectedId} onClick={() => setSelectedId(t.id)} />
            ))}
          </div>

          {selected ? (
            <TicketDetail ticket={selected} onClose={() => setSelectedId(null)} agentEmail={agentEmail} />
          ) : (
            <div className="admin-empty-state" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-xl)', color: 'var(--text-faint)', fontSize: 13 }}>
              Select a ticket to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
