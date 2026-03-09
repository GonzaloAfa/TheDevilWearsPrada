import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../../data';
import type { Lang } from '../../../../lib/types';
import { breadcrumbJsonLd } from '../../../../lib/seo';
import { Footer } from '../../../../components/Footer';
import { LocationImage } from '../../../../components/LocationImage';
import { CATEGORY_META } from '../../../../lib/categories';
import { cityDisplayName, cityHint } from '../../../../lib/locationUi';
import { SeoContext } from '../../../../components/SeoContext';
import { SiteHeader } from '../../../../components/SiteHeader';
import {
  getCategoryLabel,
  getLocationI18n,
  normalizeLang,
  LOCALES,
  loadMessages,
  asUiText
} from '../../../../lib/i18n';

const CITY_MAP = {
  nyc: { name: 'New York' },
  paris: { name: 'Paris' }
} as const;

type CityKey = keyof typeof CITY_MAP;

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return LOCALES.flatMap((lang) =>
    (['nyc', 'paris'] as CityKey[]).map((city) => ({ lang, city }))
  );
};

export async function generateMetadata({
  params
}: {
  params: { lang: Lang; city: CityKey };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const cityInfo = CITY_MAP[params.city];
  const ui = asUiText(await loadMessages(lang));
  const cityLabel = cityDisplayName(cityInfo.name, lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = ui.meta.city.title.replace('{city}', cityLabel);
  const description = ui.meta.city.description.replace('{city}', cityLabel);
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${baseUrl}/${locale}/cities/${params.city}`])
  );
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/cities/${params.city}`,
      languages
    }
  };
}

export default async function Page({ params }: { params: { lang: Lang; city: CityKey } }) {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const cityInfo = CITY_MAP[params.city];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const cityLabel = cityDisplayName(cityInfo.name, lang);
  const locations = DATA.locations.filter((loc) => loc.city === cityInfo.name);

  const breadcrumbs = breadcrumbJsonLd(baseUrl, lang, [
    { name: ui.labels.breadcrumbHome, path: `/${lang}` },
    { name: ui.labels.breadcrumbCities, path: `/${lang}/cities/${params.city}` }
  ]);

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix={`/cities/${params.city}`} />
        <div className="section">
          <h1>{ui.labels.cityTitle.replace('{city}', cityLabel)}</h1>
          <p className="meta">{ui.labels.cityDescription.replace('{city}', cityLabel)}</p>
        </div>

        <SeoContext variant="city" />

        <div className="section">
          <div className="location-grid">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${lang}/locations/${loc.id}`}
                className="location-card"
              >
                <LocationImage
                  src={loc.image_url}
                  alt={getLocationI18n(loc, lang).name}
                  className="location-image"
                />
                <div className="name">{getLocationI18n(loc, lang).name}</div>
                <div className="meta">
                  📍 {cityDisplayName(loc.city, lang)}{' '}
                  {cityHint(loc.city, lang) ? `· ${cityHint(loc.city, lang)}` : ''}
                </div>
                <div className="meta">{getLocationI18n(loc, lang).scene}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="pill">
                    {CATEGORY_META[loc.category].icon} {getCategoryLabel(CATEGORY_META[loc.category], lang)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <Link href={`/${lang}/map`} className="cta-button">
            {ui.landing.ctaPrimary}
          </Link>
        </div>

        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
