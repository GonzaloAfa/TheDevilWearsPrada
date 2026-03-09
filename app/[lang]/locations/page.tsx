import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../data';
import { UI_TEXT } from '../../../lib/uiText';
import type { Lang } from '../../../lib/types';
import { Footer } from '../../../components/Footer';
import { CATEGORY_META } from '../../../lib/categories';
import { cityDisplayName, cityHint } from '../../../lib/locationUi';
import { SeoContext } from '../../../components/SeoContext';
import { SiteHeader } from '../../../components/SiteHeader';
import { getCategoryLabel, getLocationI18n, normalizeLang } from '../../../lib/i18n';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'en'
    ? 'Locations — The Devil Wears Prada'
    : lang === 'pt'
      ? 'Locações — O Diabo Veste Prada'
      : 'Locaciones — El Diablo se viste a la moda';
  const description = lang === 'en'
    ? 'Complete list of locations and scenes from The Devil Wears Prada.'
    : lang === 'pt'
      ? 'Lista completa de locações e cenas de O Diabo Veste Prada (The Devil Wears Prada).'
      : 'Listado completo de locaciones y escenas de El Diablo se viste a la moda (The Devil Wears Prada).';
  const imageUrl = `${baseUrl}/og.svg`;
  return {
    title,
    description,
      alternates: {
        canonical: `${baseUrl}/${lang}/locations`,
        languages: {
          es: `${baseUrl}/es/locations`,
          en: `${baseUrl}/en/locations`,
          pt: `${baseUrl}/pt/locations`
        }
      },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/locations`,
      type: 'website',
      images: [{ url: imageUrl }]
    }
  };
}

export default function Page({ params }: { params: { lang: Lang } }) {
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix="/locations" />
        <div className="section">
          <h1>{lang === 'en' ? 'Locations' : lang === 'pt' ? 'Locações' : 'Locaciones'}</h1>
          <p className="meta">
            {lang === 'en'
              ? 'All film locations in one list.'
              : lang === 'pt'
                ? 'Todas as locações do filme em uma única lista.'
                : 'Todas las locaciones de la película en un solo listado.'}
          </p>
        </div>

        <SeoContext lang={lang} variant="locations" />

        <div className="section">
          <div className="location-grid">
            {DATA.locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${lang}/locations/${loc.id}`}
                className="location-card"
              >
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

        <Footer lang={lang} />
      </div>
    </div>
  );
}
