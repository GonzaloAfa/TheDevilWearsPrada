import Link from 'next/link';
import type { Metadata } from 'next';
import { DATA } from '../../../data';
import type { Lang } from '../../../lib/types';
import { Footer } from '../../../components/Footer';
import { CATEGORY_META } from '../../../lib/categories';
import { cityDisplayName, cityHint } from '../../../lib/locationUi';
import { SeoContext } from '../../../components/SeoContext';
import { SiteHeader } from '../../../components/SiteHeader';
import { getCategoryLabel, getLocationI18n, normalizeLang, LOCALES, loadMessages, asUiText } from '../../../lib/i18n';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = ui.meta.locations.title;
  const description = ui.meta.locations.description;
  const imageUrl = `${baseUrl}/og.svg`;
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${baseUrl}/${locale}/locations`])
  );
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/locations`,
      languages
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

export default async function Page({ params }: { params: { lang: Lang } }) {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix="/locations" />
        <div className="section">
          <h1>{ui.labels.locationsTitle}</h1>
          <p className="meta">{ui.labels.locationsDescription}</p>
        </div>

        <SeoContext variant="locations" />

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

        <Footer />
      </div>
    </div>
  );
}
