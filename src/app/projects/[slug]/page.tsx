import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, sortedProjects } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Rich } from "@/components/Rich";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = sortedProjects().find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.short,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title} · ${site.name}`, description: p.short, url: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = sortedProjects();
  const idx = all.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = all[idx];
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <Nav onHome={false} />
      <main id="main" className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/#projects"><ArrowLeft size={16} /> All projects</Link>
          <span aria-hidden="true">/</span>
          <span>{p.category}</span>
        </nav>
        <div className="pmeta">
          <b>{String(p.order).padStart(2, "0")}</b>
          {p.status && (<><span>·</span><span>{p.status}</span></>)}
          {p.featured && (<><span>·</span><span style={{ color: "var(--hl)" }}>★ Featured</span></>)}
        </div>
        <h1 className="p-title">{p.title}</h1>
        <p className="lead" style={{ marginBottom: 36, maxWidth: 760 }}>{p.short}</p>

        <Gallery items={p.gallery} title={p.title} />

        <div className="p-cols">
          <article>
            <div className="p-sec"><h2>Project overview</h2><p style={{ fontSize: 19, lineHeight: 1.55 }}><Rich text={p.overview} /></p></div>
            <div className="p-sec"><h2>The problem</h2><p className="muted"><Rich text={p.problem} /></p></div>
            <div className="p-sec"><h2>My solution</h2><p className="muted"><Rich text={p.solution} /></p></div>
            <div className="p-sec">
              <h2>Key features</h2>
              <ul className="p-list">{p.features.map((f) => <li key={f}><span><Rich text={f} /></span></li>)}</ul>
            </div>
            <div className="p-sec"><h2>Challenges faced</h2><p><Rich text={p.challenges} /></p></div>
            <div className="p-sec"><h2>What I learned</h2><p><Rich text={p.learned} /></p></div>
          </article>
          <aside className="p-side">
            <div className="side-card">
              <h3>Technology stack</h3>
              <div className="tags">{p.stack.map((t) => <span key={t} className={`chip${/^\[/.test(t) ? " ph" : ""}`}>{t}</span>)}</div>
            </div>
            {p.team && <div className="side-card"><h3>Team</h3><p style={{ margin: 0, fontSize: 15 }}>{p.team}</p></div>}
            {p.status && (
              <div className="side-card">
                <h3>Status</h3>
                <p style={{ margin: 0, fontSize: 15, display: "flex", alignItems: "center", gap: 10 }}><span className="pulse" aria-hidden="true" />{p.status}</p>
              </div>
            )}
            <div className="side-card">
              <h3>Links</h3>
              <div style={{ display: "grid", gap: 10 }}>
                <a className="btn btn-ghost btn-sm" href={p.repo || site.github} target="_blank" rel="noopener noreferrer" style={{ justifyContent: "flex-start" }}>
                  <Github size={16} /> {p.repo ? "GitHub repository" : "GitHub profile"}
                </a>
                {p.demo && (
                  <a className="btn btn-primary btn-sm" href={p.demo} target="_blank" rel="noopener noreferrer" style={{ justifyContent: "flex-start" }}>
                    Live demonstration <ArrowUpRight className="nudge" size={16} />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {next.slug !== p.slug && (
          <Link className="p-next" href={`/projects/${next.slug}`}>
            <span>
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>NEXT PROJECT</span>
              <span className="hf" style={{ fontSize: 24, fontWeight: 600 }}>{next.title}</span>
            </span>
            <ArrowRight size={22} />
          </Link>
        )}
      </main>
      <Footer topHref="#main" />
    </>
  );
}
