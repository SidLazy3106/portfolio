import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <>
      <Nav onHome={false} />
      <main id="main" className="wrap" style={{ padding: "120px 32px", minHeight: "70vh" }}>
        <p className="mono" style={{ color: "var(--accent2)", margin: 0 }}>HTTP 404 · packet dropped</p>
        <h1 className="h2" style={{ marginTop: 12 }}>This page didn&apos;t make it.</h1>
        <p className="lead" style={{ marginBottom: 28 }}>The link may be old, or the page has moved.</p>
        <Link href="/" className="btn btn-primary"><ArrowLeft /> Back home</Link>
      </main>
    </>
  );
}
