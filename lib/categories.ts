import type { CategoryKey, CategoryMeta } from './types';

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  office: { icon: '🏢', color: '#c23d5f', label: { es: 'Oficina', en: 'Office', pt: 'Escritório', fr: 'Bureau', de: 'Büro' } },
  media: { icon: '📰', color: '#7888ff', label: { es: 'Medios', en: 'Media', pt: 'Mídia', fr: 'Médias', de: 'Medien' } },
  apartment: { icon: '🏠', color: '#f3d08a', label: { es: 'Departamento', en: 'Apartment', pt: 'Apartamento', fr: 'Appartement', de: 'Wohnung' } },
  restaurant: { icon: '🍽️', color: '#ff8c5a', label: { es: 'Restaurante', en: 'Restaurant', pt: 'Restaurante', fr: 'Restaurant', de: 'Restaurant' } },
  fashion: { icon: '👗', color: '#d56dff', label: { es: 'Moda', en: 'Fashion', pt: 'Moda', fr: 'Mode', de: 'Mode' } },
  event: { icon: '🎟️', color: '#46bea7', label: { es: 'Evento', en: 'Event', pt: 'Evento', fr: 'Événement', de: 'Event' } },
  hotel: { icon: '🛎️', color: '#7fd2ff', label: { es: 'Hotel', en: 'Hotel', pt: 'Hotel', fr: 'Hôtel', de: 'Hotel' } },
  transit: { icon: '🚇', color: '#9faec3', label: { es: 'Transporte', en: 'Transit', pt: 'Transporte', fr: 'Transport', de: 'Verkehr' } },
  park: { icon: '🌳', color: '#5fb768', label: { es: 'Parque', en: 'Park', pt: 'Parque', fr: 'Parc', de: 'Park' } },
  street: { icon: '🚶', color: '#d1c8ba', label: { es: 'Calle / Montaje', en: 'Street / Montage', pt: 'Rua / Montagem', fr: 'Rue / Montage', de: 'Straße / Montage' } },
  studio: { icon: '🎬', color: '#f25b5b', label: { es: 'Estudio', en: 'Studio', pt: 'Estúdio', fr: 'Studio', de: 'Studio' } },
  paris: { icon: '🇫🇷', color: '#4f79ff', label: { es: 'París', en: 'Paris', pt: 'Paris', fr: 'Paris', de: 'Paris' } }
};
