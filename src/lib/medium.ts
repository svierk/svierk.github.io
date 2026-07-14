export interface Article {
  title: string;
  url: string;
  date: Date;
  /** Cover image from the article body, if present. */
  image?: string;
}

function extractTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return undefined;
  return match[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1').trim();
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
export async function fetchMediumArticles(feedUrl: string, limit = 6): Promise<Article[]> {
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
      articles.push({ title: decodeEntities(title), url: url.split('?')[0], date, image });
    }
    return articles.slice(0, limit);
  } catch (error) {
    console.warn(`[medium] Could not load feed, blog section falls back to a link: ${error}`);
    return [];
  }
}
