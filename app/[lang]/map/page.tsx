import type { Metadata } from 'next';
import { DATA } from '../../../data';
import { MapPage } from '../../../components/MapPage';
import type { Lang } from '../../../lib/types';
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
  const title = ui.meta.map.title;
  const description = ui.meta.map.description;
  const imageUrl = `${baseUrl}/og.svg`;
  const languages = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${baseUrl}/${locale}/map`])
  );

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/map`,
      languages
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/map`,
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
  return <MapPage lang={lang} data={DATA} />;
}
