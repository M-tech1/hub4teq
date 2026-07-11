import React, { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Toast from './components/layout/Toast'

import HomePage      from './components/pages/HomePage'
import ServicesPage  from './components/pages/ServicesPage'
import ConsultingPage from './components/pages/ConsultingPage'
import AboutPage     from './components/pages/AboutPage'
import ContactPage   from './components/pages/ContactPage'
import SupportPage   from './components/pages/SupportPage'
import AdminPage     from './components/pages/AdminPage'

const PAGES = {
  home:       <HomePage />,
  services:   <ServicesPage />,
  consulting: <ConsultingPage />,
  about:      <AboutPage />,
  contact:    <ContactPage />,
  support:    <SupportPage />,
  admin:      <AdminPage />,
}

function Inner() {
  const { page, dark } = useApp()
  const isAdmin = page === 'admin'

  // Apply theme class to root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      {!isAdmin && <Navbar />}
      <main key={page} style={{ animation:'fadeUp 0.38s cubic-bezier(0,0,0.2,1) both' }}>
        {PAGES[page] ?? <HomePage />}
      </main>
      {!isAdmin && <Footer />}
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  )
}
