# svierk.github.io

[![Validation](https://github.com/svierk/svierk.github.io/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/svierk/svierk.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/svierk/svierk.github.io/actions/workflows/deploy.yml/badge.svg?branch=main&event=push)](https://github.com/svierk/svierk.github.io/actions/workflows/deploy.yml)

Personal profile & track record of Sebastiano Schwarz - live at [svierk.github.io](https://svierk.github.io/).

Built with [Astro](https://astro.build/), deployed to GitHub Pages via GitHub Actions.
Available in English (default, `/`) and German (`/de/`).

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Content

| What | Where |
| --- | --- |
| Profile & social links | `src/data/profile.ts` |
| Speaking engagements | `src/data/talks.ts` |
| Recorded live sessions | `src/data/sessions.ts` |
| Open source projects | `src/data/projects.ts` |
| UI translations (EN/DE) | `src/i18n/ui.ts` |

Blog articles are pulled automatically from the Medium RSS feed at build time.
A weekly scheduled workflow run keeps the article list and the upcoming/past
split of talks current.

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
reaches the browser. Regenerate it with `npm run generate:map` (needs network
access) after changing the projection or the grid spacing in
`scripts/generate-world-map.mjs`. Source data: Natural Earth 1:110m land
polygons, public domain.

Below the map, the event list is filtered by the year and city chips and paged
with a "show more" button. A year filter thins the map to the matching cities;
a city filter leaves every marker in place so the next city stays one click
away. Hovering or focusing an event card lights up its marker. Without
JavaScript the filters and the button are hidden and every event is rendered,
so nothing is lost for crawlers.

Slide decks can be added as PDFs under `public/slides/` and referenced via the
`slides` field of a session in `src/data/talks.ts`, e.g.
`slides: '/slides/tdx-25-utam.pdf'`. Demo repos are linked via the `repo`
field of a session (talks and live sessions).
