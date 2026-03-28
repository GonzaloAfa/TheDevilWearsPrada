import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../../data';
import type { Lang } from '../../../../lib/types';
import { placeJsonLd, breadcrumbJsonLd } from '../../../../lib/seo';
import { ShareBar } from '../../../../components/ShareBar';
import { Footer } from '../../../../components/Footer';
import { LocationMiniMap } from '../../../../components/LocationMiniMap';
import { LocationImage } from '../../../../components/LocationImage';
import { SeoContext } from '../../../../components/SeoContext';
import { SiteHeader } from '../../../../components/SiteHeader';
import { getLocationI18n, normalizeLang, LOCALES, loadMessages, asUiText } from '../../../../lib/i18n';
import { getRequestSiteUrl } from '../../../../lib/siteUrl';
import { buildAlternates } from '../../../../lib/seo-alternates';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  return LOCALES.flatMap((lang) => DATA.locations.map((loc) => ({ lang, id: loc.id })));
};

export async function generateMetadata({
  params
}: {
  params: { lang: Lang; id: string };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const loc = DATA.locations.find((l) => l.id === params.id);
  const ui = asUiText(await loadMessages(lang));
  const baseUrl = getRequestSiteUrl();
  const imageUrl = `${baseUrl}/og.svg`;

  if (!loc) {
    return {
      title: ui.labels.notFoundTitle
    };
  }

  const t = getLocationI18n(loc, lang);
  const title = `${t.name} — ${ui.filmTitle}`;
  const description = t.scene;
  const { canonical, languages } = buildAlternates(baseUrl, lang, `locations/${loc.id}`);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages
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

export default async function Page({ params }: { params: { lang: Lang; id: string } }) {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const loc = DATA.locations.find((l) => l.id === params.id);
  const baseUrl = getRequestSiteUrl();

  if (!loc) {
    return (
      <div className="landing">
        <div className="container">
          <div className="section">
            <h1>{ui.labels.notFoundTitle}</h1>
            <Link href={`/${lang}/locations`} className="cta-secondary">
              {ui.labels.backToList}
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
    { name: ui.labels.breadcrumbHome, path: `/${lang}` },
    { name: ui.labels.breadcrumbLocations, path: `/${lang}/locations` },
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

        <div className="section">
          <LocationImage src={loc.image_url} alt={t.name} className="location-hero" />
        </div>

        <SeoContext variant="locationDetail" />

        <div className="section">
          <div className="name">{ui.labels.sceneLabel}</div>
          <div className="meta">{t.scene}</div>
          <div className="name" style={{ marginTop: 16 }}>
            {ui.labels.productionLabel}
          </div>
          <div className="meta">{t.production_note}</div>
          {t.trivia?.length ? (
            <>
              <div className="name" style={{ marginTop: 16 }}>
                {ui.labels.triviaLabel}
              </div>
              <div className="meta">
                {t.trivia.map((item) => (
                  <div key={item} style={{ marginBottom: 8 }}>
                    - {item}
                  </div>
                ))}
              </div>
            </>
          ) : null}
          <div className="name" style={{ marginTop: 16 }}>
            {ui.popup.timestamp}
          </div>
          <div className="meta">{loc.timestamp}</div>
        </div>

        <div className="section">
          <div className="name" style={{ marginBottom: 12 }}>
            {ui.labels.mapLocationLabel}
          </div>
          <LocationMiniMap lat={loc.lat} lng={loc.lng} label={t.name} />
        </div>

        <div className="section">
          <ShareBar url={shareUrl} title={t.name} />
        </div>

        <div className="section">
          <Link href={`/${lang}/locations`} className="cta-secondary">
            {ui.labels.backToList}
          </Link>
        </div>

        <Footer />
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
