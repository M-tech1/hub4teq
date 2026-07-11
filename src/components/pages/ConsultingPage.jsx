import React from "react";
import { useApp } from "../../context/AppContext";
import { BtnPrimary, BtnSecondary, Tag, SectionHeading } from "../ui";
import { CONSULTING_OFFERINGS } from "../../data";

export default function ConsultingPage() {
  const { navigate } = useApp();
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--bg-page)",
          padding: "88px 5% 72px",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(100px,18vw,280px)",
            color: "var(--green-glass)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          CTO
        </div>
        <div
          className="consulting-hero"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div
            style={{
              animation: "fadeUp 0.6s var(--ease-out) both",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Tag>Strategy & Advisory</Tag>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5.5vw,62px)",
                color: "var(--text-primary)",
                lineHeight: 1.08,
                marginTop: 20,
                marginBottom: 18,
              }}
            >
              Technology
              <br />
              Consulting that
              <br />
              <em style={{ color: "var(--green)", fontStyle: "italic" }}>
                Moves the Needle.
              </em>
            </h1>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth: 420,
                marginBottom: 32,
              }}
            >
              Strategic technology guidance for SMEs and corporates — from
              digital transformation roadmaps to fractional CTO services.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <BtnPrimary onClick={() => navigate("contact")}>
                Book a Strategy Session →
              </BtnPrimary>
              <BtnSecondary onClick={() => navigate("services")}>
                View All Services
              </BtnSecondary>
            </div>
          </div>
          <div
            className="consulting-cards"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {[
              { emoji: "🎯", stat: "98%", label: "Project Success Rate" },
              {
                emoji: "⚡",
                stat: "3×",
                label: "Avg. ROI on Digital Transformation",
              },
              { emoji: "🏢", stat: "200+", label: "Enterprises Advised" },
              { emoji: "🌍", stat: "12", label: "Countries Served" },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--r-xl)",
                  padding: "22px 18px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.emoji}</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    color: "var(--green)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {c.stat}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offerings */}
      <section style={{ padding: "88px 5%", background: "var(--bg-surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeading
            tag="Consulting Services"
            title="How We Help You Grow"
            sub="Structured engagements designed around your specific challenges and opportunities."
          />
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 2,
              background: "var(--border)",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}
          >
            {CONSULTING_OFFERINGS.map((o, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-surface)",
                  padding: "30px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 42,
                    color: "var(--green-pale)",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {o.number}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "88px 5%", background: "var(--bg-invert)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeading
            tag="How We Engage"
            title="Our Consulting Model"
            invert
            center
            sub="Flexible engagement structures built around your goals, budget, and timeline."
          />
          <div
            className="pricing-grid"
            style={{
              marginTop: 52,
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 18,
            }}
          >
            {[
              {
                icon: "🔍",
                title: "Discovery Sprint",
                // duration: "1–2 Weeks",
                // price: "From $2,500",
                desc: "Rapid assessment of your current technology landscape, challenges, and immediate opportunities. Deliverable: actionable report + priority matrix.",
                highlight: false,
              },
              {
                icon: "🗺️",
                title: "Transformation Roadmap",
                // price: "From $8,500",
                desc: "Full digital transformation strategy with phased implementation plan, vendor recommendations, and ROI projections. Our most popular engagement.",
                highlight: true,
              },
              {
                icon: "👔",
                title: "Fractional CTO",
                // duration: "Ongoing / Retainer",
                // price: "From $5,500/mo",
                desc: "Embedded senior technology leadership for organisations that need ongoing strategic direction without the cost of a full-time executive.",
                highlight: false,
              },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: m.highlight
                    ? "var(--green)"
                    : "rgba(var(--invert-rgb),0.04)",
                  border: `1px solid ${m.highlight ? "var(--green-mid)" : "rgba(var(--invert-rgb),0.08)"}`,
                  borderRadius: "var(--r-xl)",
                  padding: "32px 26px",
                  position: "relative",
                }}
              >
                {m.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--gold)",
                      color: "var(--green-deep)",
                      fontFamily: "var(--font-ui)",
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "4px 14px",
                      borderRadius: "var(--r-full)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 32, marginBottom: 14 }}>{m.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: m.highlight ? "#fff" : "var(--text-invert)",
                    marginBottom: 5,
                  }}
                >
                  {m.title}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: m.highlight
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(var(--invert-rgb),0.55)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {m.duration}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: m.highlight
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(var(--invert-rgb),0.45)",
                    lineHeight: 1.75,
                    marginBottom: 20,
                  }}
                >
                  {m.desc}
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    color: m.highlight ? "#fff" : "var(--green-light)",
                    marginBottom: 18,
                  }}
                >
                  {m.price}
                </div>
                <BtnPrimary
                  onClick={() => navigate("contact")}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    background: m.highlight ? "#fff" : "var(--green)",
                    color: m.highlight ? "var(--green-dark)" : "#fff",
                  }}
                >
                  Get Started →
                </BtnPrimary>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "88px 5%", background: "var(--bg-page)" }}>
        <div
          className="consulting-process"
          style={{ maxWidth: 860, margin: "0 auto", padding: "0 5%" }}
        >
          <SectionHeading tag="The Process" title="What to expect" center />
          <div
            style={{
              marginTop: 52,
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {[
              {
                n: "01",
                title: "Discovery Call",
                desc: "A 30-minute call to understand your goals, challenges, and whether we're the right fit.",
              },
              {
                n: "02",
                title: "Scope & Proposal",
                desc: "A detailed proposal with clear deliverables, timeline, and pricing within 48 hours.",
              },
              {
                n: "03",
                title: "Kick-off & Immersion",
                desc: "Stakeholder interviews, system access review, and data gathering to build a complete picture.",
              },
              {
                n: "04",
                title: "Analysis & Strategy",
                desc: "Deep-dive analysis resulting in clear recommendations, prioritised by impact and feasibility.",
              },
              {
                n: "05",
                title: "Delivery & Handover",
                desc: "Structured presentation of findings, roadmap, and implementation support to get you moving.",
              },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: 32,
                  position: "relative",
                }}
              >
                {i < 4 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 20,
                      top: 48,
                      bottom: 0,
                      width: 2,
                      background: "var(--green-pale)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "var(--green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {step.n}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 5,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <BtnPrimary onClick={() => navigate("contact")}>
              Start with a Discovery Call →
            </BtnPrimary>
          </div>
        </div>
      </section>
    </div>
  );
}
