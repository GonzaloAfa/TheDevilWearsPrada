import type { Lang } from './types';

export function cityDisplayName(city: string, lang: Lang) {
  if (city === 'New York') return lang === 'es' ? 'Nueva York' : 'New York';
  if (city === 'Paris') return lang === 'es' ? 'París' : 'Paris';
  return city;
}

export function cityHint(city: string, lang: Lang) {
  if (city === 'New York') {
    return lang === 'es' ? '🗺️ Mapa' : '🗺️ Map';
  }
  if (city === 'Paris') {
    return lang === 'es' ? '🗺️ Mapa' : '🗺️ Map';
  }
  return lang === 'es' ? '🗺️ Mapa' : '🗺️ Map';
}
