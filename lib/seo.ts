import type { Lang, Location } from './types';
import { getLocationI18n } from './i18n';

export function movieJsonLd(baseUrl: string, lang: Lang) {
  const description = lang === 'en'
    ? 'Interactive map of locations, scenes, and key moments from The Devil Wears Prada.'
    : lang === 'pt'
      ? 'Mapa interativo de locações, cenas e momentos-chave de O Diabo Veste Prada (The Devil Wears Prada).'
      : 'Mapa interactivo de locaciones, escenas y momentos clave de El Diablo se viste a la moda (The Devil Wears Prada).';
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: lang === 'en' ? 'The Devil Wears Prada' : lang === 'pt' ? 'O Diabo Veste Prada' : 'El Diablo se viste a la moda',
    alternateName: lang === 'en' ? 'El Diablo se viste a la moda' : 'The Devil Wears Prada',
    description,
    url: `${baseUrl}/${lang}`
  };
}

export function placeJsonLd(baseUrl: string, lang: Lang, loc: Location) {
  const t = getLocationI18n(loc, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: t.name,
    description: t.scene,
    address: loc.address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lng
    },
    url: `${baseUrl}/${lang}/locations/${loc.id}`
  };
}

export function faqJsonLd(baseUrl: string, lang: Lang, items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    })),
    url: `${baseUrl}/${lang}/faq`
  };
}

export function breadcrumbJsonLd(baseUrl: string, lang: Lang, crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path}`
    }))
  };
}
