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
  /** Session titles are proper names and stay in English in both languages. */
  sessions: string[];
  /** True while the session details are not announced yet. */
  comingSoon?: boolean;
  /** Event website. */
  url?: string;
  /** PDF slide decks per session, relative to /public (added later). */
  slides?: { session: string; href: string }[];
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
    sessions: ["How to fail Industry Cloud fast. Let's not."],
  },
  {
    id: 'wirsindohana-26',
    event: "WirSindOhana '26",
    date: '2026-05-08',
    location: 'Kosmos, Berlin, Germany',
    flag: '🇩🇪',
    sessions: ['Anti-Patterns in Agentforce - 5 Mistakes That Look Like Best Practices'],
    url: 'https://wirsindohana.de/',
  },
  {
    id: 'albania-dreamin-26',
    event: "Albania Dreamin '26",
    date: '2026-04-25',
    location: 'Pyramid of Tirana, Albania',
    flag: '🇦🇱',
    sessions: ['Diagnose a Monolithic Salesforce Org with Scale Center'],
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
      'Automate UI Testing with AI and UTAM',
      'Design a DevOps Strategy for Multi-Org Implementations',
    ],
    url: 'https://www.salesforce.com/tdx/',
  },
  {
    id: 'polish-dreamin-26',
    event: "Polish Dreamin '26",
    date: '2026-03-20',
    location: 'Wrocław, Poland',
    flag: '🇵🇱',
    sessions: ['From Scattered to Complete: Architecting a Real-World Customer 360 Use Case'],
    url: 'https://dreamin.coffeeforce.pl/',
  },
  {
    id: 'devops-dreamin-london-25',
    event: "DevOps Dreamin' London '25",
    date: '2025-11-20',
    location: 'London, UK',
    flag: '🇬🇧',
    sessions: ['Empowering Cross-Functional Teams with Scratch Orgs'],
    url: 'https://devopsdreamin.com/',
  },
  {
    id: 'tdx-25',
    event: "TDX '25",
    date: '2025-03-05',
    dateEnd: '2025-03-06',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    sessions: ['Streamline Salesforce E2E UI Testing with UTAM'],
    url: 'https://www.salesforce.com/tdx/',
  },
  {
    id: 'wirsindohana-24',
    event: "WirSindOhana '24",
    date: '2024-05-24',
    location: 'Kosmos, Berlin, Germany',
    flag: '🇩🇪',
    sessions: ['5 Things Salesforce Developers Should Know About Lightning Web Components'],
    url: 'https://wirsindohana.de/',
  },
];
