import { site } from "@/content/site";
import { ArrowUp } from "./Icons";

export function Footer({ topHref = "#home" }: { topHref?: string }) {
  return (
    <footer className="foot no-print">
      <div className="wrap foot-in">
        <span>
          <span className="mono" style={{ color: "var(--accent2)" }}>{site.initials}</span> · © {new Date().getFullYear()} {site.name}
        </span>
        <span className="mono" style={{ fontSize: 12 }}>designed &amp; built with intent — {site.location.split(",")[0]}</span>
        <a href={topHref}>Back to top <ArrowUp size={16} /></a>
      </div>
    </footer>
  );
}
