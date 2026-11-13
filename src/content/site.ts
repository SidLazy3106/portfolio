/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to change text, links, skills, experience and
 *  projects. Anything in [SQUARE BRACKETS] is a placeholder that
 *  shows on the site as a dashed gold label until you replace it.
 * ─────────────────────────────────────────────────────────────
 */

export type Category = "Web Development" | "Applications" | "Experiments" | "Tools" | "Other";
export type CoverArt = "mfa" | "packet" | "securex";

export interface Screenshot {
  /** Path under /public, e.g. "/projects/mfa/login.png" — or leave out to use the illustration. */
  src?: string;
  /** Built-in illustration to show when there is no screenshot yet. */
  art?: { kind: CoverArt; variant: "cover" | "detail" | "slot" };
  caption: string;
  width?: number;
  height?: number;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  status?: string;
  featured?: boolean;
  /** Lower numbers show first. */
  order: number;
  short: string;
  cover: CoverArt;
  /** Optional real cover image under /public; overrides the illustration. */
  coverImage?: string;
  stack: string[];
  /** Full repo URL. Leave empty to link to your GitHub profile. */
  repo?: string;
  demo?: string;
  team?: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  learned: string;
  gallery: Screenshot[];
  /** Name of the matching GitHub repo, so live stars/forks/updated date can be shown. */
  githubRepoName?: string;
}

export interface TimelineEntry {
  type: "Education" | "Work experience" | "Internships" | "Freelance work" | "Certifications" | "Milestones";
  date: string;
  title: string;
  org: string;
  description?: string;
  status?: string;
}

