import './globals.css';
import type { Metadata } from 'next';
import { LangHtmlUpdater } from '../components/LangHtmlUpdater';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  ...(configuredSiteUrl ? { metadataBase: new URL(configuredSiteUrl) } : {}),
  icons: {
    icon: [{ url: '/heel.svg', type: 'image/svg+xml' }],
    shortcut: ['/heel.svg'],
    apple: [{ url: '/heel.svg' }]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LangHtmlUpdater />
        {children}
      </body>
    </html>
  );
}
