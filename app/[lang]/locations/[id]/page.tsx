import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../../data';
import { UI_TEXT } from '../../../../lib/uiText';
import type { Lang } from '../../../../lib/types';
import { placeJsonLd, breadcrumbJsonLd } from '../../../../lib/seo';
import { ShareBar } from '../../../../components/ShareBar';
import { Footer } from '../../../../components/Footer';
import { LocationMiniMap } from '../../../../components/LocationMiniMap';
import { SeoContext } from '../../../../components/SeoContext';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return DATA.locations.map((loc) => ({ id: loc.id }));
};

export async function generateMetadata({
  params
}: {
  params: { lang: Lang; id: string };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const loc = DATA.locations.find((l) => l.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = `${baseUrl}/og.svg`;

  if (!loc) {
    return {
      title: lang === 'es' ? 'Locación no encontrada' : 'Location not found'
    };
  }

  const title =
    lang === 'es'
      ? `${loc.i18n[lang].name} — El Diablo se viste a la moda`
      : `${loc.i18n[lang].name} — The Devil Wears Prada`;
  const description = loc.i18n[lang].scene;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/locations/${loc.id}`,
      languages: {
        es: `${baseUrl}/es/locations/${loc.id}`,
        en: `${baseUrl}/en/locations/${loc.id}`
      }
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/locations/${loc.id}`,
      type: 'article',
      images: [{ url: imageUrl }]
    }
  };
}

export default function Page({ params }: { params: { lang: Lang; id: string } }) {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];
  const loc = DATA.locations.find((l) => l.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!loc) {
    return (
      <div className="landing">
        <div className="container">
          <div className="section">
            <h1>{lang === 'es' ? 'Locación no encontrada' : 'Location not found'}</h1>
            <Link href={`/${lang}/locations`} className="cta-secondary">
              {lang === 'es' ? 'Volver al listado' : 'Back to list'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shareUrl = `${baseUrl}/${lang}/locations/${loc.id}`;
  const placeLd = placeJsonLd(baseUrl, lang, loc);
  const breadcrumbs = breadcrumbJsonLd(baseUrl, lang, [
    { name: lang === 'es' ? 'Inicio' : 'Home', path: `/${lang}` },
    { name: lang === 'es' ? 'Locaciones' : 'Locations', path: `/${lang}/locations` },
    { name: loc.i18n[lang].name, path: `/${lang}/locations/${loc.id}` }
  ]);

  return (
    <div className="landing">
      <div className="container">
        <div className="section">
          <h1>{loc.i18n[lang].name}</h1>
          <p className="meta">{loc.address}</p>
          <div className="cta-row">
            <Link href={`/${lang}/map`} className="cta-button">
              {ui.landing.ctaPrimary}
            </Link>
            <a
              className="cta-secondary"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                loc.lat + ',' + loc.lng
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              {ui.popup.maps}
            </a>
          </div>
        </div>

        <SeoContext lang={lang} variant="locationDetail" />

        <div className="section">
          <div className="name">{lang === 'es' ? 'Escena' : 'Scene'}</div>
          <div className="meta">{loc.i18n[lang].scene}</div>
          <div className="name" style={{ marginTop: 16 }}>
            {lang === 'es' ? 'Notas de producción' : 'Production notes'}
          </div>
          <div className="meta">{loc.i18n[lang].production_note}</div>
          <div className="name" style={{ marginTop: 16 }}>
            {ui.popup.timestamp}
          </div>
          <div className="meta">{loc.timestamp}</div>
        </div>

        <div className="section">
          <div className="name" style={{ marginBottom: 12 }}>
            {lang === 'es' ? 'Ubicación en el mapa' : 'Map location'}
          </div>
          <LocationMiniMap lat={loc.lat} lng={loc.lng} label={loc.i18n[lang].name} />
        </div>

        <div className="section">
          <ShareBar url={shareUrl} title={loc.i18n[lang].name} labels={ui.share} />
        </div>

        <div className="section">
          <Link href={`/${lang}/locations`} className="cta-secondary">
            {lang === 'es' ? 'Volver al listado' : 'Back to list'}
          </Link>
        </div>

        <Footer lang={lang} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </div>
  );
}
