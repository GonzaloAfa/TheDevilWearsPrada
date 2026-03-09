import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../data';
import { UI_TEXT } from '../../lib/uiText';
import type { Lang } from '../../lib/types';
import { movieJsonLd, faqJsonLd } from '../../lib/seo';
import { ShareBar } from '../../components/ShareBar';
import { Footer } from '../../components/Footer';
import { CATEGORY_META } from '../../lib/categories';
import { cityDisplayName, cityHint } from '../../lib/locationUi';
import { SiteHeader } from '../../components/SiteHeader';
import { getCategoryLabel, getLocationI18n, normalizeLang } from '../../lib/i18n';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'en'
    ? 'The Devil Wears Prada — Cinematic Map'
    : lang === 'pt'
      ? 'O Diabo Veste Prada — Mapa Cinematográfico'
      : 'El Diablo se viste a la moda — Mapa Cinematográfico';
  const description = lang === 'en'
    ? 'Explore locations, scenes, and key moments from The Devil Wears Prada in an interactive map.'
    : lang === 'pt'
      ? 'Explore locações, cenas e momentos-chave de O Diabo Veste Prada (The Devil Wears Prada) em um mapa interativo.'
      : 'Explora locaciones, escenas y momentos clave de El Diablo se viste a la moda (The Devil Wears Prada) en un mapa interactivo.';
  const imageUrl = `${baseUrl}/og.svg`;

  return {
    title,
    description,
      alternates: {
        canonical: `${baseUrl}/${lang}`,
        languages: {
          es: `${baseUrl}/es`,
          en: `${baseUrl}/en`,
          pt: `${baseUrl}/pt`
        }
      },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: ui.title.replace('\n', ' '),
      locale: lang,
      type: 'website',
      images: [{ url: imageUrl }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default function Page({ params }: { params: { lang: Lang } }) {
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const topLocations = DATA.locations.slice(0, 6);
  const shareUrl = `${baseUrl}/${lang}`;
  const mapPath = `/${lang}/map`;
  const locationsPath = `/${lang}/locations`;
  const faqPath = `/${lang}/faq`;

  const movieLd = movieJsonLd(baseUrl, lang);
  const faqLd = faqJsonLd(baseUrl, lang, ui.landing.faq);

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch />
        <div className="hero">
          <div>
            <h1>{ui.landing.heroTitle}</h1>
            <p>{ui.landing.heroSubtitle}</p>
            <div className="cta-row">
              <Link href={mapPath} className="cta-button">
                {ui.landing.ctaPrimary}
              </Link>
              <Link href={locationsPath} className="cta-secondary">
                {ui.landing.ctaSecondary}
              </Link>
            </div>
            <div style={{ marginTop: 16 }}>
              <ShareBar url={shareUrl} title={ui.landing.heroTitle} labels={ui.share} />
            </div>
          </div>
          <div className="hero-emoji" role="img" aria-label={ui.landing.previewAlt}>
            👠
          </div>
        </div>

        <div className="section">
          <h2>{ui.landing.highlightsTitle}</h2>
          <div className="highlights">
            {ui.landing.highlights.map((item) => (
              <div key={item.title} className="highlight-card">
                <div className="highlight-title">
                  <span className="highlight-emoji">{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <div className="meta">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>{ui.landing.topLocationsTitle}</h2>
          <div className="location-grid">
            {topLocations.map((loc) => (
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
          <h2>{ui.landing.faqTitle}</h2>
          {ui.landing.faq.map((item) => (
            <div key={item.q} className="faq-item">
              <div className="name">{item.q}</div>
              <div className="meta">{item.a}</div>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <Link href={faqPath} className="cta-secondary">
              {lang === 'en' ? 'View all FAQs' : lang === 'pt' ? 'Ver todas as perguntas' : 'Ver todas las preguntas'}
            </Link>
          </div>
        </div>

        <Footer lang={lang} />
      </div>

      <div className="sticky-cta">
        <Link href={mapPath} className="cta-button">
          {ui.landing.ctaPrimary}
        </Link>
        <Link href={locationsPath} className="cta-secondary">
          {ui.landing.ctaSecondary}
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
