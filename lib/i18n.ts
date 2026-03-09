import type { CategoryMeta, CoffeeEvent, Lang, Location, LocationI18n } from './types';

export const LANGS: Lang[] = ['es', 'en', 'pt'];

export const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' }
];

export function normalizeLang(value: string): Lang {
  return LANGS.includes(value as Lang) ? (value as Lang) : 'es';
}

export function langPath(lang: Lang, suffix: string = '') {
  const cleanSuffix = suffix && suffix.startsWith('/') ? suffix : suffix ? `/${suffix}` : '';
  return `/${lang}${cleanSuffix}`;
}

export function getLocationI18n(loc: Location, lang: Lang): LocationI18n {
  return loc.i18n[lang] || loc.i18n.es;
}

export function getCoffeeLabel(event: CoffeeEvent, lang: Lang) {
  return event.i18n[lang]?.label || event.i18n.es.label;
}

export function getCategoryLabel(meta: CategoryMeta, lang: Lang) {
  return meta.label[lang] || meta.label.es;
}
