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
  footer: {
    donateText: string;
    donateCta: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    previewAlt: string;
    highlightsTitle: string;
    highlights: { icon: string; title: string; description: string }[];
    topLocationsTitle: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
};

export const UI_TEXT: Record<Lang, UiText> = {
  es: {
    title: 'El Diablo se viste a la moda\nCinematic Map v2',
    subtitle: 'Mapa interactivo de locaciones y escenas de la película',
    introTitle: 'Sobre la película y el mapa',
    introBody: [
      'Recorre Nueva York y París a través de las locaciones más icónicas de El Diablo se viste a la moda.',
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
      shareText: 'Mapa de locaciones de El Diablo se viste a la moda'
    },
    share: {
      title: 'Compartir',
      copy: 'Copiar link',
      copied: 'Link copiado'
    },
    footer: {
      donateText: 'Si te gusta el mapa, nos puedes donar un café.',
      donateCta: 'Donar un café'
    },
    landing: {
      heroTitle: 'Explora las locaciones de El Diablo se viste a la moda',
      heroSubtitle:
        'Mapa cinematográfico con escenas, timestamps y contexto de producción. También conocido como The Devil Wears Prada.',
      ctaPrimary: 'Ver mapa',
      ctaSecondary: 'Ver locaciones',
      previewAlt: 'Preview del mapa de locaciones de El Diablo se viste a la moda',
      highlightsTitle: 'Qué encontrarás',
      highlights: [
        {
          icon: '🗺️',
          title: 'Locaciones reales',
          description: 'Direcciones exactas y aproximadas con notas de producción.'
        },
        {
          icon: '🎬',
          title: 'Momentos clave',
          description: 'Escenas, timestamps y narrativa conectada al mapa.'
        },
        {
          icon: '🗽',
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
        },
        {
          q: '¿El mapa incluye direcciones exactas?',
          a: 'Sí, cuando están confirmadas en fuentes de producción. Lo demás se marca como aproximado.'
        },
        {
          q: '¿Por qué hay locaciones “aprox”?',
          a: 'Porque algunas escenas se filmaron en sets o montajes y solo se puede ubicar una zona representativa.'
        },
        {
          q: '¿Puedo visitar todas las locaciones?',
          a: 'Las locaciones exteriores son visitables. Algunas interiores son sets o privados.'
        },
        {
          q: '¿Dónde está la escena del beneficio del museo?',
          a: 'El exterior fue en el American Museum of Natural History y el interior se filmó en Foley Square.'
        },
        {
          q: '¿Qué significa el timeline de cafés?',
          a: 'Es una lectura narrativa de los momentos en que el café marca el ritmo de la historia.'
        },
        {
          q: '¿El mapa se actualizará con nuevas fuentes?',
          a: 'Sí. Vamos agregando referencias y corrigiendo datos cuando aparecen fuentes más precisas.'
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
    footer: {
      donateText: 'If you like the map, you can buy us a coffee.',
      donateCta: 'Buy a coffee'
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
          icon: '🗺️',
          title: 'Real-world locations',
          description: 'Exact and approximate addresses with production notes.'
        },
        {
          icon: '🎬',
          title: 'Key moments',
          description: 'Scenes, timestamps, and narrative context tied to the map.'
        },
        {
          icon: '🗽',
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
        },
        {
          q: 'Does the map include exact addresses?',
          a: 'Yes, when they are confirmed by production sources. Otherwise they are marked as approximate.'
        },
        {
          q: 'Why are some locations “approx”?',
          a: 'Some scenes were shot on sets or montages, so only a representative area can be mapped.'
        },
        {
          q: 'Can I visit all the locations?',
          a: 'Exterior locations are visitable. Some interiors are sets or private spaces.'
        },
        {
          q: 'Where was the museum benefit scene filmed?',
          a: 'The exterior was at the American Museum of Natural History, and the interior was shot in Foley Square.'
        },
        {
          q: 'What does the coffee timeline mean?',
          a: 'It is a narrative reading of moments where coffee sets the pace of the story.'
        },
        {
          q: 'Will the map be updated with new sources?',
          a: 'Yes. We add references and correct details when more precise sources appear.'
        }
      ]
    }
  }
};
