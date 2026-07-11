import React, { useState } from 'react'
import { signInAgent } from '../../lib/auth'
import { BtnPrimary } from '../ui'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const inputStyle = {
    width: '100%', padding: '12px 15px',
    border: '1.5px solid var(--input-border)',
    borderRadius: 'var(--r-md)',
    fontSize: 14, fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    background: 'var(--input-bg)',
    outline: 'none',
  }
  const labelStyle = {
    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--text-muted)', marginBottom: 7, display: 'block',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await signInAgent(email, password)
    } catch (err) {
      setError('Incorrect email or password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)', padding: '24px 5%' }}>
      <div style={{ width: '100%', maxWidth: 380, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '36px 32px', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <img src="/hu4tec-logo.png" alt="hub4teq logo" width={38} height={38} style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1 }}>hub<span style={{ color: 'var(--green-light)' }}>4</span>teq</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Help Desk Staff</div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 6 }}>Agent Sign In</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Staff access only. Accounts are provisioned in the Firebase Console.</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="agent@hub4teq.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
          </div>
          {error && <p style={{ fontSize: 12.5, color: '#c0392b', marginBottom: 14 }}>{error}</p>}
          <BtnPrimary style={{ width: '100%', justifyContent: 'center', opacity: busy ? 0.7 : 1 }}>
            {busy ? 'Signing in…' : 'Sign In →'}
          </BtnPrimary>
        </form>
      </div>
    </div>
  )
}
