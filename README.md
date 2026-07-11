# hub4teq — Technology & Green Energy Hub

> Elegant React + Vite website inspired by enverge.ca, built for **hub4teq**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # preview production build
```

---

## 📁 Project Structure

```
hub4teq/
├── index.html                   # Vite root HTML shell
├── vite.config.js               # @vitejs/plugin-react
├── package.json
└── src/
    ├── main.jsx                 # createRoot entry
    ├── App.jsx                  # Page router
    ├── context/
    │   └── AppContext.jsx       # Global nav + toast state
    ├── data/
    │   └── index.js             # All content/copy data
    ├── styles/
    │   └── globals.css          # Design tokens + keyframes
    └── components/
        ├── layout/
        │   ├── Navbar.jsx       # Sticky transparent → frosted navbar
        │   ├── Footer.jsx       # Full footer with CTA strip
        │   └── Toast.jsx        # Slide-in notification
        ├── ui/
        │   └── index.jsx        # Tag, BtnPrimary, BtnSecondary, BtnGhost,
        │                        # SectionHeading, StatCard, IconBox, Divider
        └── pages/
            ├── HomePage.jsx     # Hero · Ticker · Stats · Services · Why Us · Testimonials · Green CTA
            ├── ServicesPage.jsx # Interactive service explorer + full grid
            ├── GreenEnergyPage.jsx # Renewable energy — solar, wind, hydro, biomass
            ├── ConsultingPage.jsx  # Consulting tiers + engagement model + timeline
            ├── AboutPage.jsx    # Story · Values · Team
            └── ContactPage.jsx  # Contact form + sidebar info + map placeholder
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Brand Green | `#238b45` |
| Dark Green | `#145c2c` |
| Deep Green | `#0d3d1d` |
| Light Green | `#4cc870` |
| Charcoal | `#1a1e1b` |
| Ivory | `#f8f6f1` |
| Display Font | DM Serif Display |
| UI Font | Syne |
| Body Font | Outfit |

---

## ✨ Features

- **6 full pages** — Home, Services, Green Energy, Consulting, About, Contact
- **Sticky frosted navbar** that transitions from transparent on scroll
- **Animated hero** with floating stat cards and pulsing green dot
- **Marquee ticker** for service highlights
- **Interactive service explorer** — sidebar nav + detail panel with animations
- **Consulting pricing tiers** with highlighted "Most Popular" card
- **Contact form** with validation + toast confirmation
- **Scroll-triggered page transitions** via CSS `@keyframes`
- **CSS custom properties** for effortless theming

---

## 🔌 Extend

Add a page:
1. Create `src/components/pages/MyPage.jsx`
2. Add `'mypage'` to `PAGES` in `AppContext.jsx`
3. Import + add entry in `App.jsx`
4. Add nav link in `data/index.js` → `NAV_LINKS`
