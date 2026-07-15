import type { Lang } from '../i18n/ui';

export interface LiveSession {
  videoId: string;
  title: string;
  host: string;
  /** ISO publish date of the recording on YouTube. */
  date: string;
  description: Record<Lang, string>;
  /** GitHub repo with demo code and assets for this session. */
  repo?: string;
  /** Related blog article. */
  article?: string;
}

export const liveSessions: LiveSession[] = [
  {
    videoId: 'WK82iigFKDA',
    title: 'Empowering Cross-Functional Teams with Scratch Orgs',
    host: 'Apex Hours',
    date: '2025-12-20',
    description: {
      en: 'How Scratch Org self-service enables cross-functional teams to develop, test and validate independently.',
      de: 'Wie Scratch-Org-Self-Service cross-funktionale Teams befähigt, unabhängig zu entwickeln, zu testen und zu validieren.',
    },
    repo: 'https://github.com/svierk/devops-dreamin-london-2025',
  },
  {
    videoId: 'xnoZ2Lc_WnQ',
    title: 'Streamline Salesforce E2E UI Testing with UTAM',
    host: 'Apex Hours',
    date: '2025-08-02',
    description: {
      en: 'End-to-end UI test automation for Salesforce with the UI Test Automation Model (UTAM) and CI/CD integration.',
      de: 'End-to-End-UI-Testautomatisierung für Salesforce mit dem UI Test Automation Model (UTAM) und CI/CD-Integration.',
    },
    repo: 'https://github.com/svierk/salesforce-utam-e2e-testing',
    article:
      'https://medium.com/capgemini-salesforce-architects/streamline-e2e-testing-with-utam-salesforces-ui-test-automation-model-51c0effb1e67',
  },
  {
    videoId: '-AMatcH64Cc',
    title: 'How to Leverage GraphQL to Improve Data Gathering in Salesforce',
    host: 'Apex Hours',
    date: '2024-11-26',
    description: {
      en: 'Using the GraphQL wire adapter to simplify the data layer of Lightning Web Components - often without any Apex.',
      de: 'Mit dem GraphQL Wire Adapter die Datenschicht von Lightning Web Components vereinfachen - oft ganz ohne Apex.',
    },
    article:
      'https://medium.com/capgemini-salesforce-architects/replace-apex-with-graphql-in-your-salesforce-ui-architecture-62693ff40f5b',
  },
  {
    videoId: 'WukMwcLk9_U',
    title: '5 Things Salesforce Developers Should Know About Lightning Web Components',
    host: 'Apex Hours',
    date: '2024-07-27',
    description: {
      en: 'Practical LWC lessons learned - from component design to testing - that make everyday development easier.',
      de: 'Praktische LWC-Lektionen - von Komponentendesign bis Testing - die die tägliche Entwicklung leichter machen.',
    },
    repo: 'https://github.com/svierk/awesome-lwc-collection',
    article:
      'https://levelup.gitconnected.com/5-things-salesforce-developers-should-know-about-lightning-web-components-098f3619851a',
  },
];