export const site = {
  name: "Siddharth Chauhan",
  firstName: "Siddharth",
  initials: "sc",
  role: "B.Tech Cybersecurity Undergraduate",
  location: "Delhi NCR, India",
  email: "siddharthchauhan607@gmail.com",
  githubUser: "SidLazy3106",
  github: "https://github.com/SidLazy3106",
  linkedin: "https://www.linkedin.com/in/Siddharthchauhan-75b6b526a/",
  resumePdf: "/resume.pdf",
  resumeFileName: "Siddharth_Chauhan_Resume.pdf",
  /** Profile picture under /public (e.g. "/me.jpg"). Leave empty to hide it. */
  avatar: "",

  hero: {
    eyebrow: "HELLO, WORLD! I'M",
    headline: "Building Digital Experiences That Make an Impact.",
    description:
      "I'm a cybersecurity undergraduate who builds things to understand them — authentication layers, packet tracers and security tools — turning ideas into software that actually works.",
    availability: "Open to exciting opportunities and collaborations.",
    roles: ["cybersecurity undergrad", "Python · C · C++ programmer", "packet-level problem solver", "root-cause hunter"],
    floatingTech: ["Python", "C / C++", "Wireshark", "Kali Linux"],
  },

  about: {
    intro:
      "I'm Siddharth — a B.Tech Computer Science student specialising in cybersecurity at SRMIST, Delhi NCR. I write Python, C and C++, and I like knowing how systems behave at the level of a single packet.",
    strengths:
      "Root-cause analysis and diagnostic troubleshooting are what I consider my strongest skills: tracing a fault back to where it actually started instead of patching the symptom.",
    blocks: [
      { kicker: "how I got here", text: "I started my B.Tech in Computer Science, specialising in cybersecurity, in 2024. Networks pulled me in fastest: every connection is a stream of headers and flags that you can read for yourself. That curiosity turned into projects — a multi-factor verification module, a packet analyzer, and a desktop security suite I built with two teammates." },
      { kicker: "what keeps me building", text: "I like problems where the symptom is far from the cause: a connection that stalls, a login that can be abused, a file that looks harmless. I want to build security tools that show their evidence and explain what they found, so the person using them can trust the result and act on it." },
      {
        kicker: "how I learn",
        text: "I learn by building. Right now that means a packet tracer written close to the metal in C/C++, decoding IP, TCP and UDP headers by hand. I work comfortably on my own and in teams — Secure X is a three-person build.",
      },
      { kicker: "off the keyboard", text: "Outside code I run Cypher, my own streetwear label, and I helped run a food-distribution drive with Aim of Care Youth Empowerment Foundation." },
    ],
    stats: [
      { value: "2024", label: "Started B.Tech in Cybersecurity" },
      { value: "3", label: "Programming languages" },
      { value: "3", label: "Projects built or in progress" },
      { value: "2", label: "Certifications completed" },
    ],
  },

  skills: [
    {
      name: "Programming Languages",
      icon: "code",
      tone: "accent",
      items: [
        { mono: "Py", name: "Python", note: "Scripting, tooling, web logic" },
        { mono: "C", name: "C", note: "Systems & low-level work" },
        { mono: "C++", name: "C++", note: "Packet decoding, DSA" },
      ],
    },
    {
      name: "Security & Networking",
      icon: "shield",
      tone: "accent2",
      items: [
        { mono: "MFA", name: "Multi-factor auth", note: "Time-based verification" },
        { mono: "PKT", name: "Packet sniffing", note: "Capture & tracing" },
        { mono: "TCP", name: "Network protocols", note: "TCP/IP · UDP · HTTP" },
        { mono: "ANM", name: "Anomaly detection", note: "Spotting the odd packet" },
      ],
    },
    {
      name: "Analysis & Core CS",
      icon: "graph",
      tone: "hl",
      items: [
        { mono: "RCA", name: "Root cause analysis", note: "Fault to origin" },
        { mono: "DX", name: "System diagnostics", note: "Troubleshooting" },
        { mono: "DB", name: "DBMS", note: "Certified" },
        { mono: "AI", name: "AI fundamentals", note: "Certified" },
      ],
    },
    {
      name: "Tools & Environments",
      icon: "terminal",
      tone: "text",
      items: [
        { mono: "LNX", name: "Linux", note: "Ubuntu · Kali" },
        { mono: "WS", name: "Wireshark", note: "Traffic analysis" },
        { mono: "VSC", name: "VS Code", note: "Daily editor" },
        { mono: "GIT", name: "Git / GitHub", note: "Version control" },
      ],
    },
  ] as const,

  coursework: ["DBMS", "Network Security", "Operating Systems", "Cryptography", "DSA", "Computer Networks", "System Programming"],
  spokenLanguages: "English · Hindi",

  timeline: [
    {
      type: "Certifications",
      date: "In progress",
      title: "ISC2 Certified in Cybersecurity (CC)",
      org: "ISC2",
      description: "Enrolled and preparing alongside university coursework.",
      status: "In progress",
    },
    {
      type: "Internships",
      date: "Aug 2026",
      title: "Intern",
      org: "Aim of Care Youth Empowerment Foundation",
      description: "One-month internship with a New Delhi youth-empowerment NGO, including a community food-distribution drive.",
      status: "Completed · certified",
    },
    { type: "Certifications", date: "—", title: "Database Management Systems (DBMS)", org: "", status: "Completed" },
    { type: "Certifications", date: "—", title: "Artificial Intelligence (AI)", org: "", status: "Completed" },
    {
      type: "Education",
      date: "2024 — 2028",
      title: "B.Tech, Computer Science & Engineering (Cybersecurity)",
      org: "SRM Institute of Science and Technology, Delhi NCR",
      description: "Coursework: DBMS, Network Security, Operating Systems, Cryptography, Data Structures & Algorithms, Computer Networks, System Programming.",
      status: "Expected 2028",
    },
    { type: "Education", date: "2010 — 2024", title: "Nursery to Class 12", org: "Amity International School (AISV-6)", status: "Completed" },
  ] satisfies TimelineEntry[],
};

