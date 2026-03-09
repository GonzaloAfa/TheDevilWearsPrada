'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function LangHtmlUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const nextLang = pathname?.startsWith('/en') ? 'en' : 'es';
    document.documentElement.lang = nextLang;
  }, [pathname]);

  return null;
}
