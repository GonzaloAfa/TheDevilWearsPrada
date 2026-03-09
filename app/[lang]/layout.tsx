import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Lang } from '../../lib/types';
import { Analytics } from '../../components/Analytics';
import { LOCALES, normalizeLang, loadMessages } from '../../lib/i18n';

export const generateStaticParams = async () => LOCALES.map((lang) => ({ lang }));

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) {
  const locale = normalizeLang(params.lang);
  setRequestLocale(locale);
  const messages = await loadMessages(locale);
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID || 'G-Q1033JG9JM';

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

gtag('config', '${gaId}', { send_page_view: false });`}
          </Script>
        </>
      ) : null}
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
      <Analytics />
    </>
  );
}