export const projects: Project[] = [
  {
    slug: "mfa-verification-platform",
    title: "Modular MFA Verification Platform",
    category: "Web Development",
    status: "Built",
    featured: true,
    order: 1,
    cover: "mfa",
    githubRepoName: "KYC-Updated",
    short:
      "A standalone multi-factor verification interface (KYC) built to drop into other web apps as an adaptable authentication layer, with time-based verification to stop credential misuse.",
    stack: ["Python", "Web architecture", "Time-based verification", "MFA"],
    repo: "",
    overview:
      "A modular MFA and KYC verification platform: a self-contained verification UI that external web applications can plug in as their identity-check layer.",
    problem:
      "A password alone is easy to steal and reuse. Adding strong identity checks to an existing web app usually means rewriting its login flow, so many apps never do it.",
    solution:
      "I built the verification step as its own module — a clean UI plus secure verification logic — so other platforms can integrate it instead of rebuilding authentication. Time-based workflows make each code short-lived.",
    features: [
      "Standalone verification UI that works as an authentication layer for external web apps",
      "Time-based verification workflows that block unauthorized access and credential misuse",
      "Clean, focused interface designed to integrate across different online platforms",
    ],
    challenges: "Keeping a code short-lived without making it frustrating: the window has to be long enough for a real user and short enough that a stolen code is useless.",
    learned: "Expiry, retries and failure paths decide whether authentication is safe, not the happy path. Building it as a separate module also taught me to design a clean interface so another app can adopt it without rewriting its login.",
    gallery: [
      { art: { kind: "mfa", variant: "cover" }, caption: "Verification screen — six-digit code with a countdown window (illustration)." },
      { art: { kind: "mfa", variant: "detail" }, caption: "How the module sits between a web app and access (illustration)." },
      { art: { kind: "mfa", variant: "slot" }, caption: "Screenshot slot — add a real capture in src/content/site.ts." },
    ],
  },
  {
    slug: "packet-tracer",
    title: "Network Packet Tracer & Sniffer",
    category: "Tools",
    status: "In progress",
    order: 2,
    cover: "packet",
    short:
      "A low-level capture utility that inspects live traffic at the header level, decodes IP, TCP and UDP, and helps trace where packets drop and latency spikes start.",
    stack: ["C", "C++", "Python", "TCP/IP · UDP"],
    repo: "",
    overview: "A packet capture and tracing tool that reads network traffic in real time and decodes it header by header.",
    problem:
      "When a connection is slow or packets go missing, the symptom shows up far from the cause. Finding the origin means looking at the traffic itself.",
    solution:
      "I am writing protocol decoders for IP, TCP and UDP that expose flags and payload structure, then applying root-cause analysis to pin down dropped packets, latency spikes and anomalies.",
    features: [
      "Real-time capture and inspection of traffic at the header level",
      "Protocol decoders for IP, TCP and UDP — flags, payload structure, transmission inconsistencies",
      "Root-cause analysis of dropped packets, latency spikes and security anomalies",
    ],
    challenges: "Reading headers byte by byte without trusting them: lengths, flags and checksums have to be validated before they are decoded, and live capture depends on driver permissions that differ from one machine to the next.",
    learned: "The packets are the evidence. A good tool separates what it observed from what it only suspects, and says where its conclusions stop.",
    gallery: [
      { art: { kind: "packet", variant: "cover" }, caption: "Live capture with a flagged drop (illustration)." },
      { art: { kind: "packet", variant: "detail" }, caption: "Decoded header view (illustration)." },
      { art: { kind: "packet", variant: "slot" }, caption: "Screenshot slot — add a real capture in src/content/site.ts." },
    ],
  },
  {
    slug: "secure-x",
    title: "Secure X — Desktop Security Suite",
    category: "Applications",
    status: "In progress",
    order: 3,
    cover: "securex",
    githubRepoName: "Anti-virus-software",
    short: "A team-built PC application that combines antivirus, browser safety and in-depth security checks in one desktop tool.",
    stack: ["Desktop app", "Antivirus", "Browser safety", "Python"],
    repo: "",
    team: "Krishiv Bhardwaj, Siddharth Chauhan, Rajat Rai",
    overview:
      "Secure X is PC software that acts as an antivirus, a browser-safety tool and an in-depth security app, built by a three-person team.",
    problem: "Everyday users juggle separate tools for malware, unsafe websites and system checks — or skip them entirely.",
    solution: "One desktop application that brings those three layers together.",
    features: ["Antivirus protection for the PC", "Browser-safety checks", "In-depth security analysis of the system"],
    challenges: "Catching real threats without crying wolf: every detection has to carry a reason, and a signed program should not be flagged just for how it is built, so each rule is measured against clean files for false positives.",
    learned: "Keeping the desktop scanner and the browser extension giving identical verdicts takes shared rules and tests, and building in a team of three makes that discipline necessary.",
    gallery: [
      { art: { kind: "securex", variant: "cover" }, caption: "Secure X dashboard concept (illustration)." },
      { art: { kind: "securex", variant: "detail" }, caption: "The three protection layers (illustration)." },
      { art: { kind: "securex", variant: "slot" }, caption: "Screenshot slot — add a real capture in src/content/site.ts." },
    ],
  },
];

export const projectCategories = ["All Projects", "Web Development", "Applications", "Experiments", "Tools", "Other"] as const;

export const sortedProjects = () => [...projects].sort((a, b) => a.order - b.order);
export const isPlaceholder = (t?: string) => !!t && /\[[A-Z]/.test(t);
