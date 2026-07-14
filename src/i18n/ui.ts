export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.description':
      'Sebastiano Schwarz - Salesforce CTO Germany @ Capgemini | Technical Architect. Speaker, open source author and technical writer.',
    'nav.about': 'About',
    'nav.speaking': 'Speaking',
    'nav.sessions': 'Sessions',
    'nav.blog': 'Blog',
    'nav.opensource': 'Open Source',
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Salesforce CTO Germany @ Capgemini · Technical Architect',
    'hero.tagline':
      'I help teams build great things on the Salesforce platform - and share what I learn along the way as a speaker, open source author and technical writer.',
    'hero.location': 'Hamburg, Germany',
    'about.title': 'About',
    'about.body':
      'I am a Technical Architect and Salesforce Trailblazer with a passion for JavaScript and TypeScript. As Salesforce CTO Germany at Capgemini I shape technical strategy and architecture for enterprise Salesforce implementations. My focus areas are Lightning Web Components, DevOps and test automation, scalable multi-org architectures and, more recently, everything around Agentforce and AI. I love giving back to the community - on stage, on GitHub and on Medium.',
    'speaking.title': 'Speaking',
    'speaking.subtitle': 'Conference talks and community sessions.',
    'speaking.upcoming': 'Upcoming',
    'speaking.past': 'Past',
    'speaking.comingSoon': 'Coming soon…',
    'speaking.meetups':
      'Plus multiple local Trailblazer Community Group meet-ups.',
    'speaking.slides': 'Slides',
    'sessions.title': 'Live Sessions',
    'sessions.subtitle': 'Recorded live sessions - grab a coffee and watch.',
    'sessions.watch': 'Watch on YouTube',
    'blog.title': 'Blog',
    'blog.subtitle': 'Latest articles, automatically pulled from Medium.',
    'blog.viewAll': 'View all articles on Medium',
    'blog.fallback': 'Read my articles on Medium',
    'opensource.title': 'Open Source',
    'opensource.subtitle': 'Selected projects from my GitHub.',
    'opensource.viewAll': 'View all repositories',
    'opensource.stars': 'stars',
    'footer.builtWith': 'Built with Astro · Hosted on GitHub Pages',
    'date.locale': 'en-US',
  },
  de: {
    'meta.description':
      'Sebastiano Schwarz - Salesforce CTO Germany @ Capgemini | Technical Architect. Speaker, Open-Source-Autor und Technical Writer.',
    'nav.about': 'Über mich',
    'nav.speaking': 'Vorträge',
    'nav.sessions': 'Sessions',
    'nav.blog': 'Blog',
    'nav.opensource': 'Open Source',
    'hero.greeting': 'Hi, ich bin',
    'hero.role': 'Salesforce CTO Germany @ Capgemini · Technical Architect',
    'hero.tagline':
      'Ich helfe Teams, großartige Lösungen auf der Salesforce-Plattform zu bauen - und teile mein Wissen als Speaker, Open-Source-Autor und Technical Writer.',
    'hero.location': 'Hamburg, Deutschland',
    'about.title': 'Über mich',
    'about.body':
      'Ich bin Technical Architect und Salesforce Trailblazer mit einer Leidenschaft für JavaScript und TypeScript. Als Salesforce CTO Germany bei Capgemini gestalte ich technische Strategie und Architektur für Enterprise-Salesforce-Implementierungen. Meine Schwerpunkte sind Lightning Web Components, DevOps und Testautomatisierung, skalierbare Multi-Org-Architekturen und zuletzt alles rund um Agentforce und KI. Ich gebe gerne an die Community zurück - auf der Bühne, auf GitHub und auf Medium.',
    'speaking.title': 'Vorträge',
    'speaking.subtitle': 'Konferenz-Talks und Community-Sessions.',
    'speaking.upcoming': 'Demnächst',
    'speaking.past': 'Vergangen',
    'speaking.comingSoon': 'Coming soon…',
    'speaking.meetups':
      'Dazu zahlreiche lokale Trailblazer-Community-Group-Meet-ups.',
    'speaking.slides': 'Slides',
    'sessions.title': 'Live Sessions',
    'sessions.subtitle':
      'Aufgezeichnete Live-Sessions - Kaffee schnappen und reinschauen.',
    'sessions.watch': 'Auf YouTube ansehen',
    'blog.title': 'Blog',
    'blog.subtitle': 'Neueste Artikel, automatisch von Medium geladen.',
    'blog.viewAll': 'Alle Artikel auf Medium ansehen',
    'blog.fallback': 'Meine Artikel auf Medium lesen',
    'opensource.title': 'Open Source',
    'opensource.subtitle': 'Ausgewählte Projekte von meinem GitHub.',
    'opensource.viewAll': 'Alle Repositories ansehen',
    'opensource.stars': 'Sterne',
    'footer.builtWith': 'Gebaut mit Astro · Gehostet auf GitHub Pages',
    'date.locale': 'de-DE',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
