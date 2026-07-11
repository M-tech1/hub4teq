import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { BtnPrimary, BtnSecondary, Tag, SectionHeading } from '../ui'
import { SERVICES } from '../../data'

export default function ServicesPage() {
  const { navigate } = useApp()
  const [active, setActive] = useState(SERVICES[0].id)
  const sel = SERVICES.find(s => s.id === active)

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Header */}
      <div style={{ background: 'var(--green-deep)', padding: '72px 5% 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(35,139,69,0.12) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Tag light>What We Do</Tag>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,6vw,64px)', color: '#fff', lineHeight: 1.08, marginTop: 18 }}>Our Services</h1>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.52)', maxWidth: 460, marginTop: 14 }}>End-to-end technology solutions for businesses that refuse to stand still.</p>
        </div>
      </div>

      {/* Explorer */}
      <section style={{ padding: '72px 5%', background: 'var(--bg-page)' }}>
        <div className="services-explorer" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, alignItems: 'start' }}>
          {/* Sidebar */}
          <div className="services-sidebar" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-xl)', padding: 8, border: '1px solid var(--border)', position: 'sticky', top: 84 }}>
            {SERVICES.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 'var(--r-lg)', background: active === s.id ? 'var(--green)' : 'transparent', transition: 'all var(--dur-fast) var(--ease)', textAlign: 'left', marginBottom: 2 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: active === s.id ? '#fff' : 'var(--text-primary)' }}>{s.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 300, color: active === s.id ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)', marginTop: 1 }}>{s.tagline}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div key={active} style={{ animation: 'fadeUp 0.3s var(--ease-out) both' }}>
            <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div style={{ height: 300, position: 'relative', overflow: 'hidden' }}>
                <img src={sel.image} alt={sel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(13,61,29,0.78) 0%,rgba(13,61,29,0.18) 55%,transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 28, left: 32 }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{sel.icon}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,36px)', color: '#fff', lineHeight: 1.15 }}>{sel.title}</h2>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 5 }}>{sel.tagline}</p>
                </div>
              </div>
              <div style={{ padding: '28px 32px 36px' }}>
                <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>{sel.desc}</p>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 14 }}>What's Included</h4>
                <div className="booking-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
                  {sel.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'var(--green-glass)', borderRadius: 'var(--r-md)', border: '1px solid rgba(35,139,69,0.12)' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <BtnPrimary onClick={() => navigate('contact')}>Get a Quote →</BtnPrimary>
                  <BtnSecondary onClick={() => navigate('consulting')}>Book Consultation</BtnSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All services grid */}
      <section style={{ padding: '72px 5%', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading tag="Full Portfolio" title="Everything we offer" center sub="Comprehensive capabilities across technology disciplines." />
          <div className="services-grid-all" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 1, background: 'var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            {SERVICES.map((s, i) => (
              <div key={s.id} onClick={() => { setActive(s.id); window.scrollTo({ top: 280, behavior: 'smooth' }) }}
                style={{ padding: '28px 24px', background: 'var(--bg-surface)', cursor: 'pointer', transition: 'background var(--dur-fast) var(--ease)' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 7 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.desc.slice(0, 95)}…</p>
                <div style={{ marginTop: 12, fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
