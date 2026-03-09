import type { CategoryKey, CategoryMeta } from './types';

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  office: { icon: '🏢', color: '#c23d5f', label: { es: 'Oficina', en: 'Office', pt: 'Escritório' } },
  media: { icon: '📰', color: '#7888ff', label: { es: 'Medios', en: 'Media', pt: 'Mídia' } },
  apartment: { icon: '🏠', color: '#f3d08a', label: { es: 'Departamento', en: 'Apartment', pt: 'Apartamento' } },
  restaurant: { icon: '🍽️', color: '#ff8c5a', label: { es: 'Restaurante', en: 'Restaurant', pt: 'Restaurante' } },
  fashion: { icon: '👗', color: '#d56dff', label: { es: 'Moda', en: 'Fashion', pt: 'Moda' } },
  event: { icon: '🎟️', color: '#46bea7', label: { es: 'Evento', en: 'Event', pt: 'Evento' } },
  hotel: { icon: '🛎️', color: '#7fd2ff', label: { es: 'Hotel', en: 'Hotel', pt: 'Hotel' } },
  transit: { icon: '🚇', color: '#9faec3', label: { es: 'Transporte', en: 'Transit', pt: 'Transporte' } },
  park: { icon: '🌳', color: '#5fb768', label: { es: 'Parque', en: 'Park', pt: 'Parque' } },
  street: { icon: '🚶', color: '#d1c8ba', label: { es: 'Calle / Montaje', en: 'Street / Montage', pt: 'Rua / Montagem' } },
  studio: { icon: '🎬', color: '#f25b5b', label: { es: 'Estudio', en: 'Studio', pt: 'Estúdio' } },
  paris: { icon: '🇫🇷', color: '#4f79ff', label: { es: 'París', en: 'Paris', pt: 'Paris' } }
};
