import type { MetadataRoute } from 'next';
import { getConfiguredSiteUrl } from '../lib/siteUrl';

const BASE_URL = getConfiguredSiteUrl() || 'https://thedevilwearspradamap.afachile.cl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/cl/'
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}
