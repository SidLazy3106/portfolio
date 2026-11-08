import { site } from "@/content/site";

export interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

export type RepoResult =
  | { ok: true; repos: Repo[] }
  | { ok: false; reason: "rate-limited" | "error"; repos: [] };

interface GhRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
}

/**
 * Public repos for the configured GitHub user.
 * Cached and re-fetched at most once an hour (ISR), so visitors never hit the
 * GitHub rate limit directly. Set GITHUB_TOKEN to raise the limit from 60 to 5000/h.
 */
export async function getRepos(): Promise<RepoResult> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(site.githubUser)}/repos?per_page=100&sort=pushed&type=owner`,
      { headers, next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) },
    );
    if (res.status === 403 || res.status === 429) return { ok: false, reason: "rate-limited", repos: [] };
    if (!res.ok) return { ok: false, reason: "error", repos: [] };
    const data = (await res.json()) as GhRepo[];
    const repos = data
      .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== site.githubUser.toLowerCase())
      .map<Repo>((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.pushed_at,
        topics: r.topics ?? [],
      }));
    return { ok: true, repos };
  } catch {
    return { ok: false, reason: "error", repos: [] };
  }
}
