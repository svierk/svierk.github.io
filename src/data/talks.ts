export interface TalkSession {
  /** Session titles are proper names and stay in English in both languages. */
  title: string;
  /** GitHub repo with demo code and assets for this session. */
  repo?: string;
  /** PDF slide deck, served from /public (e.g. '/slides/tdx-25-utam.pdf'). */
  slides?: string;
  /** Related blog article. */
  article?: string;
}

export interface Talk {
  id: string;
  event: string;
  /** ISO date of the (first) event day; used for sorting and upcoming/past split. */
  date: string;
  /** Optional last event day for multi-day conferences. */
  dateEnd?: string;
  location: string;
  /** Country flag emoji shown next to the location. */
  flag: string;
  sessions: TalkSession[];
  /** True while the session details are not announced yet. */
  comingSoon?: boolean;
  /** Event website. */
  url?: string;
}

export const talks: Talk[] = [
  {
    id: 'dreamforce-26',
    event: "Dreamforce '26",
    date: '2026-09-15',
    dateEnd: '2026-09-17',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    sessions: [],
    comingSoon: true,
    url: 'https://www.salesforce.com/dreamforce/',
  },
  {
    id: 'awt-frankfurt-26',
    event: "Agentforce World Tour Frankfurt '26",
    date: '2026-05-20',
    location: 'Messe Frankfurt, Germany',
    flag: '🇩🇪',
    sessions: [
      {
        title: "How to fail Industry Cloud fast. Let's not.",
        repo: 'https://github.com/rammc/cap-de-mfg-awt-demo',
      },
    ],
  },
  {
    id: 'wirsindohana-26',
    event: "WirSindOhana '26",
    date: '2026-05-08',
    location: 'Kosmos, Berlin, Germany',
    flag: '🇩🇪',
    sessions: [
      {
        title: 'Anti-Patterns in Agentforce - 5 Mistakes That Look Like Best Practices',
        repo: 'https://github.com/rammc/agentforce-grounding-demo',
        slides: '/slides/wirsindohana-26-agentforce-anti-patterns.pdf',
        article:
          'https://medium.com/capgemini-salesforce-architects/i-built-a-custom-vector-search-to-beat-salesforce-data-library-dc0dbd335576',
      },
    ],
    url: 'https://wirsindohana.de/',
  },
  {
    id: 'albania-dreamin-26',
    event: "Albania Dreamin '26",
    date: '2026-04-25',
    location: 'Pyramid of Tirana, Albania',
    flag: '🇦🇱',
    sessions: [
      {
        title: 'Diagnose a Monolithic Salesforce Org with Scale Center',
        repo: 'https://github.com/rammc/orgpulse',
        slides: '/slides/albania-dreamin-26-scale-center.pdf',
        article:
          'https://medium.com/capgemini-salesforce-architects/when-scale-center-tells-you-whats-wrong-but-not-what-to-do-9cd3417637fb',
      },
    ],
    url: 'https://dreamin.al/',
  },
  {
    id: 'tdx-26',
    event: "TDX '26",
    date: '2026-04-15',
    dateEnd: '2026-04-16',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    sessions: [
      {
        title: 'Automate UI Testing with AI and UTAM',
        repo: 'https://github.com/svierk/salesforce-utam-e2e-testing',
        slides: '/slides/tdx-26-utam-ai.pdf',
      },
      {
        title: 'Design a DevOps Strategy for Multi-Org Implementations',
        repo: 'https://github.com/rammc/TDX-2026-Salesforce-DevOps-Multi-Org',
        slides: '/slides/tdx-26-devops-multi-org.pdf',
      },
    ],
    url: 'https://www.salesforce.com/tdx/',
  },
  {
    id: 'polish-dreamin-26',
    event: "Polish Dreamin '26",
    date: '2026-03-20',
    location: 'Wrocław, Poland',
    flag: '🇵🇱',
    sessions: [
      {
        title: 'From Scattered to Complete: Architecting a Real-World Customer 360 Use Case',
        slides: '/slides/polish-dreamin-26-customer-360.pdf',
      },
    ],
    url: 'https://dreamin.coffeeforce.pl/',
  },
  {
    id: 'devops-dreamin-london-25',
    event: "DevOps Dreamin' London '25",
    date: '2025-11-20',
    location: 'London, UK',
    flag: '🇬🇧',
    sessions: [
      {
        title: 'Empowering Cross-Functional Teams with Scratch Orgs',
        repo: 'https://github.com/svierk/devops-dreamin-london-2025',
        slides: '/slides/devops-dreamin-london-25-scratch-orgs.pdf',
      },
    ],
    url: 'https://devopsdreamin.com/',
  },
  {
    id: 'tdx-25',
    event: "TDX '25",
    date: '2025-03-05',
    dateEnd: '2025-03-06',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    sessions: [
      {
        title: 'Streamline Salesforce E2E UI Testing with UTAM',
        repo: 'https://github.com/svierk/salesforce-utam-e2e-testing',
        slides: '/slides/tdx-25-utam.pdf',
        article:
          'https://medium.com/capgemini-salesforce-architects/streamline-e2e-testing-with-utam-salesforces-ui-test-automation-model-51c0effb1e67',
      },
    ],
    url: 'https://www.salesforce.com/tdx/',
  },
  {
    id: 'wirsindohana-24',
    event: "WirSindOhana '24",
    date: '2024-05-24',
    location: 'Kosmos, Berlin, Germany',
    flag: '🇩🇪',
    sessions: [
      {
        title: '5 Things Salesforce Developers Should Know About Lightning Web Components',
        repo: 'https://github.com/svierk/awesome-lwc-collection',
        slides: '/slides/wirsindohana-24-lwc.pdf',
        article:
          'https://levelup.gitconnected.com/5-things-salesforce-developers-should-know-about-lightning-web-components-098f3619851a',
      },
    ],
    url: 'https://wirsindohana.de/',
  },
];
