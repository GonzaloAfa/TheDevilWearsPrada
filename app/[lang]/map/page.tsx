import type { Metadata } from 'next';
import { DATA } from '../../../data';
import { MapPage } from '../../../components/MapPage';
import { UI_TEXT } from '../../../lib/uiText';
import type { Lang } from '../../../lib/types';

export const dynamicParams = false;
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'es'
    ? 'Mapa de locaciones — El Diablo se viste a la moda'
    : 'Locations Map — The Devil Wears Prada';
  const description = lang === 'es'
    ? 'Explora el mapa interactivo con escenas y locaciones de El Diablo se viste a la moda (The Devil Wears Prada).'
    : 'Explore the interactive map with scenes and locations from The Devil Wears Prada.';
  const imageUrl = `${baseUrl}/og.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/map`,
      languages: {
        es: `${baseUrl}/es/map`,
        en: `${baseUrl}/en/map`
      }
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
  const lang = params.lang === 'en' ? 'en' : 'es';
  return <MapPage lang={lang} data={DATA} ui={UI_TEXT[lang]} />;
}
