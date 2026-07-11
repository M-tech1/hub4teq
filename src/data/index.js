// ═══════════════════════════════════════════
// hub4teq — Content Data
// ═══════════════════════════════════════════

export const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "400+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Coverage" },
];

export const SERVICES = [
  {
    id: "managed-it",
    icon: "⚙️",
    title: "Managed IT Services",
    tagline: "Always on. Always optimised.",
    desc: "End-to-end management of your IT infrastructure, networks, servers, endpoints, and security monitoring, so your team can focus on what matters.",
    features: [
      "Network Management",
      "Endpoint Protection",
      "Help Desk 24/7",
      "SLA-backed Uptime",
    ],
    page: "services",
    color: "#238b45",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  },
  {
    id: "cloud",
    icon: "☁️",
    title: "Cloud Solutions",
    tagline: "Scale without limits.",
    desc: "Migrate, architect, and optimise workloads across AWS, Azure, and GCP. From lift-and-shift to cloud-native transformation.",
    features: [
      "Cloud Migration",
      "Multi-cloud Strategy",
      "Cost Optimisation",
      "DevOps & CI/CD",
    ],
    page: "services",
    color: "#1a6e38",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  },
  {
    id: "cybersecurity",
    icon: "🛡️",
    title: "Cybersecurity",
    tagline: "Protect what matters most.",
    desc: "Comprehensive security frameworks including penetration testing, threat intelligence, SIEM, and compliance management for regulated industries.",
    features: [
      "Threat Detection",
      "Pen Testing",
      "SIEM / SOC",
      "Compliance (ISO, SOC2)",
    ],
    page: "services",
    color: "#145c2c",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80",
  },
  {
    id: "connectivity",
    icon: "🌐",
    title: "Connectivity & Networks",
    tagline: "Faster. More reliable. Everywhere.",
    desc: "Enterprise-grade networking solutions, SD-WAN, fibre, MPLS, and VoIP infrastructure designed for resilience and performance.",
    features: [
      "SD-WAN",
      "VoIP & UCaaS",
      "Fibre Leased Lines",
      "Network Monitoring",
    ],
    page: "services",
    color: "#0d3d1d",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    id: "consulting",
    icon: "💡",
    title: "IT Consulting",
    tagline: "Strategy that moves the needle.",
    desc: "Fractional CTO services, digital transformation roadmaps, and technology audits for SMEs and corporate organisations seeking competitive edge.",
    features: [
      "Digital Transformation",
      "Tech Due Diligence",
      "Vendor Selection",
      "Fractional CTO",
    ],
    page: "consulting",
    color: "#238b45",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    id: "helpdesk",
    icon: "🎧",
    title: "IT Help Desk",
    tagline: "Support when you need it most.",
    desc: "Round-the-clock remote and on-site support for your users. Fast response times, ticketing system, and dedicated account management.",
    features: [
      "24/7 Remote Support",
      "On-site Technicians",
      "Ticket Management",
      "User Training",
    ],
    page: "services",
    color: "#2fa852",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
  },
];

export const TESTIMONIALS = [
  {
    name: "James Kowalski",
    role: "CTO, Primus Group",
    text: "hub4teq transformed our entire IT landscape. The migration to cloud cut our costs by 40% and the support team is genuinely outstanding, available whenever we need them.",
    avatar: "JK",
    color: "#238b45",
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Director, NorthWest Energy",
    text: "Their cybersecurity team identified vulnerabilities we had no idea existed. We passed our SOC 2 audit on the first attempt. Exceptional expertise and professionalism.",
    avatar: "SM",
    color: "#145c2c",
  },
  {
    name: "David Okafor",
    role: "CEO, NexaRetail Ltd",
    text: "From the initial IT audit to full infrastructure overhaul, hub4teq was a true partner. We passed our ISO 27001 audit on the first attempt thanks to their team.",
    avatar: "DO",
    color: "#2fa852",
  },
];

export const CONSULTING_OFFERINGS = [
  {
    number: "01",
    title: "Digital Transformation",
    desc: "Comprehensive roadmaps to modernise legacy systems, automate workflows, and build scalable digital operations.",
  },
  {
    number: "02",
    title: "Technology Audits",
    desc: "Thorough assessment of your current IT estate — infrastructure, security posture, software licencing, and spend.",
  },
  {
    number: "03",
    title: "Vendor & Procurement",
    desc: "Independent guidance on technology selection and procurement — we work for you, not the vendors.",
  },
  {
    number: "04",
    title: "Fractional CTO",
    desc: "Senior technology leadership on demand for SMEs that need strategic direction without a full-time hire.",
  },
  {
    number: "05",
    title: "Project Delivery",
    desc: "End-to-end IT project management using PRINCE2 and Agile methodologies for on-time, on-budget results.",
  },
  {
    number: "06",
    title: "Compliance Advisory",
    desc: "Navigate GDPR, ISO 27001, SOC 2, and PIPEDA requirements with our dedicated compliance specialists.",
  },
];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "consulting", label: "Consulting" },
  { id: "about", label: "About" },
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
];

export const TICKER_ITEMS = [
  "Managed IT Services",
  "Cloud Solutions",
  "Cybersecurity",
  "IT Consulting",
  "Connectivity & Networks",
  "Digital Transformation",
  "Endpoint Protection",
  "IT Help Desk",
];

export const CONTACT_INFO = {
  address: "330 St. Mary Avenue, Suite 300, Winnipeg, MB R3C 3Z5",
  phone: "+12042021791",
  email: "info@hub4teq.com",
  hours: "Mon–Fri: 8am – 6pm WAT\n24/7 Support for managed clients",
};
