import './globals.css';
import type { Metadata } from 'next';

const PROD_URL = 'https://thedevilwearspradamap.afachile.cl';
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PROD_URL;

export const metadata: Metadata = {
  metadataBase: new URL(configuredSiteUrl),
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
  return children;
}
