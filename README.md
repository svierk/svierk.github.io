# svierk.github.io

[![Validation](https://github.com/svierk/svierk.github.io/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/svierk/svierk.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/svierk/svierk.github.io/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)](https://github.com/svierk/svierk.github.io/actions/workflows/deploy.yml)

Personal profile & track record of Sebastiano Schwarz - live at [svierk.github.io](https://svierk.github.io/).

Built with [Astro](https://astro.build/), deployed to GitHub Pages via GitHub Actions.
Available in English (default, `/`) and German (`/de/`).

## Development

```bash
npm install
npm run dev           # local dev server
npm run build         # production build into dist/
npm run preview       # preview the production build
npm run generate:map  # re-render the world map data (rarely needed, see below)
```

## Content

| What | Where |
| --- | --- |
| Profile & social links | `src/data/profile.ts` |
| Speaking engagements | `src/data/talks.ts` |
| Recorded live sessions | `src/data/sessions.ts` |
| Interviews & media features | `src/data/featured.ts` |
| Open source projects | `src/data/projects.ts` |
| UI translations (EN/DE) | `src/i18n/ui.ts` |

Blog articles are pulled automatically from the Medium RSS feed at build time.
A weekly scheduled workflow run keeps the article list and the upcoming/past
split of talks current.

A new talk needs a `place` pointing at the `places` registry at the top of
`src/data/talks.ts`; add an entry there first if the city is new. The map and
the country count in the Speaking section are derived from it.

Each session of a talk (and each live session) can link out through four
optional fields: `repo` for the demo code, `demo` for a hosted demo, `slides`
for a PDF deck and `article` for a related blog post. Slide decks live in
`public/slides/` and are referenced by their public path, e.g.
`slides: '/slides/tdx-25-utam.pdf'`.

## World map

The Speaking section opens with a dot-matrix world map, one marker per venue.
Markers are positioned from the `coords` of the entry a talk's `place` points
at in `src/data/talks.ts` - a new city needs a new entry in the `places`
registry there, nothing else. Markers that would overlap (Berlin and Frankfurt
are a few pixels apart at this scale) are pushed apart automatically and keep a
thin leader line back to their real position.

The visible window is cropped to the region that actually has events plus
padding, rather than being hard-coded, so a talk on a new continent widens the
map by itself instead of falling off the edge. Land dots outside that window
are dropped at build time. Tune the framing via `CROP_PADDING`, `CROP_RATIO`
and `MIN_CROP_WIDTH` in `src/lib/speaking.ts`.

The underlying map is pre-rendered into `src/data/worldMap.ts`, a single SVG
path of ~6200 dots covering the whole world, so the page ships no mapping
library and makes no requests at runtime. Only the cropped subset (~1800 dots)
reaches the browser. Source data: Natural Earth 1:110m land polygons, public
domain.

`src/data/worldMap.ts` is a generated but committed artifact - the build never
regenerates it. Coastlines do not change, and keeping it in the repository
keeps the build offline-safe and reproducible. Re-run `npm run generate:map`
(needs network access) only after changing the projection, the grid spacing or
the latitude range in `scripts/generate-world-map.mjs`, and commit the result
together with the script.

Below the map, the event list is filtered by the year and city chips and paged
with a "show more" button. A year filter thins the map to the matching cities;
a city filter leaves every marker in place so the next city stays one click
away. Hovering or focusing an event card lights up its marker. Without
JavaScript the filters and the button are hidden and every event is rendered,
so nothing is lost for crawlers.

## Pipelines

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | push to `main`, pull requests | `npm ci` plus a full production build, so a broken page, data file or translation fails before it reaches Pages |
| `deploy.yml` | push to `main`, Mondays 06:00 UTC, manual | Builds the site and publishes it to GitHub Pages |
| `dependabot-auto-merge.yml` | Dependabot pull requests | Approves and auto-merges dependency updates once the required checks pass |

Both build workflows only run the Astro build. The Medium feed and the GitHub
star counts are fetched during that build and fail soft - no articles, no star
counts - so a network hiccup never breaks a deployment.
