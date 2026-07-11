import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AppContext = createContext(null)

// The app has no router — `page` is plain state. The one exception is /admin,
// which needs to be a bookmarkable, refreshable URL for staff (it isn't in the
// public nav), so we read/write just that one path against browser history.
const getInitialPage = () => {
  try {
    return window.location.pathname.replace(/\/$/, '') === '/admin' ? 'admin' : 'home'
  } catch {
    return 'home'
  }
}

export function AppProvider({ children }) {
  const [page, setPage] = useState(getInitialPage)
  const [toast, setToast] = useState({ show: false, msg: '' })
  const [mobileOpen, setMobileOpen] = useState(false)

  // ── Dark mode: persist in localStorage ──
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('hub4teq-theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch { return false }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('hub4teq-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = useCallback(() => setDark(d => !d), [])

  const navigate = useCallback((p) => {
    setPage(p)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const path = p === 'admin' ? '/admin' : '/'
      if (window.location.pathname !== path) window.history.pushState(null, '', path)
    } catch { /* no-op outside a browser */ }
  }, [])

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 3400)
  }, [])

  return (
    <AppContext.Provider value={{ page, navigate, toast, showToast, mobileOpen, setMobileOpen, dark, toggleDark }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be within AppProvider')
  return ctx
}
