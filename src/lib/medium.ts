export interface Article {
  title: string;
  url: string;
  date: Date;
  /** Cover image from the article body, if present. */
  image?: string;
  /** Estimated reading time in minutes, from the article body. */
  minutes: number;
}

function extractTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return undefined;
  return match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim();
}

/** Average adult reading speed; the usual figure used for "x min read". */
const WORDS_PER_MINUTE = 200;

/**
 * Words plus an allowance for images, the way Medium counts it - the first
 * image is worth 12 seconds, each following one a second less down to 3. These
 * articles are screenshot-heavy walkthroughs, so counting words alone puts a
 * "1 min read" on a post that takes several.
 */
function readingMinutes(html: string | undefined): number {
  if (!html) return 1;

  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  const images = html.match(/<img\b/g)?.length ?? 0;
  let imageSeconds = 0;
  for (let i = 0; i < images; i += 1) imageSeconds += Math.max(3, 12 - i);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE + imageSeconds / 60));
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/**
 * Fetches the latest articles from a Medium RSS feed at build time.
 * Returns an empty list on any failure so the build never breaks -
 * the blog section then falls back to a plain Medium link.
 */
let cached: Promise<Article[]> | undefined;

export function fetchMediumArticles(feedUrl: string, limit = 6): Promise<Article[]> {
  // Both language pages request the same feed; fetch only once per build.
  cached ??= doFetchMediumArticles(feedUrl, limit);
  return cached;
}

async function doFetchMediumArticles(feedUrl: string, limit: number): Promise<Article[]> {
  try {
    const response = await fetch(feedUrl, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`Feed responded with ${response.status}`);
    const xml = await response.text();

    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const articles: Article[] = [];
    for (const item of items) {
      const title = extractTag(item, 'title');
      const url = extractTag(item, 'link');
      const pubDate = extractTag(item, 'pubDate');
      if (!title || !url || !pubDate) continue;
      const date = new Date(pubDate);
      if (Number.isNaN(date.getTime())) continue;
      const content = extractTag(item, 'content:encoded');
      const image = content?.match(/<img[^>]+src="(https:\/\/[^"]+)"/)?.[1];
      articles.push({
        title: decodeEntities(title),
        url: url.split('?')[0],
        date,
        image,
        minutes: readingMinutes(content),
      });
    }
    return articles.slice(0, limit);
  } catch (error) {
    console.warn(`[medium] Could not load feed, blog section falls back to a link: ${error}`);
    return [];
  }
}
