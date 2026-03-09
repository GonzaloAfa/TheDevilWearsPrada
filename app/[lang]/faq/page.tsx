import type { Metadata } from 'next';
import type { Lang } from '../../../lib/types';
import { faqJsonLd } from '../../../lib/seo';
import { Footer } from '../../../components/Footer';
import { SeoContext } from '../../../components/SeoContext';
import { SiteHeader } from '../../../components/SiteHeader';
import { normalizeLang, LOCALES, loadMessages, asUiText } from '../../../lib/i18n';
import { getRequestSiteUrl } from '../../../lib/siteUrl';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const baseUrl = getRequestSiteUrl();
  const title = ui.meta.faq.title;
  const description = ui.meta.faq.description;
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${baseUrl}/${locale}/faq`])
  );
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/faq`,
      languages
    }
  };
}

export default async function Page({ params }: { params: { lang: Lang } }) {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const baseUrl = getRequestSiteUrl();
  const faqLd = faqJsonLd(baseUrl, lang, ui.landing.faq);

  return (
    <div className="landing">
      <div className="container">
        <SiteHeader lang={lang} showLanguageSwitch pathSuffix="/faq" />
        <div className="section">
          <h1>{ui.landing.faqTitle}</h1>
          {ui.landing.faq.map((item) => (
            <div key={item.q} className="faq-item">
              <div className="name">{item.q}</div>
              <div className="meta">{item.a}</div>
            </div>
          ))}
        </div>

        <SeoContext variant="faq" />

        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
