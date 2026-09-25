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
npm run generate:globe # re-render the globe's land mask (rarely needed, see below)
```

## Content

| What | Where |
| --- | --- |
| Profile & social links | `src/data/profile.ts` |
| Intro focus areas | `src/data/focus.ts` |
| Speaking engagements | `src/data/talks.ts` |
| Recorded live sessions | `src/data/sessions.ts` |
| Interviews & media features | `src/data/featured.ts` |
| Open source projects | `src/data/projects.ts` |
| UI translations (EN/DE) | `src/i18n/ui.ts` |

Blog articles are pulled automatically from the Medium RSS feed at build time.
A weekly scheduled workflow run keeps the article list and the upcoming/past
split of talks current.

Both build-time fetches take more from the response than the headline figure.
`src/lib/github.ts` reads the language, fork count and last push date alongside
the stars, and `src/lib/medium.ts` derives a reading time from the article body
it already parses for the cover image - neither costs an extra request. Both
fail soft: a repository whose request fails falls back to the static star count
in `projects.ts` and simply shows no live metadata, and a failed feed leaves the
blog section with a plain Medium link.

There is no separate About section: the hero carries the whole introduction and
closes with four focus areas, which is also why the nav has no "About" entry.
Those four areas are meant to stay backed by something further down the page -
a talk, a repository or an article - and to be named after the capability
rather than a product, so a rename on Salesforce's side cannot date them. Keep
their bodies close in length too, so the tiles wrap to the same height. The
grid drops to a single column earlier than the rest of the page because two
columns any narrower push every body onto another line.

A new talk needs a `place` pointing at the `places` registry at the top of
`src/data/talks.ts`; add an entry there first if the city is new. The map and
the country count in the Speaking section are derived from it.

Each session of a talk (and each live session) can link out through four
optional fields: `repo` for the demo code, `demo` for a hosted demo, `slides`
for a PDF deck and `article` for a related blog post. Slide decks live in
`public/slides/` and are referenced by their public path, e.g.
`slides: '/slides/tdx-25-utam.pdf'`.

## Globe

The Speaking section is built around a rotating dot globe, drawn on a canvas
without any mapping library. It turns slowly on its own and stops whenever
something is going on - a drag, the pointer resting on it, or a filter being
applied - then picks the rotation back up once things have been quiet for a
moment. It also parks itself while scrolled out of view or in a background tab,
and holds still entirely under `prefers-reduced-motion`.

City markers are real HTML buttons positioned over the canvas each frame rather
than shapes painted into it, so they keep their focus ring, their tooltip and
their place in the tab order. Markers that would overlap - Berlin, Frankfurt and
Wroclaw sit a handful of pixels apart at this scale - are pushed apart in screen
space every frame and keep a thin leader line back to the real city.

Markers come from the `coords` of the entry a talk's `place` points at in
`src/data/talks.ts`; a new city needs a new entry in the `places` registry
there, nothing else.

The land mask is generated into `src/data/globeLand.ts`: one row per latitude,
with the number of longitude samples scaled by cos(lat) so the dots stay evenly
spaced, packed into a base64 bit mask. That keeps ~4800 land points in under
4 KB, which the browser expands into unit vectors at load.

`src/data/globeLand.ts` is a generated but committed artifact - the build never
regenerates it. Coastlines do not change, and keeping it in the repository keeps
the build offline-safe and reproducible. Re-run `npm run generate:globe` (needs
network access) only after changing the sampling in
`scripts/generate-globe.mjs`, and commit the result together with the script. Source data: Natural Earth 1:110m land polygons, public domain.

On a wide screen the section is two columns: the counters, the globe and the
filter chips on the left, the event list on the right. Below 900px they stack
into counters, globe, filters, list. The left column is sticky, so the globe
stays in view while the list is scrolled - which is also why the event cards are
denser than the cards elsewhere on the page.

The event list is filtered by the year and city chips and paged with a "show
more" button. A year filter thins the globe down to the
matching cities and turns it to frame them; a city filter leaves every marker in
place so the next city stays one click away. Hovering or focusing an event card
lights up its marker and spins the globe to it, and picking a marker filters the
list. Without JavaScript the globe, the filters and the button are hidden and
every event is rendered, so nothing is lost for crawlers.

## Interaction

Everything interactive is plain DOM in an Astro component script - no framework,
no client-side router.

| What | Where |
| --- | --- |
| Rotating globe, markers, filters | `src/components/Globe.astro` (`<speaking-globe>`) |
| Event filtering and paging | `src/components/Speaking.astro` |
| "Show more" for any slotted list | `src/components/PagedList.astro` (`<paged-list>`) |
| Nav scroll spy, theme and mobile menu | `src/components/Nav.astro` |

The scroll spy marks the nav link of whichever section crosses a thin band below
the sticky header with `aria-current`, driven by an IntersectionObserver. A
second observer watches the footer: once the page is scrolled to the end there
is no room left to push the last section up into that band, so on a tall
viewport it could otherwise never become current.

Lists that page ship with their overflow already hidden from the server, so
there is no flash of the full list before the script runs, and a `<noscript>`
block reveals everything and hides the button when scripting is off. Anything
that sets `hidden` on an element also needs a matching `[hidden] { display:
none }` rule - the component's own display declaration would otherwise win on
specificity.

## Pipelines

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | push to `main`, pull requests | `npm ci` plus a full production build, so a broken page, data file or translation fails before it reaches Pages |
| `deploy.yml` | push to `main`, Mondays 06:00 UTC, manual | Builds the site and publishes it to GitHub Pages |
| `dependabot-auto-merge.yml` | Dependabot pull requests | Approves and auto-merges dependency updates once the required checks pass |

Both build workflows only run the Astro build. The Medium feed and the GitHub
star counts are fetched during that build and fail soft - no articles, no star
counts - so a network hiccup never breaks a deployment.
