import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();
  return [
    { url: `${baseUrl}/es`, lastModified: now },
    { url: `${baseUrl}/en`, lastModified: now }
  ];
}
