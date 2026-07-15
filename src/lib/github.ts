const OWNER = 'svierk';

/**
 * Fetches current star counts from the GitHub API at build time.
 * Uses GITHUB_TOKEN when available (provided automatically in Actions);
 * repos that cannot be fetched are simply missing from the result, so
 * callers fall back to the static snapshot in projects.ts.
 */
let cached: Promise<Record<string, number>> | undefined;

export function fetchStarCounts(repos: string[]): Promise<Record<string, number>> {
  // Both language pages request the same repos; fetch only once per build.
  cached ??= doFetchStarCounts(repos);
  return cached;
}

async function doFetchStarCounts(repos: string[]): Promise<Record<string, number>> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${OWNER}.github.io-build`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const counts: Record<string, number> = {};
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
          headers,
          signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        const data = await response.json();
        if (typeof data.stargazers_count === 'number') {
          counts[repo] = data.stargazers_count;
        }
      } catch (error) {
        console.warn(`[github] Could not fetch stars for ${repo}, using static fallback: ${error}`);
      }
    }),
  );
  return counts;
}
