import type { MetadataRoute } from 'next';
import { DATA } from '../data';
import { LOCALES } from '../lib/i18n';
import { getRequestSiteUrl } from '../lib/siteUrl';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getRequestSiteUrl();
  const now = new Date();
  const routes: string[] = [];

  LOCALES.forEach((lang) => {
    routes.push(`/${lang}`);
    routes.push(`/${lang}/map`);
    routes.push(`/${lang}/locations`);
    routes.push(`/${lang}/faq`);
    routes.push(`/${lang}/cities/nyc`);
    routes.push(`/${lang}/cities/paris`);
    DATA.locations.forEach((loc) => {
      routes.push(`/${lang}/locations/${loc.id}`);
    });
  });

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now
  }));
}
