export type UiText = {
  filmTitle: string;
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
  seoContext: {
    locations: { title: string; body: string; cta: string };
    locationDetail: { title: string; body: string; cta: string };
    city: { title: string; body: string; cta: string };
    faq: { title: string; body: string; cta: string };
  };
  labels: {
    viewAllFaqs: string;
    locationsTitle: string;
    locationsDescription: string;
    cityTitle: string;
    cityDescription: string;
    notFoundTitle: string;
    backToList: string;
    sceneLabel: string;
    productionLabel: string;
    triviaLabel: string;
    mapLocationLabel: string;
    breadcrumbHome: string;
    breadcrumbLocations: string;
    breadcrumbCities: string;
  };
  meta: {
    home: { title: string; description: string };
    map: { title: string; description: string };
    locations: { title: string; description: string };
    faq: { title: string; description: string };
    city: { title: string; description: string };
  };
};
