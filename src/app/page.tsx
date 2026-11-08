import { site, sortedProjects } from "@/content/site";
import { getRepos, type Repo } from "@/lib/github";
import { Nav } from "@/components/Nav";
import { ParallaxHero } from "@/components/ParallaxHero";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { Typer } from "@/components/Typer";
import { Rich } from "@/components/Rich";
import { ProjectsGrid, type ProjectWithStats } from "@/components/ProjectsGrid";
import { Timeline } from "@/components/Timeline";
import { ResumeViewer } from "@/components/ResumeViewer";
import { ContactForm } from "@/components/ContactForm";
import { ContactArt, DeskArt } from "@/components/art/SceneArt";
import { Bamboo, CherryBranch, GardenScene, Lantern, Mountains, Roofline, RockGarden, SamuraiPoster, SunsetLandscape } from "@/components/art/Japan";
import { InkSlash } from "@/components/InkSlash";
import { ShojiDoors } from "@/components/ShojiDoors";
import { Petals } from "@/components/Petals";
import { ArrowRight, ArrowUpRight, Clock, Code, Download, Fork, Github, Graph, Linkedin, Mail, Shield, Star, Terminal } from "@/components/Icons";

export const revalidate = 3600; // re-fetch GitHub data at most hourly

const SKILL_ICONS = { code: Code, shield: Shield, graph: Graph, terminal: Terminal };
const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5", C: "#8B8B8B", "C++": "#F34B7D", JavaScript: "#F1E05A", TypeScript: "#3178C6",
  HTML: "#E34C26", CSS: "#663399", Shell: "#89E051", Java: "#B07219", Go: "#00ADD8", Rust: "#DEA584",
};

