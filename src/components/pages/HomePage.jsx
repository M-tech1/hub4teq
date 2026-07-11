import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { BtnPrimary, BtnSecondary, SectionHeading } from "../ui";
import { STATS, SERVICES, TESTIMONIALS } from "../../data";

/* ─── Canvas ─── */
function NodeCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 50 }, () => ({
      x: Math.random() * (W || 800),
      y: Math.random() * (H || 500),
      r: Math.random() * 2 + 0.7,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x,
            dy = nodes[i].y - nodes[j].y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(76,200,112,${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76,200,112,${n.a})`;
        ctx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
}

/* ─── Orbit (hidden on mobile via CSS class) ─── */
function OrbitSystem() {
  const icons = [
    { e: "☁️", anim: "orbit", dur: "13s", delay: "0s" },
    { e: "🛡️", anim: "orbit", dur: "13s", delay: "6.5s" },
    { e: "⚙️", anim: "orbitMid", dur: "20s", delay: "0s" },
    { e: "🌐", anim: "orbitMid", dur: "20s", delay: "6.6s" },
    { e: "💡", anim: "orbitMid", dur: "20s", delay: "13s" },
    { e: "🎧", anim: "orbitOuter", dur: "28s", delay: "0s" },
    { e: "🔒", anim: "orbitOuter", dur: "28s", delay: "9.3s" },
    { e: "📡", anim: "orbitOuter", dur: "28s", delay: "18.6s" },
  ];
  const rings = [
    { r: 110, dur: "13s" },
    { r: 160, dur: "20s" },
    { r: 210, dur: "28s" },
  ];
  return (
    <div
      style={{ position: "relative", width: 440, height: 440, flexShrink: 0 }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 88,
          height: 88,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle,#4cc870 0%,#238b45 50%,#145c2c 100%)",
          boxShadow:
            "0 0 40px rgba(35,139,69,0.7),0 0 80px rgba(35,139,69,0.3)",
          animation: "pulseGreen 2.5s ease-in-out infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <img
          src="/hu4tec-logo.png"
          alt="hub4teq logo"
          width={56}
          height={56}
          style={{ width: 56, height: 56, objectFit: "contain" }}
        />
      </div>
      {rings.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: r.r * 2,
            height: r.r * 2,
            border: "1px solid rgba(35,139,69,0.2)",
            borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            animation: `${i === 2 ? "spinSlowReverse" : "spinSlow"} ${r.dur} linear infinite`,
          }}
        />
      ))}
      {icons.map((ic, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            animation: `${ic.anim} ${ic.dur} linear infinite`,
            animationDelay: ic.delay,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(13,61,29,0.88)",
              border: "1px solid rgba(35,139,69,0.4)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              transform: "translate(-50%,-50%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {ic.e}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Ticker ─── */
function Ticker() {
  const base = [
    "Managed IT Services",
    "Cloud Solutions",
    "Cybersecurity",
    "IT Consulting",
    "Connectivity & Networks",
    "Digital Transformation",
    "Endpoint Protection",
    "IT Help Desk",
  ];
  const items = [...base, ...base, ...base];
  return (
    <div
      style={{
        overflow: "hidden",
        background: "var(--green)",
        padding: "13px 0",
        borderTop: "1px solid #145c2c",
        borderBottom: "1px solid #145c2c",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 32s linear infinite",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              padding: "0 28px",
              whiteSpace: "nowrap",
            }}
          >
            {item} <span style={{ opacity: 0.4 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Scroll Reveal ─── */
function Reveal({ children, delay = 0, anim = "fadeUp" }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        animation: vis ? `${anim} 0.6s ${delay}s var(--ease-out) both` : "none",
        opacity: vis ? undefined : 0,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animated Counter ─── */
function AnimCounter({ value, label, delay = 0 }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ textAlign: "center", padding: "40px 16px" }}
      className="stat-divider"
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px,4vw,52px)",
          color: "var(--green)",
          lineHeight: 1,
          animation: vis
            ? `countReveal 0.6s ${delay}s var(--ease-spring) both`
            : "none",
          opacity: vis ? undefined : 0,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginTop: 8,
          animation: vis
            ? `fadeUp 0.5s ${delay + 0.15}s var(--ease-out) both`
            : "none",
          opacity: vis ? undefined : 0,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Particles ─── */
function Particles({ count = 10 }) {
  const anims = ["driftUp", "driftUpAlt", "driftUpB"];
  return (
    <>
      {Array.from({ length: count }, (_, i) => ({
        left: `${8 + Math.random() * 84}%`,
        bottom: `${Math.random() * 28}%`,
        size: 3 + Math.random() * 4,
        dur: 2.8 + Math.random() * 2.5,
        delay: Math.random() * 4,
        anim: anims[i % 3],
      })).map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--green-light)",
            animation: `${p.anim} ${p.dur}s ${p.delay}s ease-out infinite`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      ))}
    </>
  );
}

/* ─── Word Rotator ─── */
function WordRotator({ words }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setShow(true);
      }, 220);
    }, 2700);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span
      style={{
        color: "var(--green-light)",
        fontStyle: "italic",
        display: "inline-block",
        minWidth: "clamp(200px,28vw,280px)",
        animation: show ? "fadeDown 0.35s var(--ease-spring) both" : "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.18s",
      }}
    >
      {words[idx]}
    </span>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ service, onClick, delay }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--card-bg)",
        border: `1px solid ${hov ? "var(--green-pale)" : "var(--border)"}`,
        transform: hov
          ? "translateY(-7px) scale(1.01)"
          : "translateY(0) scale(1)",
        boxShadow: hov
          ? `var(--shadow-lg),0 0 0 1px var(--green-pale)`
          : "var(--shadow-sm)",
        transition: "all 0.35s var(--ease-spring)",
        animation: vis ? `fadeUp 0.55s ${delay}s var(--ease-out) both` : "none",
        opacity: vis ? undefined : 0,
      }}
    >
      <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
        <img
          src={service.image}
          alt={service.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s var(--ease)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top,${service.color}cc 0%,transparent 55%)`,
          }}
        />
        {hov && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.07) 50%,transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 0.8s ease-in-out",
            }}
          />
        )}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: "var(--r-full)",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
            }}
          >
            {service.id.replace(/-/g, " ")}
          </span>
        </div>
        <div
          style={{ position: "absolute", bottom: 14, left: 14, fontSize: 24 }}
        >
          {service.icon}
        </div>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <h3
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 6,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: "var(--text-muted)",
            lineHeight: 1.65,
            marginBottom: 12,
          }}
        >
          {service.desc.slice(0, 88)}…
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginBottom: 14,
          }}
        >
          {service.features.slice(0, 3).map((f) => (
            <span
              key={f}
              style={{
                fontSize: 10,
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: "var(--r-full)",
                background: "var(--green-glass)",
                color: "var(--green)",
                border: "1px solid rgba(35,139,69,0.12)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--green)",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          Learn More{" "}
          <span
            style={{
              transition: "transform 0.22s",
              transform: hov ? "translateX(5px)" : "none",
              display: "inline-block",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ t, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        background: "var(--card-bg)",
        borderRadius: "var(--r-xl)",
        padding: 28,
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        animation: vis ? `fadeUp 0.55s ${delay}s var(--ease-out) both` : "none",
        opacity: vis ? undefined : 0,
      }}
    >
      <div
        style={{
          color: "var(--green)",
          fontSize: 15,
          letterSpacing: 3,
          marginBottom: 14,
        }}
      >
        ★★★★★
      </div>
      <p
        style={{
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.8,
          color: "var(--text-secondary)",
          marginBottom: 22,
          fontStyle: "italic",
        }}
      >
        "{t.text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${t.color},#145c2c)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {t.avatar}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {t.name}
          </div>
          <div
            style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════
   MAIN
   ═══════════════════════════════ */
export default function HomePage() {
  const { navigate, dark } = useApp();

  return (
    <div style={{ paddingTop: 68 }}>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "calc(100vh - 68px)",
          background: "var(--hero-bg)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "80px 6% 60px",
        }}
      >
        <NodeCanvas />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "radial-gradient(ellipse 70% 60% at 62% 50%,rgba(35,139,69,0.18) 0%,transparent 65%),radial-gradient(ellipse 40% 50% at 12% 60%,rgba(35,139,69,0.1) 0%,transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "6%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle,rgba(35,139,69,0.1) 0%,transparent 70%)",
            animation: "morphBlob 14s ease-in-out infinite",
            zIndex: 1,
          }}
        />
        <Particles count={12} />

        {/* grid */}
        <div
          className="hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 4,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                animation: "fadeUp 0.6s 0.1s var(--ease-out) both",
                opacity: 0,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "7px 16px",
                  borderRadius: "var(--r-full)",
                  background: "rgba(var(--ink-rgb),0.06)",
                  border: "1px solid rgba(var(--ink-rgb),0.14)",
                  color: "var(--text-secondary)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--green-light)",
                    animation: "pulseGreen 2s infinite",
                    display: "inline-block",
                  }}
                />
                Innovation Kernel
              </span>
            </div>

            <div
              style={{
                animation: "fadeUp 0.65s 0.22s var(--ease-out) both",
                opacity: 0,
                marginBottom: 20,
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(36px,5.5vw,70px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.07,
                  fontWeight: 400,
                }}
              >
                Intelligent Tech
                <br />
                solutions for a{" "}
                <WordRotator
                  words={[
                    "Smarter World.",
                    "Better Future.",
                    "Faster Business.",
                    "Secure Tomorrow.",
                  ]}
                />
              </h1>
            </div>

            <div
              style={{
                animation: "fadeUp 0.65s 0.36s var(--ease-out) both",
                opacity: 0,
                marginBottom: 36,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(14px,2vw,17px)",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                  maxWidth: 430,
                }}
              >
                We deliver Managed IT services, Cloud Computing and
                Cybersecurity solutions tailored for Wholesale, B2B, SME, and
                Corporate organizations.
              </p>
            </div>

            <div
              className="hero-ctas"
              style={{
                animation: "fadeUp 0.65s 0.48s var(--ease-out) both",
                opacity: 0,
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 44,
              }}
            >
              <BtnPrimary onClick={() => navigate("services")}>
                Explore Services →
              </BtnPrimary>
              <BtnSecondary dark={dark} onClick={() => navigate("contact")}>
                Talk to an Expert
              </BtnSecondary>
            </div>

            <div
              className="hero-trust"
              style={{
                animation: "fadeUp 0.65s 0.6s var(--ease-out) both",
                opacity: 0,
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {["24/7 Support"].map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-ui)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-faint)",
                  }}
                >
                  <span style={{ color: "var(--green-light)", fontSize: 11 }}>
                    ✓
                  </span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Right orbit — hidden on tablet/mobile via CSS class */}
          <div
            className="hero-orbit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "scaleIn 0.7s 0.3s var(--ease-out) both",
              opacity: 0,
              position: "relative",
            }}
          >
            <OrbitSystem />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: -10,
                background: "rgba(var(--ink-rgb),0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(var(--ink-rgb),0.12)",
                borderRadius: "var(--r-lg)",
                padding: "14px 18px",
                animation: "float 4s 1s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                Managed IT Services
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 20,
                right: -8,
                background: "rgba(35,139,69,0.2)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(35,139,69,0.35)",
                borderRadius: "var(--r-lg)",
                padding: "14px 18px",
                animation: "floatX 3.5s 0.5s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 26,
                  color: "var(--green-light)",
                  lineHeight: 1,
                }}
              >
                98%
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeIn 1s 1.3s var(--ease-out) both",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            Scroll
          </div>
          <div
            style={{
              width: 1,
              height: 36,
              background:
                "linear-gradient(to bottom,rgba(76,200,112,0.6),transparent)",
              animation: "scanLine 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── STATS ── */}
      <section
        style={{
          background: "var(--bg-surface)",
          padding: "0 5%",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <div style={{ maxWidth: 2100, margin: "0 auto" }}>
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              position: "relative",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "var(--green)",
                    animation: `drawLine 0.8s ${i * 0.14}s var(--ease-out) both`,
                    transformOrigin: "left",
                  }}
                />
                <AnimCounter value={s.value} label={s.label} delay={i * 0.12} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "96px 5%", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="section-header-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <Reveal>
              <SectionHeading
                tag="What We Do"
                title={
                  <>
                    Our Core
                    <br />
                    Services
                  </>
                }
                sub="From IT infrastructure to digital transformation, end-to-end technology capabilities under one roof."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <BtnSecondary onClick={() => navigate("services")}>
                View All Services →
              </BtnSecondary>
            </Reveal>
          </div>
          <div
            className="home-services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                onClick={() => navigate(s.page)}
                delay={0.05 + i * 0.07}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section
        style={{
          background: "var(--bg-invert)",
          padding: "96px 5%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 75% 50%,rgba(35,139,69,0.07) 0%,transparent 65%)",
          }}
        />
        <div
          className="why-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <Reveal>
              <SectionHeading
                tag="Why hub4teq"
                title={
                  <>
                    Technology that
                    <br />
                    <em style={{ fontStyle: "italic" }}>actually works</em>
                  </>
                }
                sub="We don't just deploy solutions — we become a strategic extension of your team, committed to outcomes that matter."
                invert
              />
            </Reveal>
            <div
              style={{
                marginTop: 36,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {[
                {
                  icon: "🔧",
                  title: "End-to-End Delivery",
                  desc: "Strategy, design, deployment, and ongoing management under one roof.",
                },
                {
                  icon: "📡",
                  title: "Industry-Deep Expertise",
                  desc: "Specialists in Wholesale, B2B, SME, and Corporate environments across Canada.",
                },
                {
                  icon: "🤝",
                  title: "True Partnership",
                  desc: "Your success is our KPI. We measure ourselves by your outcomes, not our activity.",
                },
                {
                  icon: "🔒",
                  title: "Security-First Mindset",
                  desc: "Every solution we build has security and compliance baked in from day one.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 * i} anim="slideRight">
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 11,
                        background: "rgba(35,139,69,0.12)",
                        border: "1px solid rgba(35,139,69,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 19,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--text-invert)",
                          marginBottom: 3,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 300,
                          color: "rgba(var(--invert-rgb),0.42)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5}>
              <div style={{ marginTop: 36 }}>
                <BtnPrimary onClick={() => navigate("about")}>
                  Meet the Team →
                </BtnPrimary>
              </div>
            </Reveal>
          </div>

          <Reveal anim="slideLeft" delay={0.2}>
            <div
              className="why-images"
              style={{ position: "relative", height: 500 }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "88%",
                  height: "65%",
                  borderRadius: "var(--r-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
                  alt="Team"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(13,61,29,0.15)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      "linear-gradient(90deg,transparent,rgba(76,200,112,0.5),transparent)",
                    animation: "scanLine 3s ease-in-out infinite",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "52%",
                  height: "42%",
                  borderRadius: "var(--r-xl)",
                  overflow: "hidden",
                  border: "4px solid var(--bg-invert)",
                  boxShadow: "var(--shadow-md)",
                  animation: "float 7s 1s ease-in-out infinite",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
                  alt="IT"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "34%",
                  right: -22,
                  background: "var(--green)",
                  borderRadius: "var(--r-lg)",
                  padding: "16px 20px",
                  boxShadow: "var(--shadow-green)",
                  animation: "floatSlow 5s 0.5s ease-in-out infinite",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  15+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 4,
                  }}
                >
                  Years
                  <br />
                  Experience
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "96px 5%", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionHeading
              tag="Client Stories"
              title="What our clients say"
              sub="Trusted by organisations across Canada and beyond."
              center
            />
          </Reveal>
          <div
            className="testimonials-grid"
            style={{
              marginTop: 52,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 22,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} t={t} delay={0.1 + i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "var(--bg-surface)", padding: "96px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <SectionHeading
              tag="How We Work"
              title="Our Proven Process"
              center
              sub="A structured, transparent approach from first call to full deployment."
            />
          </Reveal>
          <div
            className="process-grid"
            style={{
              marginTop: 60,
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 0,
              position: "relative",
            }}
          >
            <div
              className="process-line"
              style={{
                position: "absolute",
                top: 31,
                left: "12.5%",
                right: "12.5%",
                height: 2,
                background:
                  "linear-gradient(90deg,var(--green),var(--green-light),var(--green))",
                backgroundSize: "200% 100%",
                animation: "gradientShift 4s ease-in-out infinite",
                zIndex: 0,
              }}
            />
            {[
              {
                n: "01",
                icon: "🔍",
                title: "Discovery",
                desc: "We audit your current landscape, goals, and pain points in a focused 1-week sprint.",
              },
              {
                n: "02",
                icon: "📐",
                title: "Strategy",
                desc: "A tailored technology roadmap with clear milestones and ROI projections.",
              },
              {
                n: "03",
                icon: "🏗️",
                title: "Deployment",
                desc: "Certified engineers execute the plan on time, on budget, with zero surprises.",
              },
              {
                n: "04",
                icon: "📊",
                title: "Optimise",
                desc: "Ongoing monitoring, reporting, and continuous improvement to maximise value.",
              },
            ].map((s, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "0 16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "var(--green)",
                      border: "4px solid var(--bg-surface)",
                      boxShadow: "var(--shadow-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      margin: "0 auto 18px",
                      animation: "pulseGreen 3s ease-in-out infinite",
                      animationDelay: `${i * 0.55}s`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      color: "var(--green)",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Step {s.n}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "var(--green-deep)",
          padding: "88px 5%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(35,139,69,0.22) 0%,transparent 70%)",
            animation: "pulseGreen 4s ease-in-out infinite",
          }}
        />
        <Particles count={7} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-ui)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: "var(--r-full)",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.65)",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--green-light)",
                  animation: "blink 1.2s infinite",
                  display: "inline-block",
                }}
              />
              Ready when you are
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px,5vw,54px)",
                color: "#fff",
                lineHeight: 1.12,
                margin: "14px auto 18px",
                maxWidth: 580,
              }}
            >
              Let's build something remarkable together.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.48)",
                maxWidth: 420,
                margin: "0 auto 36px",
                lineHeight: 1.8,
              }}
            >
              Tell us about your challenge. We'll respond within one business
              day.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div
              className="hero-ctas"
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <BtnPrimary
                onClick={() => navigate("contact")}
                style={{ background: "#fff", color: "var(--green-dark)" }}
              >
                Start a Conversation →
              </BtnPrimary>
              <BtnSecondary dark onClick={() => navigate("services")}>
                Browse Services
              </BtnSecondary>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <div
              style={{
                marginTop: 44,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: "var(--r-full)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ fontSize: 13 }}>📍</span>
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.04em",
                }}
              >
                330 St. Mary Avenue, Suite 300, Winnipeg, MB R3C 3Z5
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
