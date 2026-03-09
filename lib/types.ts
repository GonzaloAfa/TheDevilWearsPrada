export type Lang = 'es' | 'en' | 'pt' | 'fr' | 'de';

export type Dataset = {
  summary: {
    title: string;
    pins_total: number;
    exact_count: number;
    approx_count: number;
    coffee_events_total: number;
    brands_total: number;
  };
  locations: Location[];
  coffee_events: CoffeeEvent[];
  brands: string[];
};

export type Location = {
  id: string;
  category: CategoryKey;
  city: string;
  lat: number;
  lng: number;
  address: string;
  timestamp: string;
  coffee: number;
  brands: string[];
  confidence: 'exact' | 'approx';
  sources: string[];
  image_url: string;
  clip_url: string;
  i18n: {
    es: LocationI18n;
    en: LocationI18n;
    pt?: LocationI18n;
    fr?: LocationI18n;
    de?: LocationI18n;
  };
};

export type LocationI18n = {
  name: string;
  scene: string;
  production_note: string;
  trivia?: string[];
};

export type CoffeeEvent = {
  ts: string;
  location_id: string;
  i18n: {
    es: { label: string };
    en: { label: string };
    pt?: { label: string };
    fr?: { label: string };
    de?: { label: string };
  };
};

export type CategoryKey =
  | 'office'
  | 'media'
  | 'apartment'
  | 'restaurant'
  | 'fashion'
  | 'event'
  | 'hotel'
  | 'transit'
  | 'park'
  | 'street'
  | 'studio'
  | 'paris';

export type CategoryMeta = {
  icon: string;
  color: string;
  label: {
    es: string;
    en: string;
    pt?: string;
    fr?: string;
    de?: string;
  };
};