function SectionHead({ idx, tag, title, lead }: { idx: string; tag: string; title: string; lead?: string }) {
  return (
    <div className="reveal">
      <div className="sec-head"><span className="sec-idx">{idx}</span><span className="sec-rule" /><span>{tag}</span></div>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default async function Home() {
  const gh = await getRepos();
  const byName = new Map(gh.repos.map((r) => [r.name.toLowerCase(), r]));
  const projects: ProjectWithStats[] = sortedProjects().map((p) => {
    const r = p.githubRepoName ? byName.get(p.githubRepoName.toLowerCase()) : undefined;
    return { ...p, repo: p.repo || r?.url || "", live: r ? { stars: r.stars, forks: r.forks, updatedAt: r.updatedAt } : null };
  });
  const linked = new Set(projects.map((p) => p.githubRepoName?.toLowerCase()).filter(Boolean));
  const repos: Repo[] = gh.repos.filter((r) => !linked.has(r.name.toLowerCase())).slice(0, 6);

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="main">
        {/* HERO — "The Samurai Entrance". Layers: 1 mountains, 2 glow + pagoda/torii rooflines, 3 copy + samurai, 4 sakura branch */}
        <ParallaxHero id="home" className="hero no-print" aria-label="Introduction">
          <div className="hero-bg" data-parallax-layer="1" aria-hidden="true"><Mountains /></div>
          <div className="hero-mid" data-parallax-layer="2" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-roof"><Roofline /></div>
          </div>
          <Petals count={9} seed={7} />
          <div className="wrap">
            <div className="hero-grid">
              <div data-parallax-layer="3">
                {site.avatar && <img className="avatar" src={site.avatar} alt={`Photo of ${site.name}`} width={64} height={64} />}
                <div className="eyebrow">{site.hero.eyebrow}</div>
                <h1 className="hero-name">
                  <span>{site.name.split(" ")[0]}</span>
                  <span className="outline">{site.name.split(" ").slice(1).join(" ")}</span>
                </h1>
                <div className="typer-row">
                  <span style={{ color: "var(--accent)" }}>~/sid $</span>
                  <Typer roles={site.hero.roles} />
                </div>
                <p className="hero-h">{site.hero.headline}</p>
                <p className="hero-p">{site.hero.description}</p>
                <div className="avail"><span className="pulse" aria-hidden="true" />{site.hero.availability}</div>
                <div className="hero-ctas">
                  <a className="btn btn-primary" href="#projects">Explore My Work <ArrowRight className="nudge" /></a>
                  <a className="btn btn-ghost" href={site.resumePdf} download={site.resumeFileName}>Download Resume <Download className="nudge-d" /></a>
                </div>
                <a className="scroll-ind" href="#about"><span className="mouse" aria-hidden="true" />scroll to explore</a>
              </div>
              <div className="hero-art" data-parallax-layer="3">
                <SamuraiPoster />
                {site.hero.floatingTech.map((t, i) => {
                  const pos = [
                    { left: "0%", top: "46%" },
                    { right: "-2%", top: "52%" },
                    { left: "12%", bottom: "2%" },
                    { right: "6%", bottom: "8%" },
                  ][i % 4];
                  const dot = ["#8B7CFF", "#53D6C7", "#F4C96B", "#8B7CFF"][i % 4];
                  return (
                    <span key={t} className="tech-float" aria-hidden="true" style={{ ...pos, animationDelay: `${-i * 1.7}s` }}>
                      <i style={{ background: dot }} />{t}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        <div className="hero-branch" data-parallax-layer="4" aria-hidden="true"><CherryBranch uid="hero" /></div>
        </ParallaxHero>
        <InkSlash from="#7a2016" to="var(--bg)" />

        {/* ABOUT */}
        <ParallaxHero id="about" className="sec env env-about no-print" mode="pass" strength={0.35}>
          <div className="env-bamboo" data-parallax-layer="2" aria-hidden="true"><Bamboo /></div>
          <div className="env-rocks" data-parallax-layer="1" aria-hidden="true"><RockGarden /></div>
          <div className="wrap">
            <SectionHead idx="0x01" tag="about" title="A Little About Me" />
            <div className="about-grid">
              <div className="about-copy reveal">
                <p style={{ fontSize: 21, lineHeight: 1.5 }}>{site.about.intro}</p>
                <p className="muted">{site.about.strengths}</p>
                {site.about.blocks.map((b) => (
                  <div key={b.kicker}>
                    <span className="kicker">{"// "}{b.kicker}</span>
                    <p className="muted"><Rich text={b.text} /></p>
                  </div>
                ))}
              </div>
              <div className="about-art reveal"><DeskArt /></div>
            </div>
            <div className="stats">
              {site.about.stats.map((s) => (
                <div className="stat reveal" key={s.label}>
                  <div className="stat-n">{s.value}</div>
                  <div className="stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ParallaxHero>

        {/* PROJECTS */}
        <section id="projects" className="sec env env-gallery no-print">
          <div className="wrap">
            <SectionHead idx="0x02" tag="projects" title="Things I've Built" lead="A collection of experiments, ideas, and projects brought to life." />
            <ProjectsGrid projects={projects} />

            <div className="gh-head">
              <div>
                <div className="sec-head" style={{ marginBottom: 6 }}><span className="sec-idx">live</span><span className="sec-rule" /><span>github.com/{site.githubUser}</span></div>
                <h3 className="hf" style={{ fontSize: 28, margin: 0, letterSpacing: "-0.02em" }}>Latest on GitHub</h3>
              </div>
              <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> All repositories <ArrowUpRight className="nudge" size={16} />
              </a>
            </div>
            <div className="gh-grid">
              {repos.map((r) => (
                <article className="repo" key={r.name}>
                  <h4><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a></h4>
                  <p>{r.description || "No description yet."}</p>
                  <div className="repo-meta">
                    {r.language && <span><i className="lang-dot" style={{ background: LANG_COLORS[r.language] ?? "var(--accent)" }} />{r.language}</span>}
                    <span aria-label={`${r.stars} stars`}><Star size={14} />{r.stars}</span>
                    <span aria-label={`${r.forks} forks`}><Fork size={14} />{r.forks}</span>
                    <span><Clock size={14} />{fmtDate(r.updatedAt)}</span>
                  </div>
                </article>
              ))}
              {repos.length === 0 && (
                <div className="gh-note">
                  <div className="gh-ico" aria-hidden="true"><Github size={24} /></div>
                  <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                    <p className="hf" style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>
                      {gh.ok ? "Public repositories will appear here" : "GitHub is taking a breather"}
                    </p>
                    <p className="muted" style={{ margin: "2px 0 0", fontSize: 14.5 }}>
                      {gh.ok
                        ? "Code, experiments and works-in-progress land on GitHub first."
                        : "Live repository data couldn't load right now — browse everything directly on GitHub."}
                    </p>
                  </div>
                  <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noopener noreferrer">Visit profile <ArrowUpRight className="nudge" size={16} /></a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <InkSlash from="var(--bg)" to="var(--bg-warm)" />
        <ParallaxHero id="skills" className="sec env env-interior no-print" mode="pass" strength={0.3}>
          <div className="env-shoji" data-parallax-layer="1" aria-hidden="true" />
          <div className="env-lantern" data-parallax-layer="4" aria-hidden="true"><Lantern /></div>
          <div className="wrap">
            <SectionHead idx="0x03" tag="skills" title="My Technical Toolkit" lead="Technologies and tools I use to turn ideas into reality." />
            <div className="sk-grid">
              {site.skills.map((c) => {
                const Icon = SKILL_ICONS[c.icon];
                return (
                  <div className="sk-card reveal" key={c.name}>
                    <div className="sk-head">
                      <span className={`sk-ico bg-${c.tone} tone-${c.tone}`}><Icon size={22} /></span>
                      <h3 className="sk-name">{c.name}</h3>
                      <span className="sk-count">{String(c.items.length).padStart(2, "0")}</span>
                    </div>
                    <ul className="sk-list">
                      {c.items.map((it) => (
                        <li className="sk-item" key={it.name}>
                          <span className={`mono-tile tone-${c.tone}`} aria-hidden="true">{it.mono}</span>
                          <span className="sk-label">{it.name}<span className="sk-note">{it.note}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="course reveal">
              <span className="mono" style={{ fontSize: 12, letterSpacing: "0.08em", color: "var(--muted)", marginRight: 6 }}>COURSEWORK →</span>
              {site.coursework.map((c) => <span className="chip" key={c}>{c}</span>)}
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)", marginLeft: "auto" }}>speaks {site.spokenLanguages}</span>
            </div>
          </div>
        </ParallaxHero>

        {/* EXPERIENCE */}
        <ShojiDoors />
        <ParallaxHero id="experience" className="sec env env-garden no-print" mode="pass" strength={0.35}>
          <div className="env-scene" data-parallax-layer="1" aria-hidden="true"><GardenScene /></div>
          <Petals count={7} seed={21} />
          <div className="env-branch" data-parallax-layer="4" aria-hidden="true"><CherryBranch uid="garden" /></div>
          <div className="wrap">
            <SectionHead idx="0x04" tag="experience" title="My Journey So Far" lead="Education, internships and certifications — newest first." />
            <Timeline entries={site.timeline} />
          </div>
        </ParallaxHero>

        {/* RESUME */}
        <section id="resume" className="sec">
          <div className="wrap"><ResumeViewer /></div>
        </section>

        {/* CONTACT */}
        <InkSlash from="var(--bg)" to="#171512" />
        <ParallaxHero id="contact" className="sec env env-landscape no-print" mode="pass" strength={0.3}>
          <div className="env-dusk" data-parallax-layer="1" aria-hidden="true"><SunsetLandscape /></div>
          <div className="wrap">
            <SectionHead idx="0x06" tag="contact" title="Let's Build Something Great" lead="Have an interesting idea, opportunity, or collaboration in mind? I'd love to hear about it." />
            <div className="ct-grid">
              <div className="reveal">
                <div className="ct-links">
                  <a className="ct-link" href={`mailto:${site.email}`}>
                    <span className="ci tone-accent"><Mail size={20} /></span>
                    <span style={{ minWidth: 0 }}><small>Email</small><span className="cv">{site.email}</span></span>
                    <ArrowUpRight className="arr" />
                  </a>
                  <a className="ct-link" href={site.github} target="_blank" rel="noopener noreferrer">
                    <span className="ci tone-accent2"><Github size={20} /></span>
                    <span style={{ minWidth: 0 }}><small>GitHub</small><span className="cv">github.com/{site.githubUser}</span></span>
                    <ArrowUpRight className="arr" />
                  </a>
                  <a className="ct-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="ci tone-hl"><Linkedin size={20} /></span>
                    <span style={{ minWidth: 0 }}><small>LinkedIn</small><span className="cv">in/{site.linkedin.split("/in/")[1]?.replace(/\/$/, "")}</span></span>
                    <ArrowUpRight className="arr" />
                  </a>
                </div>
                <div className="ct-art"><ContactArt /></div>
              </div>
              <ContactForm />
            </div>
          </div>
        </ParallaxHero>
      </main>
      <Footer />
    </>
  );
}
