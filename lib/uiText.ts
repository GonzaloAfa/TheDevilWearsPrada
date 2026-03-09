import type { Lang } from './types';

export type UiText = {
  title: string;
  subtitle: string;
  introTitle: string;
  introBody: string[];
  stats: {
    pins: string;
    coffee: string;
    exact: string;
    approx: string;
  };
  searchPlaceholder: string;
  buttons: {
    tour: string;
    stop: string;
    fit: string;
    nyc: string;
    paris: string;
  };
  sections: {
    categories: string;
    timeline: string;
    pins: string;
  };
  empty: string;
  notesTitle: string;
  notes: string[];
  popup: {
    timestamp: string;
    city: string;
    address: string;
    confidence: string;
    coffee: string;
    exact: string;
    approx: string;
    noBrands: string;
    maps: string;
    clip: string;
  };
  languageSwitch: string;
  languageLabel: string;
};

export const UI_TEXT: Record<Lang, UiText> = {
  es: {
    title: 'The Devil Wears Prada\nCinematic Map v2',
    subtitle: 'Mapa interactivo de locaciones y escenas de la película',
    introTitle: 'Sobre la película y el mapa',
    introBody: [
      'Recorre Nueva York y París a través de las locaciones más icónicas de The Devil Wears Prada.',
      'Explora escenas, marcas y momentos clave con un mapa pensado para fans del film.'
    ],
    stats: {
      pins: 'Pins visibles',
      coffee: 'Cafés Miranda',
      exact: 'Exactas',
      approx: 'Aprox'
    },
    searchPlaceholder: 'Buscar locación, escena, marca o dirección',
    buttons: {
      tour: '🧭 Tour',
      stop: '⏸ Detener',
      fit: '🗺 Ver todo',
      nyc: 'NYC',
      paris: 'París'
    },
    sections: {
      categories: 'Categorías',
      timeline: 'Timeline de cafés',
      pins: 'Pins',
    },
    empty: 'No hay resultados.',
    notesTitle: 'Notas del dataset',
    notes: [
      'Las locaciones exactas salen de fichas de producción o tablas repetidas por varias fuentes.',
      'Las locaciones “aprox” representan montajes, áreas o puntos útiles para el relato cinematográfico.',
      'El contador de cafés es una lectura curada para destacar un recurso narrativo de la película.'
    ],
    popup: {
      timestamp: 'Timestamp',
      city: 'Ciudad',
      address: 'Dirección',
      confidence: 'Confianza',
      coffee: 'Café',
      exact: 'exacta',
      approx: 'aproximada',
      noBrands: 'Sin marcas',
      maps: 'Abrir en Maps',
      clip: 'Buscar clip'
    },
    languageSwitch: 'EN',
    languageLabel: 'Idioma'
  },
  en: {
    title: 'The Devil Wears Prada\nCinematic Map v2',
    subtitle: 'Interactive map of the film’s locations and scenes',
    introTitle: 'About the film and the map',
    introBody: [
      'Walk through New York and Paris via the most iconic locations from The Devil Wears Prada.',
      'Explore scenes, brands, and key moments with a map built for movie fans.'
    ],
    stats: {
      pins: 'Visible pins',
      coffee: 'Miranda coffees',
      exact: 'Exact',
      approx: 'Approx'
    },
    searchPlaceholder: 'Search location, scene, brand or address',
    buttons: {
      tour: '🧭 Tour',
      stop: '⏸ Stop',
      fit: '🗺 View all',
      nyc: 'NYC',
      paris: 'Paris'
    },
    sections: {
      categories: 'Categories',
      timeline: 'Coffee timeline',
      pins: 'Pins',
    },
    empty: 'No results.',
    notesTitle: 'Dataset notes',
    notes: [
      'Exact locations come from production sheets or tables repeated across multiple sources.',
      '“Approx” locations represent montages, areas, or points useful for the film narrative.',
      'The coffee counter is curated to highlight a narrative device in the movie.'
    ],
    popup: {
      timestamp: 'Timestamp',
      city: 'City',
      address: 'Address',
      confidence: 'Confidence',
      coffee: 'Coffee',
      exact: 'exact',
      approx: 'approx',
      noBrands: 'No brands',
      maps: 'Open in Maps',
      clip: 'Search clip'
    },
    languageSwitch: 'ES',
    languageLabel: 'Language'
  }
};
