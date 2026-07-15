import type { Lang } from '../i18n/ui';

export interface Project {
  repo: string;
  /** Static fallback star count, used when the GitHub API is unavailable at build time. */
  stars: number;
  description: Record<Lang, string>;
  topics: string[];
}

export const projects: Project[] = [
  {
    repo: 'awesome-lwc-collection',
    stars: 298,
    description: {
      en: 'A collection of ready-to-use Lightning Web Components that might help your SFDX project.',
      de: 'Eine Sammlung sofort einsetzbarer Lightning Web Components für dein SFDX-Projekt.',
    },
    topics: ['LWC', 'Salesforce', 'JavaScript'],
  },
  {
    repo: 'salesforce-devops-starter-kit',
    stars: 28,
    description: {
      en: 'DevOps starter kit that makes it easy to build GitHub-native Salesforce CI/CD pipelines.',
      de: 'DevOps-Starter-Kit für den einfachen Aufbau GitHub-nativer Salesforce-CI/CD-Pipelines.',
    },
    topics: ['DevOps', 'GitHub Actions', 'CI/CD'],
  },
  {
    repo: 'salesforce-utam-e2e-testing',
    stars: 17,
    description: {
      en: 'SFDX template for using UTAM to establish Salesforce E2E UI test automation in your project.',
      de: 'SFDX-Template für Salesforce-E2E-UI-Testautomatisierung mit UTAM.',
    },
    topics: ['UTAM', 'Testing', 'E2E'],
  },
  {
    repo: 'sfdx-project-starter-kit',
    stars: 11,
    description: {
      en: 'Salesforce DX project template with Prettier, linter, Git hooks and VS Code settings.',
      de: 'Salesforce-DX-Projektvorlage mit Prettier, Linter, Git-Hooks und VS-Code-Settings.',
    },
    topics: ['SFDX', 'Tooling', 'Template'],
  },
];

export const githubProfileUrl = 'https://github.com/svierk';
