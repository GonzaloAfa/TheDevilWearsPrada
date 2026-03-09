import type { MetadataRoute } from 'next';
import { DATA } from '../data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();
  const langs = ['es', 'en'] as const;
  const routes: string[] = [];

  langs.forEach((lang) => {
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
