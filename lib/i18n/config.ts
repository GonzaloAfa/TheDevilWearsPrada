import type { Lang } from '../types';

export const LOCALES: Lang[] = ['es', 'en', 'pt', 'fr', 'de', 'cl'];

export const FALLBACK_CHAIN: Lang[] = ['es', 'en'];

export const LOCALE_META: Record<Lang, { label: string; flag: string; name: string }> = {
  es: { label: 'ES', flag: '🇪🇸', name: 'Español' },
  en: { label: 'EN', flag: '🇺🇸', name: 'English' },
  pt: { label: 'PT', flag: '🇧🇷', name: 'Português' },
  fr: { label: 'FR', flag: '🇫🇷', name: 'Français' },
  de: { label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  cl: { label: 'CL', flag: '🇨🇱', name: 'Chileno' }
};

export function normalizeLang(value: string): Lang {
  return LOCALES.includes(value as Lang) ? (value as Lang) : FALLBACK_CHAIN[0];
}

export function langPath(lang: Lang, suffix: string = '') {
  const cleanSuffix = suffix && suffix.startsWith('/') ? suffix : suffix ? `/${suffix}` : '';
  return `/${lang}${cleanSuffix}`;
}

export function getLocaleMeta(lang: Lang) {
  return LOCALE_META[lang];
}
