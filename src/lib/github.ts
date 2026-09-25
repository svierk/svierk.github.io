const OWNER = 'svierk';

export interface RepoMeta {
  stars: number;
  /** Primary language reported by GitHub, if the repo has one. */
  language?: string;
  forks: number;
  /** ISO timestamp of the last push, used for the freshness label. */
  pushedAt?: string;
}

/**
 * Fetches repository metadata from the GitHub API at build time.
 * Uses GITHUB_TOKEN when available (provided automatically in Actions);
 * repos that cannot be fetched are simply missing from the result, so
 * callers fall back to the static snapshot in projects.ts.
 */
let cached: Promise<Record<string, RepoMeta>> | undefined;

export function fetchRepoMeta(repos: string[]): Promise<Record<string, RepoMeta>> {
  // Both language pages request the same repos; fetch only once per build.
  cached ??= doFetchRepoMeta(repos);
  return cached;
}

async function doFetchRepoMeta(repos: string[]): Promise<Record<string, RepoMeta>> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${OWNER}.github.io-build`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const meta: Record<string, RepoMeta> = {};
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
          headers,
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        const data = await response.json();
        if (typeof data.stargazers_count !== 'number') return;
        meta[repo] = {
          stars: data.stargazers_count,
          language: typeof data.language === 'string' ? data.language : undefined,
          forks: typeof data.forks_count === 'number' ? data.forks_count : 0,
          pushedAt: typeof data.pushed_at === 'string' ? data.pushed_at : undefined,
        };
      } catch (error) {
        console.warn(`[github] Could not fetch ${repo}, using static fallback: ${error}`);
      }
    }),
  );
  return meta;
}
