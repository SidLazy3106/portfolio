# Siddharth Chauhan — Portfolio

Personal portfolio and resume site. Built with **Next.js (App Router)**, hosted on **Vercel**, with contact-form messages stored in **Supabase** (free Postgres).

## Editing content

Almost everything lives in **`src/content/site.ts`** — name, links, about text, skills, timeline and projects.
Anything written as `[LIKE THIS]` shows on the site as a dashed gold placeholder until you replace it.

| To change… | Do this |
| --- | --- |
| Resume | Replace `public/resume.pdf` (keep the file name). Every download button and the PDF preview update automatically. |
| Project screenshots | Put images in `public/projects/<slug>/` and add them to that project's `gallery` as `{ src: "/projects/<slug>/shot.png", caption: "…" }`. |
| Project cover | Set `coverImage: "/projects/<slug>/cover.png"` on the project. |
| Project order / featured | Change `order` and `featured` on each project. |
| Live GitHub stats on a project | Set `githubRepoName` to the repo's name. |
| Profile photo | Add `public/me.jpg` and set `avatar: "/me.jpg"`. |

Push to `main` and Vercel redeploys in about a minute.

## How it works

- **GitHub repos** — fetched server-side from the GitHub REST API and cached for an hour (ISR), so visitors never hit the rate limit. If GitHub is unavailable, the section shows a link to the profile instead of empty cards. Add a `GITHUB_TOKEN` env var to raise the limit.
- **Contact form** — `POST /api/contact` validates input, blocks bots (honeypot field + minimum fill time), rejects cross-origin posts, rate-limits to 5 messages per visitor per hour (by hashed IP), then inserts into the `messages` table. The secret key never reaches the browser.
- **Security** — RLS is enabled on `messages` with no policies, so the public key can't read or write it. Security headers (HSTS, nosniff, frame-options, permissions policy) are set in `next.config.ts`.
- **Accessibility & motion** — semantic HTML, keyboard-operable gallery and menus, visible focus, and all animation disabled under `prefers-reduced-motion`.

## Reading your messages

Supabase dashboard → **Table Editor → messages**. Tick `is_read` as you reply.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in SUPABASE_URL and SUPABASE_SECRET_KEY
npm run dev
```

## One-time setup (already done for the live site)

1. Supabase: create a project → SQL Editor → run `supabase/schema.sql`.
2. Vercel: import this repo → add env vars `SUPABASE_URL` and `SUPABASE_SECRET_KEY` → deploy.
