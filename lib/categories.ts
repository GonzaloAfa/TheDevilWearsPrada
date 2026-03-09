import type { CategoryKey, CategoryMeta } from './types';

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  office: { icon: '🏢', color: '#c23d5f', label: { es: 'Oficina', en: 'Office' } },
  media: { icon: '📰', color: '#7888ff', label: { es: 'Medios', en: 'Media' } },
  apartment: { icon: '🏠', color: '#f3d08a', label: { es: 'Departamento', en: 'Apartment' } },
  restaurant: { icon: '🍽️', color: '#ff8c5a', label: { es: 'Restaurante', en: 'Restaurant' } },
  fashion: { icon: '👗', color: '#d56dff', label: { es: 'Moda', en: 'Fashion' } },
  event: { icon: '🎟️', color: '#46bea7', label: { es: 'Evento', en: 'Event' } },
  hotel: { icon: '🛎️', color: '#7fd2ff', label: { es: 'Hotel', en: 'Hotel' } },
  transit: { icon: '🚇', color: '#9faec3', label: { es: 'Transporte', en: 'Transit' } },
  park: { icon: '🌳', color: '#5fb768', label: { es: 'Parque', en: 'Park' } },
  street: { icon: '🚶', color: '#d1c8ba', label: { es: 'Calle / Montaje', en: 'Street / Montage' } },
  studio: { icon: '🎬', color: '#f25b5b', label: { es: 'Estudio', en: 'Studio' } },
  paris: { icon: '🇫🇷', color: '#4f79ff', label: { es: 'París', en: 'Paris' } }
};
