import React from 'react'
import { useApp } from '../../context/AppContext'
import { BtnPrimary } from '../ui'

export default function Footer() {
  const { navigate } = useApp()
  return (
    <footer style={{ background: 'var(--bg-invert)', color: 'var(--text-invert)', padding: '72px 5% 36px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* CTA strip */}
        <div className="footer-cta" style={{ background: 'linear-gradient(135deg,var(--green-deep) 0%,var(--green-dark) 100%)', borderRadius: 'var(--r-xl)', padding: '44px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 64, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(35,139,69,0.15)' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-light)', marginBottom: 8 }}>Ready to Transform?</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,32px)', color: '#fff', lineHeight: 1.2, maxWidth: 380 }}>Let's build something remarkable together.</h3>
          </div>
          <BtnPrimary className="footer-cta-btn" onClick={() => navigate('contact')} style={{ background: '#fff', color: 'var(--green-dark)', flexShrink: 0 }}>Start a Conversation →</BtnPrimary>
        </div>

        {/* Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 48 }}>
          <div className="footer-col footer-brand">
            <div className="footer-brand-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, cursor: 'pointer' }} onClick={() => navigate('home')}>
              <img src="/hu4tec-logo.png" alt="hub4teq logo" width={38} height={38} style={{ width: 38, height: 38, objectFit: 'contain', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 16, color: 'var(--text-invert)' }}>hub<span style={{ color: 'var(--green-light)' }}>4</span>teq</span>
            </div>
            <p className="footer-brand-desc" style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: 'rgba(var(--invert-rgb),0.4)', maxWidth: 240 }}>Your trusted technology partner — delivering intelligent solutions for businesses that want to lead.</p>
            <div className="footer-social" style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {['𝕏','in','f','▶'].map((s,i)=><div key={i} style={{ width:32,height:32,borderRadius:7,background:'rgba(var(--invert-rgb),0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'rgba(var(--invert-rgb),0.42)',cursor:'pointer' }}>{s}</div>)}
            </div>
          </div>
          <div className="footer-col">
            <h4 style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--green-light)',marginBottom:18 }}>Services</h4>
            <ul style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {['Managed IT','Cloud Solutions','Cybersecurity','Connectivity','IT Consulting','IT Help Desk'].map(s=><li key={s}><a onClick={()=>navigate('services')} style={{ fontSize:13,color:'rgba(var(--invert-rgb),0.4)',cursor:'pointer' }}>{s}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4 style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--green-light)',marginBottom:18 }}>Company</h4>
            <ul style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {[['About Us','about'],['Consulting','consulting'],['Contact','contact']].map(([l,p])=><li key={l}><a onClick={()=>navigate(p)} style={{ fontSize:13,color:'rgba(var(--invert-rgb),0.4)',cursor:'pointer' }}>{l}</a></li>)}
              {['Careers','Blog'].map(s=><li key={s}><a style={{ fontSize:13,color:'rgba(var(--invert-rgb),0.4)',cursor:'pointer' }}>{s}</a></li>)}
            </ul>
          </div>
          <div className="footer-col footer-contact-col">
            <h4 style={{ fontFamily:'var(--font-ui)',fontSize:10,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--green-light)',marginBottom:18 }}>Contact</h4>
            <ul style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {[
                {icon:'📍',val:'330 St. Mary Avenue\nSuite 300, Winnipeg\nMB R3C 3Z5'},
                {icon:'📞',val:'+12042021791'},
                {icon:'✉️',val:'info@hub4teq.com'},
                {icon:'🕒',val:'Mon–Fri: 8am – 6pm WAT\n24/7 Support for managed clients'},
              ].map((c,i)=><li key={i} className="footer-contact-item" style={{ display:'flex',gap:9,fontSize:12,color:'rgba(var(--invert-rgb),0.4)',lineHeight:1.55,whiteSpace:'pre-line' }}><span style={{ flexShrink:0 }}>{c.icon}</span>{c.val}</li>)}
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop:'1px solid rgba(var(--invert-rgb),0.07)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:10 }}>
          <p style={{ fontSize:12,color:'rgba(var(--invert-rgb),0.22)' }}>© 2026 Hub4Teq Inc. All rights reserved.</p>
          <div className="footer-bottom-links" style={{ display:'flex',gap:20,flexWrap:'wrap' }}>
            {['Privacy Policy','Terms of Use','Cookie Policy'].map(l=><a key={l} style={{ fontSize:11,color:'rgba(var(--invert-rgb),0.22)',cursor:'pointer' }}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
