import type { Location } from './types';

export function movieJsonLd(baseUrl: string, lang: 'es' | 'en') {
  const description =
    lang === 'es'
      ? 'Mapa interactivo de locaciones, escenas y momentos clave de El Diablo se viste a la moda (The Devil Wears Prada).'
      : 'Interactive map of locations, scenes, and key moments from The Devil Wears Prada.';
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: lang === 'es' ? 'El Diablo se viste a la moda' : 'The Devil Wears Prada',
    alternateName: lang === 'es' ? 'The Devil Wears Prada' : 'El Diablo se viste a la moda',
    description,
    url: `${baseUrl}/${lang}`
  };
}

export function placeJsonLd(baseUrl: string, lang: 'es' | 'en', loc: Location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: loc.i18n[lang].name,
    description: loc.i18n[lang].scene,
    address: loc.address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.lat,
      longitude: loc.lng
    },
    url: `${baseUrl}/${lang}/locations/${loc.id}`
  };
}

export function faqJsonLd(baseUrl: string, lang: 'es' | 'en', items: { q: string; a: string }[]) {
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

export function breadcrumbJsonLd(baseUrl: string, lang: 'es' | 'en', crumbs: { name: string; path: string }[]) {
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
