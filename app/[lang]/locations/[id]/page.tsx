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
import { SiteHeader } from '../../../../components/SiteHeader';
import { getLocationI18n, normalizeLang } from '../../../../lib/i18n';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return DATA.locations.map((loc) => ({ id: loc.id }));
};

export async function generateMetadata({
  params
}: {
  params: { lang: Lang; id: string };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const loc = DATA.locations.find((l) => l.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = `${baseUrl}/og.svg`;

  if (!loc) {
    return {
      title: lang === 'en' ? 'Location not found' : lang === 'pt' ? 'Locação não encontrada' : 'Locación no encontrada'
    };
  }

  const t = getLocationI18n(loc, lang);
  const title =
    lang === 'en'
      ? `${t.name} — The Devil Wears Prada`
      : lang === 'pt'
        ? `${t.name} — O Diabo Veste Prada`
        : `${t.name} — El Diablo se viste a la moda`;
  const description = t.scene;

  return {
    title,
    description,
      alternates: {
        canonical: `${baseUrl}/${lang}/locations/${loc.id}`,
        languages: {
          es: `${baseUrl}/es/locations/${loc.id}`,
          en: `${baseUrl}/en/locations/${loc.id}`,
          pt: `${baseUrl}/pt/locations/${loc.id}`
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
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];
  const loc = DATA.locations.find((l) => l.id === params.id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!loc) {
    return (
      <div className="landing">
        <div className="container">
          <div className="section">
            <h1>{lang === 'en' ? 'Location not found' : lang === 'pt' ? 'Locação não encontrada' : 'Locación no encontrada'}</h1>
            <Link href={`/${lang}/locations`} className="cta-secondary">
              {lang === 'en' ? 'Back to list' : lang === 'pt' ? 'Voltar à lista' : 'Volver al listado'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const t = getLocationI18n(loc, lang);
  const shareUrl = `${baseUrl}/${lang}/locations/${loc.id}`;
  const placeLd = placeJsonLd(baseUrl, lang, loc);
  const breadcrumbs = breadcrumbJsonLd(baseUrl, lang, [
    { name: lang === 'en' ? 'Home' : lang === 'pt' ? 'Início' : 'Inicio', path: `/${lang}` },
    { name: lang === 'en' ? 'Locations' : lang === 'pt' ? 'Locações' : 'Locaciones', path: `/${lang}/locations` },
    { name: t.name, path: `/${lang}/locations/${loc.id}` }
  ]);

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix={`/locations/${loc.id}`} />
        <div className="section">
          <h1>{t.name}</h1>
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
          <div className="name">{lang === 'en' ? 'Scene' : lang === 'pt' ? 'Cena' : 'Escena'}</div>
          <div className="meta">{t.scene}</div>
          <div className="name" style={{ marginTop: 16 }}>
            {lang === 'en' ? 'Production notes' : lang === 'pt' ? 'Notas de produção' : 'Notas de producción'}
          </div>
          <div className="meta">{t.production_note}</div>
          <div className="name" style={{ marginTop: 16 }}>
            {ui.popup.timestamp}
          </div>
          <div className="meta">{loc.timestamp}</div>
        </div>

        <div className="section">
          <div className="name" style={{ marginBottom: 12 }}>
            {lang === 'en' ? 'Map location' : lang === 'pt' ? 'Localização no mapa' : 'Ubicación en el mapa'}
          </div>
          <LocationMiniMap lat={loc.lat} lng={loc.lng} label={t.name} />
        </div>

        <div className="section">
          <ShareBar url={shareUrl} title={t.name} labels={ui.share} />
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
