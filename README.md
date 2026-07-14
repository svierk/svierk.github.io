# svierk.github.io

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

Slide decks can be added as PDFs under `public/slides/` and referenced via the
`slides` field of a talk in `src/data/talks.ts`.
