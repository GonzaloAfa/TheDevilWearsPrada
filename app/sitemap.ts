import type { MetadataRoute } from 'next';
import { DATA } from '../data';
import { LOCALES } from '../lib/i18n';
import { getConfiguredSiteUrl } from '../lib/siteUrl';

const INDEXABLE_LOCALES = LOCALES.filter((l) => l !== 'cl');
const BASE_URL = getConfiguredSiteUrl() || 'https://thedevilwearspradamap.afachile.cl';
const LAST_MODIFIED = new Date('2026-03-28');

type Entry = {
  route: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [];

  INDEXABLE_LOCALES.forEach((lang) => {
    entries.push({ route: `/${lang}`, priority: 1.0, changeFrequency: 'weekly' });
    entries.push({ route: `/${lang}/map`, priority: 0.9, changeFrequency: 'monthly' });
    entries.push({ route: `/${lang}/locations`, priority: 0.8, changeFrequency: 'weekly' });
    entries.push({ route: `/${lang}/faq`, priority: 0.5, changeFrequency: 'monthly' });
    entries.push({ route: `/${lang}/cities/nyc`, priority: 0.8, changeFrequency: 'monthly' });
    entries.push({ route: `/${lang}/cities/paris`, priority: 0.8, changeFrequency: 'monthly' });
    DATA.locations.forEach((loc) => {
      entries.push({ route: `/${lang}/locations/${loc.id}`, priority: 0.6, changeFrequency: 'monthly' });
    });
  });

  return entries.map((e) => ({
    url: `${BASE_URL}${e.route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: e.changeFrequency,
    priority: e.priority
  }));
}
