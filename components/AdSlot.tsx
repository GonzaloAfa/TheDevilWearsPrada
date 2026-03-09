'use client';

import { useEffect } from 'react';

type AdSlotProps = {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
};

export function AdSlot({ slot, format = 'auto', style }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore ad load failures
    }
  }, [client]);

  if (!client) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...(style ?? {}) }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
