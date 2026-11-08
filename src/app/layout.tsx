import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/content/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const description =
  "Siddharth Chauhan — B.Tech CSE (Cybersecurity) student at SRMIST Delhi NCR. Projects in authentication, packet analysis and desktop security, plus skills, experience and resume.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} — Cybersecurity Undergraduate`, template: `%s · ${site.name}` },
  description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.github }],
  keywords: ["Siddharth Chauhan", "cybersecurity", "portfolio", "SRMIST", "Python", "C++", "MFA", "packet sniffer", "resume"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: `${site.name} — Portfolio`, description, siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: `${site.name} — Portfolio`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
  ],
};

// Sets the saved theme before paint so there's no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: siteUrl,
  sameAs: [site.github, site.linkedin],
  alumniOf: "SRM Institute of Science and Technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
