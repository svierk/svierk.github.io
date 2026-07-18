import type { Lang } from '../i18n/ui';

export interface Feature {
  id: string;
  /** Topic of the interview or media feature. */
  title: Record<Lang, string>;
  /** Who published/featured it (shown as a badge). */
  publisher: string;
  /** Interview series or format, e.g. 'Partner Mic'. */
  series?: string;
  /** Interviewer / host. */
  host?: string;
  /** ISO publish date; omit while comingSoon. */
  date?: string;
  description: Record<Lang, string>;
  /** Link to the published post. */
  url?: string;
  /** True while the feature is announced but not published yet. */
  comingSoon?: boolean;
}

export const features: Feature[] = [
  {
    id: 'devops-multi-org',
    title: {
      en: 'A DevOps Strategy for Multi-Org Implementations',
      de: 'DevOps-Strategie für Multi-Org-Implementierungen',
    },
    publisher: 'Salesforce',
    series: 'Partner Mic',
    host: 'Katharina Gude',
    description: {
      en: 'A Partner Mic conversation on DevOps strategy for complex Salesforce landscapes: the biggest misconception teams start with, the challenge of running multiple orgs, where to begin, and how Agentforce and Data Cloud reshape the architecture decisions companies make today.',
      de: 'Ein Partner-Mic-Gespräch über DevOps-Strategien für komplexe Salesforce-Landschaften: das größte Missverständnis beim Einstieg, die Herausforderung mehrerer Orgs, wo man beginnen sollte und wie Agentforce und Data Cloud Architekturentscheidungen verändern.',
    },
    comingSoon: true,
  },
  {
    id: 'agentforce-success-factor',
    title: {
      en: 'Why Agentforce Became a Success Factor',
      de: 'Warum Agentforce zum Erfolgsfaktor wurde',
    },
    publisher: 'Salesforce',
    series: 'Partner Mic',
    host: 'Katharina Gude',
    date: '2026-07-16',
    description: {
      en: 'In conversation with Katharina Gude, I share why Agentforce became a success factor in one of Capgemini\'s projects - moving from endless manual to-dos ahead of key sales deals to a real hand-in-hand workflow with an agent, plus some solid tips for newbies.',
      de: 'Im Talk mit Katharina Gude verrate ich, warum Agentforce in einem Projekt von Capgemini zum Erfolgsfaktor geworden ist - von endlosen, manuellen Aufgaben kurz vor wichtigen Sales-Deals hin zu einem sinnvollen Hand-in-Hand-Workflow mit einem Agent, samt guter Tipps für Newbies.',
    },
    url: 'https://www.linkedin.com/posts/salesforce_im-talk-mit-katharina-gude-verr%C3%A4t-sebastiano-activity-7483447003859886080-nSJB/',
  },
];
