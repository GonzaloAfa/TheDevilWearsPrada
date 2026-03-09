import type { Metadata } from 'next';
import { UI_TEXT } from '../../../lib/uiText';
import type { Lang } from '../../../lib/types';
import { faqJsonLd } from '../../../lib/seo';
import { Footer } from '../../../components/Footer';
import { SeoContext } from '../../../components/SeoContext';
import { SiteHeader } from '../../../components/SiteHeader';
import { normalizeLang } from '../../../lib/i18n';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'en'
    ? 'FAQ — The Devil Wears Prada'
    : lang === 'pt'
      ? 'FAQ — O Diabo Veste Prada'
      : 'FAQ — El Diablo se viste a la moda';
  const description = lang === 'en'
    ? 'Frequently asked questions about the map and the film.'
    : lang === 'pt'
      ? 'Perguntas frequentes sobre o mapa e o filme O Diabo Veste Prada (The Devil Wears Prada).'
      : 'Preguntas frecuentes sobre el mapa y la película El Diablo se viste a la moda (The Devil Wears Prada).';
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/faq`,
      languages: {
        es: `${baseUrl}/es/faq`,
        en: `${baseUrl}/en/faq`,
        pt: `${baseUrl}/pt/faq`
      }
    }
  };
}

export default function Page({ params }: { params: { lang: Lang } }) {
  const lang = normalizeLang(params.lang);
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
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

        <SeoContext lang={lang} variant="faq" />

        <Footer lang={lang} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
