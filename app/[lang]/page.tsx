import type { Metadata } from 'next';
import { DATA } from '../../data';
import { MapPage } from '../../components/MapPage';
import { UI_TEXT } from '../../lib/uiText';
import type { Lang } from '../../lib/types';

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: { lang: Lang };
}): Promise<Metadata> {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const ui = UI_TEXT[lang];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = lang === 'es'
    ? 'The Devil Wears Prada — Mapa Cinematográfico'
    : 'The Devil Wears Prada — Cinematic Map';
  const description = lang === 'es'
    ? 'Mapa interactivo de locaciones, escenas y marcas de The Devil Wears Prada con timeline de cafés.'
    : 'Interactive map of locations, scenes, and brands from The Devil Wears Prada with a coffee timeline.';
  const imageUrl = `${baseUrl}/og.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`
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
  const lang = params.lang === 'en' ? 'en' : 'es';
  return <MapPage lang={lang} data={DATA} ui={UI_TEXT[lang]} />;
}
