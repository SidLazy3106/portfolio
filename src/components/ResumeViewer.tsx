"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Download, Printer } from "./Icons";
import { Rich } from "./Rich";

/** Left: actions. Right: an HTML "quick view" (mobile-friendly, prints cleanly) and the real PDF. */
export function ResumeViewer() {
  const [view, setView] = useState<"quick" | "pdf">("quick");
  return (
    <div className="res-grid">
      <div className="no-print reveal">
        <div className="sec-head"><span className="sec-idx">0x05</span><span className="sec-rule" /><span>resume</span></div>
        <h2 className="h2">My Resume</h2>
        <p className="lead">Want the complete overview of my journey, skills, and experience?</p>
        <ul className="res-points">
          <li><span><Check14 /></span>One page, PDF, ready for recruiters</li>
          <li><span><Check14 /></span>Preview it right here before downloading</li>
          <li><span><Check14 /></span>Print-friendly — prints just the resume</li>
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a className="btn btn-primary" href={site.resumePdf} download={site.resumeFileName}>
            Download My Resume <Download className="nudge-d" />
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => { setView("quick"); setTimeout(() => window.print(), 50); }}>
            <Printer /> Print
          </button>
        </div>
      </div>

      <div className="paper-wrap reveal">
        <div className="paper-tabs no-print" role="group" aria-label="Resume view">
          <button type="button" className="fbtn" aria-pressed={view === "quick"} onClick={() => setView("quick")}>Quick view</button>
          <button type="button" className="fbtn" aria-pressed={view === "pdf"} onClick={() => setView("pdf")}>PDF</button>
        </div>
        {view === "pdf" ? (
          <iframe className="paper-frame" src={`${site.resumePdf}#view=FitH`} title="Resume PDF preview" loading="lazy" />
        ) : (
          <article className="paper" data-lenis-prevent aria-label="Resume quick view">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p className="hf" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>{site.name}</p>
                <p style={{ margin: "4px 0 0", color: "#4A3FC4", fontWeight: 600, letterSpacing: "0.06em", fontSize: 11 }}>{site.role.toUpperCase()}</p>
              </div>
              <p style={{ margin: 0, fontSize: 11, color: "#555B66", textAlign: "right" }}>
                {site.location}<br />{site.email}<br />github.com/{site.githubUser}
              </p>
            </div>
            <h3>Profile</h3>
            <p>Curious, highly motivated B.Tech Cybersecurity student at SRMIST Delhi NCR with strong programming proficiency in Python, C and C++. Skilled in root cause analysis and diagnostic troubleshooting; communicates well in English and Hindi and works effectively alone or in teams.</p>
            <h3>Education</h3>
            <div className="rrow"><span>SRM Institute of Science and Technology (SRMIST)</span><span>2024 – 2028 (Expected)</span></div>
            <p>B.Tech, Computer Science &amp; Engineering — Specialization: Cybersecurity</p>
            <div className="rrow"><span>Amity International School (AISV-6)</span><span>2010 – 2024</span></div>
            <p>Nursery to Class 12</p>
            <h3>Skills</h3>
            <p><b>Programming:</b> Python, C, C++ · <b>Core:</b> DBMS, AI, Multi-Factor Authentication, Packet Sniffing &amp; Tracing · <b>Analysis &amp; Security:</b> Root Cause Analysis, System Diagnostics, TCP/IP, UDP, HTTP, Anomaly Detection · <b>Tools:</b> Linux (Ubuntu/Kali), Wireshark, VS Code, Git/GitHub</p>
            <h3>Key Projects</h3>
            <div className="rrow"><span>Modular MFA Verification Platform (KYC)</span><span>Python · Web</span></div>
            <ul>
              <li>Standalone MFA verification UI built as an adaptable authentication layer for external web apps.</li>
              <li>Time-based verification workflows to prevent unauthorized access and credential misuse.</li>
            </ul>
            <div className="rrow"><span>Network Packet Tracer &amp; Sniffer Tool (In Progress)</span><span>C / C++ · Python</span></div>
            <ul>
              <li>Real-time packet capture and tracing at the header level, with IP/TCP/UDP decoders.</li>
              <li>Root cause analysis of dropped packets, latency spikes and anomalies.</li>
            </ul>
            <h3>Experience</h3>
            <div className="rrow"><span>Intern — Aim of Care Youth Empowerment Foundation</span><span>Aug 2026</span></div>
            <h3>Certifications</h3>
            <div className="rrow"><span>Database Management Systems (DBMS)</span><span>Completed</span></div>
            <div className="rrow"><span>Artificial Intelligence (AI)</span><span>Completed</span></div>
            <div className="rrow"><span>ISC2 Certified in Cybersecurity (CC)</span><span>In progress</span></div>
          </article>
        )}
      </div>
    </div>
  );
}

const Check14 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
);
