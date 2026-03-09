import Script from 'next/script';
import type { Lang } from '../../lib/types';
import { Analytics } from '../../components/Analytics';

export const generateStaticParams = async () => [{ lang: 'es' }, { lang: 'en' }];

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <>
      {adsenseClient ? (
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      ) : null}
      {gaId ? (
        <>
          <Script
            id="ga4-lib"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga4-init">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());

gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
      {children}
      <Analytics />
    </>
  );
}
