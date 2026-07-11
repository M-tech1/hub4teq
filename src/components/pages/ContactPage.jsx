import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { BtnPrimary, Tag } from '../ui'

export default function ContactPage() {
  const { showToast } = useApp()
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', service:'', message:'' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault(); setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm({ name:'', email:'', phone:'', company:'', service:'', message:'' })
      showToast("✅ Message sent! We'll be in touch within 24 hours.")
    }, 1400)
  }

  const inputStyle = {
    width:'100%', padding:'12px 15px',
    border:'1.5px solid var(--input-border)',
    borderRadius:'var(--r-md)',
    fontSize:14, fontFamily:'var(--font-body)',
    color:'var(--text-primary)',
    background:'var(--input-bg)',
    outline:'none',
    transition:'border-color var(--dur-fast) var(--ease)',
  }
  const labelStyle = {
    fontFamily:'var(--font-ui)', fontSize:10, fontWeight:700,
    letterSpacing:'0.1em', textTransform:'uppercase',
    color:'var(--text-muted)', marginBottom:7, display:'block',
  }

  const contacts = [
    { icon:'📍', label:'Address', val:'330 St. Mary Avenue\nSuite 300, Winnipeg, MB R3C 3Z5' },
    { icon:'📞', label:'Phone',   val:'+12042021791' },
    { icon:'✉️', label:'Email',   val:'info@hub4teq.com' },
    { icon:'🕒', label:'Hours',   val:'Mon–Fri: 8am – 6pm WAT\n24/7 Support for managed clients' },
  ]

  return (
    <div style={{ paddingTop:68 }}>
      {/* Hero */}
      <div style={{ background:'var(--green-deep)', padding:'72px 5% 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 70% 40%, rgba(35,139,69,0.2) 0%, transparent 55%)' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'40px 40px' }}/>
        <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <Tag light>Get In Touch</Tag>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,56px)', color:'#fff', lineHeight:1.1, marginTop:18, marginBottom:14 }}>
            Let's start a conversation.
          </h1>
          <p style={{ fontSize:16, fontWeight:300, color:'rgba(255,255,255,0.52)', lineHeight:1.8 }}>
            Whether you need a quote, a strategy session, or just want to explore what's possible — we're here.
          </p>
        </div>
      </div>

      {/* Body */}
      <section style={{ padding:'72px 5%', background:'var(--bg-page)' }}>
        <div className="contact-grid" style={{ maxWidth:1160, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 380px', gap:40, alignItems:'start' }}>

          {/* Form card */}
          <div style={{ background:'var(--bg-surface)', borderRadius:'var(--r-xl)', padding:'40px', border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:26, color:'var(--text-primary)', marginBottom:6 }}>Send us a message</h2>
            <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:32 }}>We respond to all enquiries within one business day.</p>

            <form onSubmit={handleSubmit}>
              <div className="booking-form-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--green)'}
                    onBlur={e=>e.target.style.borderColor='var(--input-border)'}/>
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--green)'}
                    onBlur={e=>e.target.style.borderColor='var(--input-border)'}/>
                </div>
              </div>
              <div className="booking-form-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (204) 000-0000" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--green)'}
                    onBlur={e=>e.target.style.borderColor='var(--input-border)'}/>
                </div>
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp Ltd" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='var(--green)'}
                    onBlur={e=>e.target.style.borderColor='var(--input-border)'}/>
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={labelStyle}>Service Interested In</label>
                <select name="service" value={form.service} onChange={handleChange}
                  style={{ ...inputStyle, appearance:'none', cursor:'pointer' }}>
                  <option value="">— Select a service —</option>
                  {['Managed IT Services','Cloud Solutions','Cybersecurity','Connectivity & Networks','IT Consulting','IT Help Desk','Multiple Services'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Your Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us about your project, challenges, or questions..."
                  style={{ ...inputStyle, resize:'vertical' }}
                  onFocus={e=>e.target.style.borderColor='var(--green)'}
                  onBlur={e=>e.target.style.borderColor='var(--input-border)'}/>
              </div>
              <BtnPrimary style={{ width:'100%', justifyContent:'center', fontSize:15, opacity:sending?0.7:1 }}>
                {sending ? 'Sending…' : 'Send Message →'}
              </BtnPrimary>
              <p style={{ fontSize:12, color:'var(--text-faint)', marginTop:11, textAlign:'center' }}>
                🔒 Your data is protected. We never share your information.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar" style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:84 }}>
            {/* Contact details */}
            <div style={{ background:'var(--green-deep)', borderRadius:'var(--r-xl)', padding:'28px 24px', color:'#fff' }}>
              <h3 style={{ fontFamily:'var(--font-ui)', fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--green-light)', marginBottom:22 }}>Contact Details</h3>
              {contacts.map((c,i)=>(
                <div key={i} style={{ display:'flex', gap:13, marginBottom:18 }}>
                  <span style={{ fontSize:17, flexShrink:0, marginTop:1 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', marginBottom:3 }}>{c.label}</div>
                    <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.6, whiteSpace:'pre-line' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response guarantee */}
            <div style={{ background:'var(--bg-surface)', borderRadius:'var(--r-xl)', padding:'20px 22px', border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ fontSize:28, flexShrink:0 }}>⚡</div>
                <div>
                  <h4 style={{ fontFamily:'var(--font-ui)', fontSize:13, fontWeight:700, color:'var(--text-primary)', marginBottom:5 }}>Fast Response Guarantee</h4>
                  <p style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.65 }}>We respond within <strong>24 hours</strong>. For urgent matters call us directly at <strong>+12042021791</strong>.</p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            {[
              { emoji:'💬', label:'Live Chat',   sub:'Chat with our team now',          cta:'Start Chat' },
              { emoji:'📅', label:'Book a Call', sub:'Schedule 30 min with an expert',  cta:'Pick a Time' },
            ].map((o,i)=>(
              <div key={i} style={{ background:'var(--bg-surface)', borderRadius:'var(--r-xl)', padding:'16px 18px', border:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}>
                <div style={{ display:'flex', gap:11, alignItems:'center' }}>
                  <span style={{ fontSize:22 }}>{o.emoji}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:13, fontWeight:700, color:'var(--text-primary)' }}>{o.label}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:1 }}>{o.sub}</div>
                  </div>
                </div>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:10, fontWeight:700, color:'var(--green)', letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap', marginLeft:8 }}>{o.cta} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map strip */}
      <div style={{ height:260, background:'var(--bg-invert)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(35,139,69,0.08) 1px, transparent 1px)', backgroundSize:'28px 28px' }}/>
        <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ fontSize:40, marginBottom:10 }}>📍</div>
          <div style={{ fontFamily:'var(--font-ui)', fontSize:12, fontWeight:700, color:'rgba(var(--invert-rgb),0.45)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:5 }}>Our Office</div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:14, color:'rgba(var(--invert-rgb),0.3)', fontWeight:300 }}>330 St. Mary Avenue, Suite 300 · Winnipeg, MB R3C 3Z5 · Canada</div>
        </div>
      </div>
    </div>
  )
}
