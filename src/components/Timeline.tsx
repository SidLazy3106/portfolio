"use client";

import { useState } from "react";
import type { TimelineEntry } from "@/content/site";
import { Rich } from "./Rich";

const ORDER: TimelineEntry["type"][] = ["Education", "Work experience", "Internships", "Freelance work", "Certifications", "Milestones"];
const META: Record<TimelineEntry["type"], [string, string, string]> = {
  Education: ["ED", "edu", "Education"],
  "Work experience": ["WK", "int", "Work"],
  Internships: ["IN", "int", "Internship"],
  "Freelance work": ["FR", "int", "Freelance"],
  Certifications: ["CE", "cer", "Certification"],
  Milestones: ["MS", "edu", "Milestone"],
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  // Empty categories never get a tab.
  const present = ORDER.filter((t) => entries.some((e) => e.type === t));
  const [tab, setTab] = useState<string>("All");
  const shown = entries.filter((e) => tab === "All" || e.type === tab);

  return (
    <>
      <div className="tabs" role="group" aria-label="Filter timeline">
        {["All", ...present].map((t) => (
          <button key={t} type="button" className="fbtn" aria-pressed={tab === t} onClick={() => setTab(t)}>
            {t}
            <span className="fcount">{t === "All" ? entries.length : entries.filter((e) => e.type === t).length}</span>
          </button>
        ))}
      </div>
      <ol className="tl" style={{ listStyle: "none", margin: 0, padding: 0 }} key={tab}>
        {shown.map((e, i) => {
          const [glyph, cls, label] = META[e.type];
          return (
            <li className="tl-row" key={`${e.title}-${i}`} style={{ animationDelay: `${i * 50}ms` }}>
              <div className="tl-date"><Rich text={e.date} /></div>
              <div className="tl-rail"><span className={`tl-node ${cls}`} aria-hidden="true">{glyph}</span></div>
              <div className="tl-card">
                <div className="tl-mdate"><Rich text={e.date} /></div>
                <div className="tl-type">{label}</div>
                <h3 className="tl-title">{e.title}</h3>
                <div className="tl-org"><Rich text={e.org} /></div>
                {e.description && <p className="tl-desc">{e.description}</p>}
                {e.status && <span className="tl-status chip">{e.status}</span>}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
