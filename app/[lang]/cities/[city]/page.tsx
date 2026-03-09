import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../../data';
import { UI_TEXT } from '../../../../lib/uiText';
import type { Lang } from '../../../../lib/types';
import { breadcrumbJsonLd } from '../../../../lib/seo';
import { Footer } from '../../../../components/Footer';
import { CATEGORY_META } from '../../../../lib/categories';
import { cityDisplayName, cityHint } from '../../../../lib/locationUi';
import { SeoContext } from '../../../../components/SeoContext';
import { SiteHeader } from '../../../../components/SiteHeader';
import { getCategoryLabel, getLocationI18n, normalizeLang } from '../../../../lib/i18n';

const CITY_MAP = {
  nyc: { name: 'New York', labelEs: 'Nueva York', labelEn: 'New York', labelPt: 'Nova York' },
  paris: { name: 'Paris', labelEs: 'París', labelEn: 'Paris', labelPt: 'Paris' }
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
  const lang = normalizeLang(params.lang);
  const cityInfo = CITY_MAP[params.city];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title =
    lang === 'en'
      ? `Locations in ${cityInfo.labelEn} — The Devil Wears Prada`
      : lang === 'pt'
        ? `Locações em ${cityInfo.labelPt} — O Diabo Veste Prada`
        : `Locaciones en ${cityInfo.labelEs} — El Diablo se viste a la moda`;
  const description =
    lang === 'en'
      ? `A tour of the film’s locations in ${cityInfo.labelEn}.`
      : lang === 'pt'
        ? `Um tour pelas locações do filme em ${cityInfo.labelPt}.`
        : `Recorrido por las locaciones de El Diablo se viste a la moda (The Devil Wears Prada) en ${cityInfo.labelEs}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/cities/${params.city}`,
      languages: {
        es: `${baseUrl}/es/cities/${params.city}`,
        en: `${baseUrl}/en/cities/${params.city}`,
        pt: `${baseUrl}/pt/cities/${params.city}`
      }
    }
  };
}

export default function Page({ params }: { params: { lang: Lang; city: CityKey } }) {
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];
  const cityInfo = CITY_MAP[params.city];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const locations = DATA.locations.filter((loc) => loc.city === cityInfo.name);

  const breadcrumbs = breadcrumbJsonLd(baseUrl, lang, [
    { name: lang === 'en' ? 'Home' : lang === 'pt' ? 'Início' : 'Inicio', path: `/${lang}` },
    { name: lang === 'en' ? 'Cities' : lang === 'pt' ? 'Cidades' : 'Ciudades', path: `/${lang}/cities/${params.city}` }
  ]);

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix={`/cities/${params.city}`} />
        <div className="section">
          <h1>
            {lang === 'en'
              ? `Locations in ${cityInfo.labelEn}`
              : lang === 'pt'
                ? `Locações em ${cityInfo.labelPt}`
                : `Locaciones en ${cityInfo.labelEs}`}
          </h1>
          <p className="meta">
            {lang === 'en'
              ? `Key film points in ${cityInfo.labelEn}.`
              : lang === 'pt'
                ? `Pontos-chave do filme em ${cityInfo.labelPt}.`
                : `Puntos clave del film en ${cityInfo.labelEs}.`}
          </p>
        </div>

        <SeoContext lang={lang} variant="city" />

        <div className="section">
          <div className="location-grid">
            {locations.map((loc) => (
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
