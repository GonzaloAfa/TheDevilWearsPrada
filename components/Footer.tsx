'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUiText } from '../lib/i18n';

function useLang() {
  const pathname = usePathname();
  return pathname?.split('/')[1] || 'es';
}

export function Footer() {
  const ui = useUiText();
  const lang = useLang();
  const donateUrl =
    process.env.NEXT_PUBLIC_DONATE_URL || 'https://buymeacoffee.com/gonzaloo5';

  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link href={`/${lang}/map`}>{ui.meta?.map?.title ?? 'Map'}</Link>
        <Link href={`/${lang}/locations`}>{ui.meta?.locations?.title ?? 'Locations'}</Link>
        <Link href={`/${lang}/cities/nyc`}>New York</Link>
        <Link href={`/${lang}/cities/paris`}>Paris</Link>
        <Link href={`/${lang}/faq`}>FAQ</Link>
      </nav>
      <div className="footer-donate">
        <span>{ui.footer.donateText}</span>
        <a href={donateUrl} target="_blank" rel="noreferrer">
          {ui.footer.donateCta}
        </a>
      </div>
    </footer>
  );
}
