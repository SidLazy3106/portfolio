import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: [2, 100], email: [5, 200], subject: [3, 150], message: [20, 5000] } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_PER_HOUR = 5;
const MIN_FILL_MS = 3000;

type Field = keyof typeof LIMITS;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function supabaseHeaders(key: string): Record<string, string> {
  const h: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  // Legacy JWT keys also need a Bearer header; new sb_secret_ keys only use apikey.
  if (key.startsWith("eyJ")) h.Authorization = `Bearer ${key}`;
  return h;
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return json(503, { ok: false, error: "The contact form isn't connected yet. Please email me directly." });
  }

  // Only accept same-origin posts.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: "Request blocked." });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  // Spam traps: hidden honeypot field and a minimum time on the form.
  const startedAt = Number(body.startedAt);
  if ((typeof body.company === "string" && body.company.trim() !== "") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json(400, { ok: false, error: "That was a little quick — please wait a moment and try again." });
  }

  const clean: Record<Field, string> = { name: "", email: "", subject: "", message: "" };
  const errors: Partial<Record<Field, string>> = {};
  (Object.keys(LIMITS) as Field[]).forEach((f) => {
    const v = typeof body[f] === "string" ? (body[f] as string).trim() : "";
    const [min, max] = LIMITS[f];
    clean[f] = v;
    if (v.length < min || v.length > max) errors[f] = `Must be ${min}–${max} characters.`;
  });
  if (!errors.email && !EMAIL_RE.test(clean.email)) errors.email = "That email address doesn't look right.";
  if (Object.keys(errors).length) return json(422, { ok: false, error: "A few fields need attention.", errors });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = createHash("sha256").update(`${ip}:${key.slice(-12)}`).digest("hex").slice(0, 32);
  const headers = supabaseHeaders(key);

  try {
    // Rate limit: at most MAX_PER_HOUR messages per visitor per hour.
    const since = new Date(Date.now() - 3600_000).toISOString();
    const countRes = await fetch(
      `${url}/rest/v1/messages?select=id&ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(since)}`,
      { headers: { ...headers, Prefer: "count=exact", Range: "0-0" }, cache: "no-store" },
    );
    const total = Number(countRes.headers.get("content-range")?.split("/")[1] ?? 0);
    if (total >= MAX_PER_HOUR) {
      return json(429, { ok: false, error: "You've sent a few messages already — please try again later." });
    }

    const insert = await fetch(`${url}/rest/v1/messages`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ ...clean, ip_hash: ipHash, user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300) }),
      cache: "no-store",
    });
    if (!insert.ok) {
      console.error("contact insert failed", insert.status, await insert.text());
      return json(502, { ok: false, error: "Couldn't save your message. Please email me directly." });
    }
    return json(200, { ok: true });
  } catch (e) {
    console.error("contact error", e);
    return json(502, { ok: false, error: "Couldn't reach the server. Please email me directly." });
  }
}
