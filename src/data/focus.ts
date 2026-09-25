import type { Lang } from '../i18n/ui';

export interface FocusArea {
  /** Picks the inline icon in FocusAreas.astro. */
  icon: 'layers' | 'pipeline' | 'layout' | 'exchange';
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

/**
 * The four areas the hero closes with. Each one is backed by talks,
 * repositories or articles listed further down the page - keep it that way.
 *
 * They are named after the capability, never after a product: Salesforce
 * renames its AI line often enough that a tile called after it would go stale
 * on its own. Keep the four bodies close in length: tiles of uneven height
 * read worse than tiles with an extra line.
 */
export const focusAreas: FocusArea[] = [
  {
    icon: 'layers',
    title: { en: 'Multi-Org Architecture', de: 'Multi-Org-Architektur' },
    body: {
      en: 'Org landscapes for global rollouts - where to split, where to share, and what either choice costs later.',
      de: 'Org-Landschaften für globale Rollouts – wo getrennt wird, wo geteilt, und was beides später kostet.',
    },
  },
  {
    icon: 'pipeline',
    title: { en: 'DevOps Strategy', de: 'DevOps-Strategie' },
    body: {
      en: 'Branching and environment strategy, quality gates, automation - and teams enabled to run it themselves.',
      de: 'Branching- und Umgebungsstrategie, Quality Gates, Automatisierung – und Teams, die das selbst tragen.',
    },
  },
  {
    icon: 'layout',
    title: { en: 'Interface Design', de: 'Interface-Design' },
    body: {
      en: 'Multi-framework front ends across LWC, React and Angular - through to agentic interfaces.',
      de: 'Multi-Framework-Frontends mit LWC, React und Angular – bis hin zu agentischen Interfaces.',
    },
  },
  {
    icon: 'exchange',
    title: { en: 'Integration Patterns', de: 'Integrationsmuster' },
    body: {
      en: 'Event-driven and API-led integration with REST and GraphQL, for a coherent Customer 360.',
      de: 'Event-getriebene und API-zentrierte Integration mit REST und GraphQL – für ein stimmiges Customer 360.',
    },
  },
];
