import React from 'react'
import { useApp } from '../../context/AppContext'
import { BtnPrimary, BtnSecondary, Tag, SectionHeading, StatCard } from '../ui'
import { GREEN_SERVICES } from '../../data'

const GREEN_STATS = [
  { value: '2GW+', label: 'Clean Energy Deployed' },
  { value: '60%', label: 'Avg. Cost Reduction' },
  { value: '120+', label: 'Green Projects' },
  { value: '0', label: 'Carbon Compromise' },
]

export default function GreenEnergyPage() {
  const { navigate } = useApp()

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div style={{ background: 'var(--green-deep)', minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '80px 5%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80" alt="Renewable energy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--green-deep) 40%, rgba(13,61,29,0.6) 100%)' }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ animation: 'fadeUp 0.6s var(--ease-out) both' }}>
            <Tag light>Sustainability & Renewables</Tag>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,68px)', color: 'var(--white)', lineHeight: 1.08, marginTop: 22, marginBottom: 20 }}>
              Power the Future<br />
              <em style={{ color: 'var(--green-light)', fontStyle: 'italic' }}>Sustainably.</em>
            </h1>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
              Renewable energy design and deployment — solar, wind, hydro, and biomass systems for commercial and industrial clients targeting carbon neutrality.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <BtnPrimary onClick={() => navigate('contact')}>Request Energy Audit →</BtnPrimary>
              <BtnSecondary dark onClick={() => navigate('consulting')}>Speak to an Expert</BtnSecondary>
            </div>
          </div>
          {/* Right: animated SVG illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'float 5s ease-in-out infinite' }}>
            <div style={{ width: 320, height: 320, borderRadius: '50%', background: 'rgba(35,139,69,0.12)', border: '1px solid rgba(35,139,69,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 140 }}>
              🌿
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: 'var(--green)', padding: '40px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {GREEN_STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none', padding: '0 32px', textAlign: 'center' }}>
              <StatCard value={s.value} label={s.label} light />
            </div>
          ))}
        </div>
      </div>

      {/* Services cards */}
      <section style={{ padding: '96px 5%', background: 'var(--bg-page)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading tag="Our Green Portfolio" title="Clean Energy Solutions" center
            sub="Harnessing nature's most powerful forces to deliver sustainable, cost-effective energy for your business." />
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 24 }}>
            {GREEN_SERVICES.map((g, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', transition: 'transform var(--dur-mid) var(--ease), box-shadow var(--dur-mid) var(--ease)' }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,61,29,0.65) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 28 }}>{g.icon}</div>
                </div>
                <div style={{ padding: '22px 22px 26px' }}>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{g.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.7 }}>{g.desc}</p>
                  <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Learn More →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section style={{ padding: '96px 5%', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading tag="How It Works" title="Our Green Energy Process" center
            sub="From first contact to full commissioning — a proven, transparent pathway." />
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {[
              { step: '01', icon: '🔍', title: 'Energy Audit', desc: 'We assess your current consumption patterns, site conditions, and sustainability goals.' },
              { step: '02', icon: '📐', title: 'System Design', desc: 'Our engineers design a custom renewable solution sized exactly to your needs.' },
              { step: '03', icon: '🏗️', title: 'Installation', desc: 'Certified contractors deploy and commission your system safely and on schedule.' },
              { step: '04', icon: '📊', title: 'Monitor & Optimise', desc: 'Ongoing performance monitoring and annual optimisation to maximise your ROI.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '0 28px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-glass2)', border: '2px solid var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--green)', textTransform: 'uppercase', marginBottom: 8 }}>Step {s.step}</div>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{s.title}</h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green-deep)', padding: '80px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(35,139,69,0.2) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Tag light>Get Started</Tag>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,4vw,52px)', color: 'var(--white)', margin: '20px auto 16px', maxWidth: 580, lineHeight: 1.15 }}>
            Ready to go green?
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: 420, margin: '0 auto 36px' }}>
            Book a free energy audit and discover how much your business can save — and reduce its footprint.
          </p>
          <BtnPrimary onClick={() => navigate('contact')} style={{ background: 'var(--white)', color: 'var(--green-dark)', margin: '0 auto' }}>
            Book Free Energy Audit →
          </BtnPrimary>
        </div>
      </section>
    </div>
  )
}
