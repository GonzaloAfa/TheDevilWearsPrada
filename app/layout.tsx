import './globals.css';
import type { Metadata } from 'next';
import { LangHtmlUpdater } from '../components/LangHtmlUpdater';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
