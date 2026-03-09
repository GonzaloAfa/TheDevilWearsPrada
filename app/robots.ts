import type { MetadataRoute } from 'next';
import { getRequestSiteUrl } from '../lib/siteUrl';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getRequestSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
