import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { NAV_LINKS } from "../../data";
import { BtnPrimary, ThemeToggle } from "../ui";

export default function Navbar() {
  const { page, navigate, mobileOpen, setMobileOpen, dark, toggleDark } =
    useApp();
  const [scrolled, setScrolled] = useState(false);

  // Pages whose hero background follows the theme (light in light mode, dark in dark
  // mode) instead of the fixed dark-green hero — the transparent navbar needs
  // theme-aware text there rather than hardcoded white.
  const THEME_HERO_PAGES = ["home", "about", "consulting"];
  // Pages with a short, fixed dark-green header (not a full hero) — the navbar would
  // otherwise flip from transparent/white to frosted/dark partway through that short
  // header. Keep it in its solid state the whole time so it doesn't change on scroll.
  const STATIC_NAV_PAGES = ["services", "contact", "support", "green"];
  const solidNav = scrolled || STATIC_NAV_PAGES.includes(page);
  const overDarkHero = !solidNav && !THEME_HERO_PAGES.includes(page);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 68,
          background: solidNav ? "var(--nav-bg)" : "transparent",
          backdropFilter: solidNav ? "blur(18px)" : "none",
          borderBottom: solidNav
            ? "1px solid var(--nav-border)"
            : "1px solid transparent",
          transition:
            "background 0.35s var(--ease), border-color 0.35s, backdrop-filter 0.35s",
          display: "flex",
          alignItems: "center",
          padding: "0 5%",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("home")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <img
            src="/hu4tec-logo.png"
            alt="hub4teq logo"
            width={40}
            height={40}
            style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 800,
                fontSize: 17,
                color: overDarkHero ? "#fff" : "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                transition: "color 0.3s",
              }}
            >
              hub<span style={{ color: "var(--green-light)" }}>4</span>teq Inc
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Innovation Kernel
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <ul
          className="desktop-nav"
          style={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            listStyle: "none",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => navigate(link.id)}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  padding: "8px 14px",
                  borderRadius: "var(--r-full)",
                  color:
                    page === link.id
                      ? "var(--green)"
                      : overDarkHero
                        ? "rgba(255,255,255,0.75)"
                        : "var(--text-secondary)",
                  background:
                    page === link.id ? "var(--green-glass2)" : "transparent",
                  transition: "all var(--dur-fast) var(--ease)",
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <ThemeToggle dark={dark} onToggle={toggleDark} />
          <div className="nav-cta">
            <BtnPrimary
              onClick={() => navigate("contact")}
              style={{ padding: "9px 20px", fontSize: 13 }}
            >
              Get Started →
            </BtnPrimary>
          </div>
          {/* Hamburger */}
          <button
            className={`hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <span
              style={{
                background: overDarkHero ? "#fff" : "var(--text-primary)",
              }}
            />
            <span
              style={{
                background: overDarkHero ? "#fff" : "var(--text-primary)",
              }}
            />
            <span
              style={{
                background: overDarkHero ? "#fff" : "var(--text-primary)",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="mobile-drawer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "var(--bg-surface)",
          padding: "88px 6% 40px",
          display: "flex",
          flexDirection: "column",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s var(--ease)",
          overflowY: "hidden",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 32,
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 16,
                fontWeight: 700,
                padding: "12px 0",
                textAlign: "left",
                color:
                  page === link.id ? "var(--green)" : "var(--text-primary)",
                transition: "color 0.2s",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <BtnPrimary
          onClick={() => navigate("contact")}
          style={{
            justifyContent: "center",
            width: "100%",
            padding: "16px",
            fontSize: 15,
          }}
        >
          Get Started →
        </BtnPrimary>

        {/* Contact info */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--green)",
              marginBottom: 12,
            }}
          >
            Contact
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            330 St. Mary Avenue, Suite 300
            <br />
            Winnipeg, MB R3C 3Z5
          </p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
            +12042021791
          </p>
        </div>
      </div>
    </>
  );
}
