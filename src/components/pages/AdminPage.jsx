import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { firebaseReady } from '../../lib/firebase'
import AdminLogin from '../admin/AdminLogin'
import AdminDashboard from '../admin/AdminDashboard'

export default function AdminPage() {
  const { user, loading } = useAuth()

  if (!firebaseReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)', padding: '24px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: 420 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)', marginBottom: 8 }}>Firebase not configured</h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.7 }}>Add your Firebase project config to <code>.env.local</code> (see <code>.env.example</code>) and create at least one agent user in Firebase Console → Authentication to sign in here.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }} />
  }

  return user ? <AdminDashboard agentEmail={user.email} /> : <AdminLogin />
}
