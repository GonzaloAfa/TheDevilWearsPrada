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
  map: {
    panelTitle: string;
    panelCollapse: string;
    panelExpand: string;
    shareTitle: string;
    shareText: string;
  };
  share: {
    title: string;
    copy: string;
    copied: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    previewAlt: string;
    highlightsTitle: string;
    highlights: { title: string; description: string }[];
    topLocationsTitle: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
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
      pins: 'Pins'
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
    languageLabel: 'Idioma',
    map: {
      panelTitle: 'Panel del mapa',
      panelCollapse: 'Ocultar panel',
      panelExpand: 'Mostrar panel',
      shareTitle: 'Comparte este mapa',
      shareText: 'Mapa de locaciones de The Devil Wears Prada'
    },
    share: {
      title: 'Compartir',
      copy: 'Copiar link',
      copied: 'Link copiado'
    },
    landing: {
      heroTitle: 'Explora las locaciones de The Devil Wears Prada',
      heroSubtitle:
        'Mapa cinematográfico con escenas, timestamps y contexto de producción para fans de la película.',
      ctaPrimary: 'Ver mapa',
      ctaSecondary: 'Ver locaciones',
      previewAlt: 'Preview del mapa de locaciones de The Devil Wears Prada',
      highlightsTitle: 'Qué encontrarás',
      highlights: [
        {
          title: 'Locaciones reales',
          description: 'Direcciones exactas y aproximadas con notas de producción.'
        },
        {
          title: 'Momentos clave',
          description: 'Escenas, timestamps y narrativa conectada al mapa.'
        },
        {
          title: 'Nueva York y París',
          description: 'Dos ciudades esenciales para la estética del film.'
        }
      ],
      topLocationsTitle: 'Locaciones destacadas',
      faqTitle: 'Preguntas frecuentes',
      faq: [
        {
          q: '¿Las locaciones son reales?',
          a: 'Sí. El mapa combina direcciones confirmadas y aproximadas con fuentes de producción.'
        },
        {
          q: '¿Dónde se filmó el HQ de Runway?',
          a: 'En Midtown Manhattan, con exteriores del 1221 Avenue of the Americas.'
        },
        {
          q: '¿Hay escenas en París?',
          a: 'Sí. El mapa incluye puntos clave de Paris Fashion Week y el final de la película.'
        }
      ]
    }
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
      pins: 'Pins'
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
    languageLabel: 'Language',
    map: {
      panelTitle: 'Map panel',
      panelCollapse: 'Hide panel',
      panelExpand: 'Show panel',
      shareTitle: 'Share this map',
      shareText: 'The Devil Wears Prada locations map'
    },
    share: {
      title: 'Share',
      copy: 'Copy link',
      copied: 'Link copied'
    },
    landing: {
      heroTitle: 'Explore the locations of The Devil Wears Prada',
      heroSubtitle:
        'A cinematic map with scenes, timestamps, and production context for movie fans.',
      ctaPrimary: 'View map',
      ctaSecondary: 'View locations',
      previewAlt: 'Preview of The Devil Wears Prada locations map',
      highlightsTitle: 'What you will find',
      highlights: [
        {
          title: 'Real-world locations',
          description: 'Exact and approximate addresses with production notes.'
        },
        {
          title: 'Key moments',
          description: 'Scenes, timestamps, and narrative context tied to the map.'
        },
        {
          title: 'New York and Paris',
          description: 'Two cities essential to the film’s visual identity.'
        }
      ],
      topLocationsTitle: 'Featured locations',
      faqTitle: 'Frequently asked questions',
      faq: [
        {
          q: 'Are the locations real?',
          a: 'Yes. The map combines confirmed and approximate addresses with sources.'
        },
        {
          q: 'Where was the Runway HQ filmed?',
          a: 'In Midtown Manhattan, with exteriors at 1221 Avenue of the Americas.'
        },
        {
          q: 'Are there scenes in Paris?',
          a: 'Yes. The map includes key Paris Fashion Week and finale locations.'
        }
      ]
    }
  }
};
