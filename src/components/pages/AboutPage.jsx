import React from "react";
import { useApp } from "../../context/AppContext";
import { BtnPrimary, Tag, SectionHeading } from "../ui";
import { STATS } from "../../data";

const TEAM = [
  {
    name: "Adaobi Nwosu",
    role: "CEO & Founder",
    initials: "AN",
    color: "#238b45",
    bio: "Serial tech entrepreneur with 20+ years across Telecoms, Cloud, and IT in Africa, Canada and Europe.",
  },
  {
    name: "Emeka Okafor",
    role: "CTO",
    initials: "EO",
    color: "#145c2c",
    bio: "Former Microsoft Azure Architect. Leads all cloud and cybersecurity engineering at hub4teq.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Consulting",
    initials: "SM",
    color: "#2fa852",
    bio: "Strategic advisor to 100+ SMEs and corporates on digital transformation and technology investment.",
  },
  {
    name: "David Kowalski",
    role: "Director of Operations",
    initials: "DK",
    color: "#0d3d1d",
    bio: "Certified PRINCE2 and Agile PM, ensuring every project is delivered on time and on budget.",
  },
];
const VALUES = [
  {
    icon: "🎯",
    title: "Outcome-Focused",
    desc: "We measure success by your results, not our activity. Every engagement is structured around measurable business outcomes.",
  },
  {
    icon: "🔬",
    title: "Deeply Technical",
    desc: "Our team comprises certified practitioners across cloud, security, networking not generalists.",
  },
  {
    icon: "🤝",
    title: "Long-Term Partnership",
    desc: "Our average client relationship spans 6+ years. We invest in understanding your business deeply.",
  },
  {
    icon: "💡",
    title: "Fearlessly Innovative",
    desc: "We experiment, challenge conventions, and bring leading-edge ideas to every client engagement.",
  },
  {
    icon: "🌍",
    title: "Community-Committed",
    desc: "Proud members of the Winnipeg tech community. We hire locally and give back through skills programmes.",
  },
  {
    icon: "🔒",
    title: "Trustworthy",
    desc: "Licensed, certified, and fully accountable. ISO-aligned processes and complete transparency in everything we do.",
  },
];

export default function AboutPage() {
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
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(120px,20vw,320px)",
            color: "var(--green-glass)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          hub4teq
        </div>
        <div
          className="about-hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
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
            <Tag>Our Story</Tag>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5vw,60px)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginTop: 20,
                marginBottom: 18,
              }}
            >
              Designed for the
              <br />
              <em style={{ color: "var(--green)", fontStyle: "italic" }}>
                world
              </em>
              <br />
              Built for impact.
            </h1>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: 18,
              }}
            >
              Hub4Teq Inc. stands out as a Canadian Business Corporation,
              distinguished for its commitment to providing cutting-edge
              integrated IT business solutions and managed services.
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              With 25+ years of industry expertise, Our deep-rooted experience
              enables us to deliver cutting-edge, scalable, and secure
              technology solutions tailored for Wholesale, B2B, SME, and
              Enterprise markets.
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "var(--text-muted)",
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              At Hub4Teq Inc, we don’t just deliver services—we engineer
              success. Partner with us to redefine your IT and telecom ecosystem
              with smarter, faster, and more integrated solutions.
            </p>
            <BtnPrimary onClick={() => navigate("contact")}>
              Work With Us →
            </BtnPrimary>
          </div>
          <div
            className="about-img-stack"
            style={{
              position: "relative",
              height: 460,
              animation: "scaleIn 0.6s 0.15s var(--ease-out) both",
              opacity: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "88%",
                height: "68%",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                alt="Team"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "50%",
                height: "42%",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                border: "4px solid var(--bg-page)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                alt="Office"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "32%",
                left: -20,
                background: "var(--green)",
                borderRadius: "var(--r-lg)",
                padding: "16px 20px",
                boxShadow: "var(--shadow-green)",
                animation: "float 4s ease-in-out infinite",
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
                Founded
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: 4,
                }}
              >
                Recently
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "var(--green-deep)", padding: "52px 5%" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                padding: "0 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px,4vw,50px)",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section style={{ padding: "88px 5%", background: "var(--bg-surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeading
            tag="Our Values"
            title="What drives us"
            center
            sub="Six principles that guide every decision, engagement, and relationship at hub4teq."
          />
          <div
            className="values-grid about-services-grid"
            style={{
              marginTop: 52,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",

              gap: 20,
            }}
          >
            {VALUES.map((v, i) => (
              <div
                key={i}
                style={{
                  padding: 26,
                  background: "var(--bg-page)",
                  borderRadius: "var(--r-xl)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 12 }}>{v.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section style={{ padding: "88px 5%", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeading
            tag="Leadership"
            title="The people behind hub4teq"
            center
          />
          <div
            className="team-grid"
            style={{
              marginTop: 52,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 20,
            }}
          >
            {TEAM.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--r-xl)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    height: 110,
                    background: `linear-gradient(135deg,${m.color},#0d3d1d)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      border: "3px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    {m.initials}
                  </div>
                </div>
                <div style={{ padding: "18px 20px 22px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {m.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--green)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      margin: "4px 0 10px",
                    }}
                  >
                    {m.role}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
