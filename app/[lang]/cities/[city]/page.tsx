import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../../data';
import { UI_TEXT } from '../../../../lib/uiText';
import type { Lang } from '../../../../lib/types';
import { breadcrumbJsonLd } from '../../../../lib/seo';

const CITY_MAP = {
  nyc: { name: 'New York', labelEs: 'Nueva York', labelEn: 'New York' },
  paris: { name: 'Paris', labelEs: 'París', labelEn: 'Paris' }
} as const;

type CityKey = keyof typeof CITY_MAP;

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return (['nyc', 'paris'] as CityKey[]).map((city) => ({ city }));
};

export async function generateMetadata({
  params
}: {
  params: { lang: Lang; city: CityKey };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const cityInfo = CITY_MAP[params.city];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title =
    lang === 'es'
      ? `Locaciones en ${cityInfo.labelEs} — The Devil Wears Prada`
      : `Locations in ${cityInfo.labelEn} — The Devil Wears Prada`;
  const description =
    lang === 'es'
      ? `Recorrido por las locaciones de la película en ${cityInfo.labelEs}.`
      : `A tour of the film’s locations in ${cityInfo.labelEn}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/cities/${params.city}`,
      languages: {
        es: `${baseUrl}/es/cities/${params.city}`,
        en: `${baseUrl}/en/cities/${params.city}`
      }
    }
  };
}

export default function Page({ params }: { params: { lang: Lang; city: CityKey } }) {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];
  const cityInfo = CITY_MAP[params.city];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const locations = DATA.locations.filter((loc) => loc.city === cityInfo.name);

  const breadcrumbs = breadcrumbJsonLd(baseUrl, lang, [
    { name: lang === 'es' ? 'Inicio' : 'Home', path: `/${lang}` },
    { name: lang === 'es' ? 'Ciudades' : 'Cities', path: `/${lang}/cities/${params.city}` }
  ]);

  return (
    <div className="landing">
      <div className="container">
        <div className="section">
          <h1>
            {lang === 'es' ? `Locaciones en ${cityInfo.labelEs}` : `Locations in ${cityInfo.labelEn}`}
          </h1>
          <p className="meta">
            {lang === 'es'
              ? `Puntos clave del film en ${cityInfo.labelEs}.`
              : `Key film points in ${cityInfo.labelEn}.`}
          </p>
        </div>

        <div className="section">
          <div className="location-grid">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${lang}/locations/${loc.id}`}
                className="location-card"
              >
                <div className="name">{loc.i18n[lang].name}</div>
                <div className="meta">{loc.i18n[lang].scene}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="section">
          <Link href={`/${lang}/map`} className="cta-button">
            {ui.landing.ctaPrimary}
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
