export const profile = {
  name: 'Sebastiano Schwarz',
  email: 'sebastiano.vierk@gmail.com',
  mediumFeed: 'https://medium.com/@svierk/feed',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/svierk' },
    { id: 'medium', label: 'Medium', url: 'https://medium.com/@svierk' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/sebastiano-schwarz/' },
    { id: 'trailblazer', label: 'Trailblazer', url: 'https://www.salesforce.com/trailblazer/sebastiano-schwarz' },
    { id: 'stackexchange', label: 'Stack Exchange', url: 'https://stackexchange.com/users/8147444/sebastiano-schwarz' },
  ],
} as const;

export type SocialId = (typeof profile.socials)[number]['id'];
