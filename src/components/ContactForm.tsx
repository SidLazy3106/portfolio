"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Check, Send } from "./Icons";

type Field = "name" | "email" | "subject" | "message";
const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: typeof EMPTY) {
  const e: Partial<Record<Field, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please tell me your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "That email address doesn’t look right.";
  if (f.subject.trim().length < 3) e.subject = "Add a short subject.";
  if (f.message.trim().length < 20) e.message = "A little more detail, please — at least 20 characters.";
  return e;
}

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k in errors) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setState("error");
      setMsg("A few fields need attention.");
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("sent");
        setForm(EMPTY);
      } else {
        if (data.errors) setErrors(data.errors);
        setState("error");
        setMsg(data.error || "Something went wrong. Please email me directly.");
      }
    } catch {
      setState("error");
      setMsg("Couldn't reach the server. Please email me directly.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field = (k: Field, label: string, type = "text", auto?: string) => (
    <div className={`field${errors[k] ? " has-err" : ""}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      {k === "message" ? (
        <textarea id={`f-${k}`} name={k} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={`e-${k} c-msg`} maxLength={5000} required />
      ) : (
        <input id={`f-${k}`} name={k} type={type} autoComplete={auto} value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={`e-${k}`} maxLength={k === "email" ? 200 : 150} required />
      )}
      <div style={{ display: "flex", gap: 12 }}>
        {errors[k] && <p className="err" id={`e-${k}`}>{errors[k]}</p>}
        {k === "message" && <span className="hint" id="c-msg">{form.message.trim().length} / 20+ chars</span>}
      </div>
    </div>
  );

  return (
    <form className="form reveal" noValidate onSubmit={onSubmit} aria-labelledby="form-title">
      <h3 id="form-title" className="hf" style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Send a message</h3>
      <p className="muted" style={{ fontSize: 14, margin: "0 0 24px" }}>It lands straight in my inbox. I usually reply within a few days.</p>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" style={{ outline: "none" }}>
        {state === "sent" && (
          <div className="notice ok" role="status">
            <Check size={20} style={{ color: "var(--accent2)", flex: "none", marginTop: 1 }} />
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 600 }}>Message sent — thank you!</p>
              <p className="muted" style={{ margin: 0 }}>I&apos;ll get back to you soon.</p>
            </div>
          </div>
        )}
        {state === "error" && (
          <div className="notice bad" role="alert">
            <span>
              {msg}{" "}
              {!Object.keys(errors).some((k) => errors[k as Field]) && (
                <a href={`mailto:${site.email}`}>{site.email}</a>
              )}
            </span>
          </div>
        )}
      </div>

      <div className="frow">
        {field("name", "Name", "text", "name")}
        {field("email", "Email", "email", "email")}
      </div>
      {field("subject", "Subject")}
      {field("message", "Message")}

      <div className="hp" aria-hidden="true">
        <label htmlFor="f-company">Leave this field empty</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={state === "sending"}>
        {state === "sending" ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : (<>Send message <Send className="nudge" /></>)}
      </button>
    </form>
  );
}
