import type { CategoryMeta, CoffeeEvent, Lang, Location, LocationI18n } from '../types';
import { FALLBACK_CHAIN, LOCALES } from './config';
import { DATA_I18N } from '../../data/i18n';

type I18nOverlay = {
  locations?: Record<string, Partial<LocationI18n>>;
  coffee_events?: Record<string, { label: string }>;
};

const EMPTY_I18N: LocationI18n = {
  name: '',
  scene: '',
  production_note: '',
  trivia: []
};

function pickBaseI18n(loc: Location, lang: Lang): LocationI18n {
  if (loc.i18n[lang]) return loc.i18n[lang] as LocationI18n;
  for (const fallback of FALLBACK_CHAIN) {
    if (loc.i18n[fallback]) return loc.i18n[fallback] as LocationI18n;
  }
  const firstKey = Object.keys(loc.i18n)[0] as Lang | undefined;
  if (firstKey && loc.i18n[firstKey]) return loc.i18n[firstKey] as LocationI18n;
  return EMPTY_I18N;
}

function getOverlay(lang: Lang): I18nOverlay | undefined {
  return DATA_I18N[lang];
}

export function getLocationI18n(loc: Location, lang: Lang): LocationI18n {
  const base = pickBaseI18n(loc, lang);
  const overlay = getOverlay(lang)?.locations?.[loc.id];
  if (!overlay) return base;
  return { ...base, ...overlay };
}

export function getCoffeeLabel(event: CoffeeEvent, lang: Lang) {
  const key = `${event.location_id}@${event.ts}`;
  const overlayLabel = getOverlay(lang)?.coffee_events?.[key]?.label;
  if (overlayLabel) return overlayLabel;
  if (event.i18n[lang]?.label) return event.i18n[lang]?.label;
  for (const fallback of FALLBACK_CHAIN) {
    if (event.i18n[fallback]?.label) return event.i18n[fallback]?.label;
    const fallbackOverlay = getOverlay(fallback)?.coffee_events?.[key]?.label;
    if (fallbackOverlay) return fallbackOverlay;
  }
  return event.i18n.es.label;
}

export function getCategoryLabel(meta: CategoryMeta, lang: Lang) {
  return meta.label[lang] || meta.label[FALLBACK_CHAIN[0]] || meta.label.es;
}

export function getLocationSearchText(loc: Location) {
  const texts: string[] = [];
  Object.values(loc.i18n || {}).forEach((value) => {
    texts.push(value.name, value.scene, value.production_note);
    (value.trivia || []).forEach((item) => texts.push(item));
  });
  LOCALES.forEach((locale) => {
    const overlay = getOverlay(locale)?.locations?.[loc.id];
    if (!overlay) return;
    if (overlay.name) texts.push(overlay.name);
    if (overlay.scene) texts.push(overlay.scene);
    if (overlay.production_note) texts.push(overlay.production_note);
  });
  return texts.filter(Boolean).join(' ').toLowerCase();
}
