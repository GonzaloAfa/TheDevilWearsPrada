import type { Metadata } from 'next';
import { UI_TEXT } from '../../../lib/uiText';
import type { Lang } from '../../../lib/types';
import { faqJsonLd } from '../../../lib/seo';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'es'
    ? 'FAQ — The Devil Wears Prada'
    : 'FAQ — The Devil Wears Prada';
  const description = lang === 'es'
    ? 'Preguntas frecuentes sobre el mapa y la película.'
    : 'Frequently asked questions about the map and the film.';
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/faq`,
      languages: {
        es: `${baseUrl}/es/faq`,
        en: `${baseUrl}/en/faq`
      }
    }
  };
}

export default function Page({ params }: { params: { lang: Lang } }) {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const faqLd = faqJsonLd(baseUrl, lang, ui.landing.faq);

  return (
    <div className="landing">
      <div className="container">
        <div className="section">
          <h1>{ui.landing.faqTitle}</h1>
          {ui.landing.faq.map((item) => (
            <div key={item.q} className="faq-item">
              <div className="name">{item.q}</div>
              <div className="meta">{item.a}</div>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </div>
  );
}
