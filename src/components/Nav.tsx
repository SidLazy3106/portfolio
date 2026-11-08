"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Close, Download, Menu, Moon, Sun } from "./Icons";

const SECTIONS = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["resume", "Resume"],
  ["contact", "Contact"],
] as const;

export function Nav({ onHome = true }: { onHome?: boolean }) {
  const [active, setActive] = useState<string>(onHome ? "home" : "projects");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
  }, []);

  // Scroll-spy: highlight the section currently under the nav.
  useEffect(() => {
    if (!onHome) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let cur = "home";
        for (const [id] of SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 160) cur = id;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = "contact";
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onHome]);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="nav-shell no-print">
      <nav className="nav" aria-label="Primary">
        <a className="brand" href={href("home")} aria-label={`${site.name} — home`}>
          <span className="brand-mark">{site.initials}</span>
          <span className="hf" style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>
            {site.firstName}
            <span style={{ color: "var(--accent2)" }}>.</span>
          </span>
        </a>
        <ul className="nav-links">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a
                className={`nav-link${active === id ? " is-active" : ""}`}
                href={href(id)}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setActive(id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="icon-btn"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Light theme" : "Dark theme"}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <a className="btn btn-primary btn-sm nav-resume" href={site.resumePdf} download={site.resumeFileName}>
          Resume <Download className="nudge-d" size={16} />
        </a>
        <button
          className="icon-btn nav-burger"
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <Close size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu" id="mobile-menu">
          {SECTIONS.map(([id, label], i) => (
            <a
              key={id}
              className={active === id ? "is-active" : ""}
              href={href(id)}
              onClick={() => {
                setActive(id);
                setOpen(false);
              }}
            >
              <span>{label}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>0x0{i}</span>
            </a>
          ))}
          <a href={site.resumePdf} download={site.resumeFileName} style={{ color: "var(--accent)" }}>
            <span>Download resume (PDF)</span>
            <Download size={16} />
          </a>
        </div>
      )}
    </header>
  );
}
