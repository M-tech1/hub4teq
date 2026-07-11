import React from 'react'

/* ─── Tag / Pill ──────────────────────────── */
/* `light`: always-white text, for fixed-dark (e.g. --green-deep) backgrounds.
   `invert`: for --bg-invert backgrounds, which flip light/dark per theme. */
export function Tag({ children, light, invert }) {
  const rgb = invert ? 'var(--invert-rgb)' : '255,255,255'
  const onDark = light || invert
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      padding: '6px 14px', borderRadius: 'var(--r-full)',
      background: onDark ? `rgba(${rgb},0.12)` : 'var(--green-glass2)',
      color: onDark ? `rgba(${rgb},0.85)` : 'var(--green)',
      border: `1px solid ${onDark ? `rgba(${rgb},0.2)` : 'rgba(35,139,69,0.2)'}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: onDark ? `rgba(${rgb},0.7)` : 'var(--green)', display: 'inline-block' }} />
      {children}
    </span>
  )
}

/* ─── Buttons ─────────────────────────────── */
export function BtnPrimary({ children, onClick, style }) {
  const [hov, setHov] = React.useState(false)
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', padding: '14px 28px', borderRadius: 'var(--r-full)', background: hov ? 'var(--green-dark)' : 'var(--green)', color: '#fff', boxShadow: hov ? 'var(--shadow-green)' : 'none', transform: hov ? 'translateY(-2px)' : 'none', transition: 'all var(--dur-mid) var(--ease)', ...style }}>
      {children}
    </button>
  )
}

export function BtnSecondary({ children, onClick, style, dark }) {
  const [hov, setHov] = React.useState(false)
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', padding: '13px 28px', borderRadius: 'var(--r-full)', background: 'transparent', color: dark ? 'var(--white)' : 'var(--green)', border: `1.5px solid ${dark ? 'rgba(255,255,255,0.3)' : 'var(--green)'}`, transform: hov ? 'translateY(-2px)' : 'none', opacity: hov ? 0.82 : 1, transition: 'all var(--dur-mid) var(--ease)', ...style }}>
      {children}
    </button>
  )
}

/* ─── Section Heading ─────────────────────── */
/* `light`: always-white text, for fixed-dark (e.g. --green-deep) backgrounds.
   `invert`: for --bg-invert backgrounds, which flip light/dark per theme. */
export function SectionHeading({ tag, title, sub, light, invert, center }) {
  const onDark = light || invert
  const rgb = invert ? 'var(--invert-rgb)' : '255,255,255'
  return (
    <div style={{ textAlign: center ? 'center' : undefined, maxWidth: center ? 640 : undefined, margin: center ? '0 auto' : undefined }}>
      {tag && <Tag light={light} invert={invert}>{tag}</Tag>}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, lineHeight: 1.15, color: invert ? 'var(--text-invert)' : light ? '#fff' : 'var(--text-primary)', marginTop: 16, marginBottom: 14 }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: onDark ? `rgba(${rgb},0.58)` : 'var(--text-muted)', maxWidth: 520, margin: center ? '0 auto' : undefined }}>{sub}</p>}
    </div>
  )
}

/* ─── StatCard ────────────────────────────── */
export function StatCard({ value, label, light }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,52px)', color: light ? '#fff' : 'var(--green)', lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: light ? 'rgba(255,255,255,0.52)' : 'var(--text-muted)' }}>{label}</div>
    </div>
  )
}

/* ─── Dark Mode Toggle ────────────────────── */
export function ThemeToggle({ dark, onToggle }) {
  return (
    <label className="theme-toggle" title={dark ? 'Switch to light mode' : 'Switch to dark mode'} style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={dark} onChange={onToggle} />
      <div className="theme-toggle-track" />
      <div className="theme-toggle-thumb">{dark ? '🌙' : '☀️'}</div>
    </label>
  )
}
