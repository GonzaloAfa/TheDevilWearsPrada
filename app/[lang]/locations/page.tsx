import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../data';
import { UI_TEXT } from '../../../lib/uiText';
import type { Lang } from '../../../lib/types';
import { Footer } from '../../../components/Footer';
import { CATEGORY_META } from '../../../lib/categories';
import { cityDisplayName, cityHint } from '../../../lib/locationUi';
import { SeoContext } from '../../../components/SeoContext';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'es'
    ? 'Locaciones — El Diablo se viste a la moda'
    : 'Locations — The Devil Wears Prada';
  const description = lang === 'es'
    ? 'Listado completo de locaciones y escenas de El Diablo se viste a la moda (The Devil Wears Prada).'
    : 'Complete list of locations and scenes from The Devil Wears Prada.';
  const imageUrl = `${baseUrl}/og.svg`;
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/locations`,
      languages: {
        es: `${baseUrl}/es/locations`,
        en: `${baseUrl}/en/locations`
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
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];

  return (
    <div className="landing">
      <div className="container">
        <div className="section">
          <h1>{lang === 'es' ? 'Locaciones' : 'Locations'}</h1>
          <p className="meta">
            {lang === 'es'
              ? 'Todas las locaciones de la película en un solo listado.'
              : 'All film locations in one list.'}
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
                <div className="name">{loc.i18n[lang].name}</div>
                <div className="meta">
                  📍 {cityDisplayName(loc.city, lang)}{' '}
                  {cityHint(loc.city, lang) ? `· ${cityHint(loc.city, lang)}` : ''}
                </div>
                <div className="meta">{loc.i18n[lang].scene}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="pill">
                    {CATEGORY_META[loc.category].icon} {CATEGORY_META[loc.category].label[lang]}
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
