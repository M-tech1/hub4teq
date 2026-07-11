import React from 'react'
import { useApp } from '../../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: 'var(--green-deep)', color: '#fff',
      padding: '14px 20px', borderRadius: 'var(--r-lg)',
      borderLeft: '4px solid var(--green-light)',
      fontSize: 14, fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-lg)',
      transform: toast.show ? 'translateX(0)' : 'translateX(130%)',
      transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1)',
      maxWidth: 320,
    }}>
      {toast.msg}
    </div>
  )
}
