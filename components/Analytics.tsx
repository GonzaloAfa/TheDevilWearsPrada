'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA4_ID || 'G-Q1033JG9JM';

  useEffect(() => {
    if (!gaId || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: pathname
    });
  }, [gaId, pathname]);

  return null;
}
