// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://svierk.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
