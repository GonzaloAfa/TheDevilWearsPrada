'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LOCALES, normalizeLang } from '../lib/i18n';

export function LangHtmlUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const segment = pathname?.split('/')[1] || '';
    const nextLang = LOCALES.includes(segment as any) ? normalizeLang(segment) : 'es';
    document.documentElement.lang = nextLang;
  }, [pathname]);

  return null;
}
