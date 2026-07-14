import { defaultLang, ui, type Lang, type UiKey } from './ui';

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Path of the current page in the other language, for the language switcher. */
export function altLangPath(lang: Lang): { lang: Lang; path: string } {
  return lang === 'en' ? { lang: 'de', path: '/de/' } : { lang: 'en', path: '/' };
}

/** Home path for a language, used to prefix anchor links in the nav. */
export function homePath(lang: Lang): string {
  return lang === 'en' ? '/' : '/de/';
}

export function formatDate(date: Date, lang: Lang, options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(ui[lang]['date.locale'], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}
