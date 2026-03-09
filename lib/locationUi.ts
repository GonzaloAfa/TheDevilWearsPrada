import type { Lang } from './types';

export function cityDisplayName(city: string, lang: Lang) {
  if (city === 'New York') {
    if (lang === 'pt') return 'Nova York';
    return lang === 'es' ? 'Nueva York' : 'New York';
  }
  if (city === 'Paris') return lang === 'es' ? 'París' : 'Paris';
  return city;
}

export function cityHint(city: string, lang: Lang) {
  const mapLabel = lang === 'en' ? '🗺️ Map' : '🗺️ Mapa';
  if (city === 'New York') {
    return mapLabel;
  }
  if (city === 'Paris') {
    return mapLabel;
  }
  return mapLabel;
}
