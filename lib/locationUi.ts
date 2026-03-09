import type { Lang } from './types';

export function cityDisplayName(city: string, lang: Lang) {
  if (city === 'New York') return lang === 'es' ? 'Nueva York' : 'New York';
  if (city === 'Paris') return lang === 'es' ? 'París' : 'Paris';
  return city;
}

export function cityHint(city: string, lang: Lang) {
  if (city === 'New York') {
    return lang === 'es' ? '🗽 Estatua de la Libertad' : '🗽 Statue of Liberty';
  }
  if (city === 'Paris') {
    return lang === 'es' ? '🗼 Torre Eiffel' : '🗼 Eiffel Tower';
  }
  return '';
}
