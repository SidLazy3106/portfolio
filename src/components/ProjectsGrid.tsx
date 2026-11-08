"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projectCategories, site, type Project } from "@/content/site";
import { ProjectArt } from "./art/ProjectArt";
import { ArrowRight, Github, Star } from "./Icons";

export type ProjectWithStats = Project & { live?: { stars: number; forks: number; updatedAt: string } | null };

export function ProjectsGrid({ projects }: { projects: ProjectWithStats[] }) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All Projects");

  const visible = useMemo(
    () => projects.filter((p) => filter === "All Projects" || p.category === filter),
    [projects, filter],
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {projectCategories.map((c) => {
          const count = c === "All Projects" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button key={c} type="button" className="fbtn" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
              <span className="fcount">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="pgrid" key={filter}>
        {visible.map((p, idx) => {
          const featured = p.featured && filter === "All Projects";
          return (
            <article key={p.slug} className={`pcard${featured ? " is-featured" : ""}`} style={{ animationDelay: `${idx * 60}ms` }}>
              <div className="pcover">
                <div className="pcover-in">
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} />
                  ) : (
                    <ProjectArt kind={p.cover} variant="cover" decorative />
                  )}
                </div>
                <span className="badges">
                  {featured && <span className="badge gold">★ Featured</span>}
                  {p.status && <span className="badge teal">{p.status}</span>}
                </span>
              </div>
              <div className="pbody">
                <div className="pmeta">
                  <b>{String(p.order).padStart(2, "0")}</b>
                  <span>/</span>
                  <span>{p.category}</span>
                  {p.live && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      · <Star size={13} /> {p.live.stars}
                    </span>
                  )}
                </div>
                <h3 className="ptitle">
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="pdesc">{p.short}</p>
                <div className="tags">
                  {p.stack.map((t) => (
                    <span key={t} className={`chip${/^\[/.test(t) ? " ph" : ""}`}>{t}</span>
                  ))}
                </div>
                <div className="pactions">
                  <Link className="btn btn-primary btn-sm" href={`/projects/${p.slug}`} aria-label={`Case study: ${p.title}`}>
                    Case study <ArrowRight className="nudge" size={16} />
                  </Link>
                  <a className="btn btn-ghost btn-sm" href={p.repo || site.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}>
                    <Github size={16} /> GitHub
                  </a>
                </div>
              </div>
            </article>
          );
        })}
        {visible.length === 0 && (
          <div className="empty">
            <p className="hf" style={{ fontSize: 22, fontWeight: 600, color: "var(--text)", margin: "0 0 6px" }}>
              Nothing in “{filter}” yet.
            </p>
            <p style={{ margin: "0 0 18px" }}>New work lands here as it ships.</p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilter("All Projects")}>
              Show all projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}
