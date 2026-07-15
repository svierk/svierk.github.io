export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.description':
      'Sebastiano Schwarz - Salesforce CTO Germany @ Capgemini. Shaping technical strategy around the Salesforce platform. Speaker, open source contributor and technical author.',
    'nav.about': 'About',
    'nav.speaking': 'Speaking',
    'nav.sessions': 'Sessions',
    'nav.blog': 'Blog',
    'nav.opensource': 'Open Source',
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Salesforce CTO Germany @ Capgemini · Technical Architect',
    'hero.tagline':
      'I shape the technical strategy around the Salesforce platform - and share what I learn along the way as a speaker, open source contributor and technical author.',
    'hero.location': 'Hamburg, Germany',
    'about.title': 'About',
    'about.body':
      'As Salesforce CTO Germany at Capgemini, I shape the technical strategy around the platform while staying hands-on as Lead Delivery Architect for global enterprise projects. My focus spans scalable multi-org architectures, DevOps strategy, UI architecture and, more recently, everything around Agentforce and AI. Alongside that, I mentor aspiring architects, contribute to open source, speak at conferences and write about what I learn along the way.',
    'speaking.title': 'Speaking',
    'speaking.subtitle': 'Conference talks and community sessions.',
    'speaking.upcoming': 'Upcoming',
    'speaking.past': 'Past',
    'speaking.comingSoon': 'Coming soon…',
    'speaking.meetups':
      'Plus multiple local Trailblazer Community Group meet-ups.',
    'speaking.slides': 'Slides',
    'speaking.code': 'Code',
    'speaking.article': 'Article',
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
      'Sebastiano Schwarz - Salesforce CTO Germany @ Capgemini. Gestaltet die technische Strategie rund um die Salesforce-Plattform. Speaker, Open-Source-Contributor und technischer Autor.',
    'nav.about': 'Über mich',
    'nav.speaking': 'Vorträge',
    'nav.sessions': 'Sessions',
    'nav.blog': 'Blog',
    'nav.opensource': 'Open Source',
    'hero.greeting': 'Hi, ich bin',
    'hero.role': 'Salesforce CTO Germany @ Capgemini · Technical Architect',
    'hero.tagline':
      'Ich gestalte die technische Strategie rund um die Salesforce-Plattform - und teile mein Wissen als Speaker, Open-Source-Contributor und technischer Autor.',
    'hero.location': 'Hamburg, Deutschland',
    'about.title': 'Über mich',
    'about.body':
      'Als Salesforce CTO Germany bei Capgemini gestalte ich die technische Strategie rund um die Plattform – bleibe dabei aber als Lead Delivery Architect für globale Enterprise-Kunden nah an der Umsetzung. Meine Schwerpunkte reichen von skalierbaren Multi-Org-Architekturen über DevOps-Strategie und UI-Architektur bis hin zu allem rund um Agentforce und KI. Daneben begleite ich angehende Architektinnen und Architekten als Mentor, engagiere mich in Open Source, spreche auf Konferenzen und schreibe über das, was ich dabei lerne.',
    'speaking.title': 'Vorträge',
    'speaking.subtitle': 'Konferenz-Talks und Community-Sessions.',
    'speaking.upcoming': 'Demnächst',
    'speaking.past': 'Vergangen',
    'speaking.comingSoon': 'Coming soon…',
    'speaking.meetups':
      'Dazu zahlreiche lokale Trailblazer-Community-Group-Meet-ups.',
    'speaking.slides': 'Slides',
    'speaking.code': 'Code',
    'speaking.article': 'Artikel',
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
