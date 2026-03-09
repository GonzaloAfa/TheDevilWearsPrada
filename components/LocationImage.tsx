'use client';

import { useState } from 'react';

type LocationImageProps = {
  src?: string;
  alt: string;
  className: string;
  loading?: 'lazy' | 'eager';
};

export function LocationImage({ src, alt, className, loading = 'lazy' }: LocationImageProps) {
  const [failed, setFailed] = useState(!src);

  return (
    <div
      className={`${className}${failed ? ' image-shell--empty' : ''}`}
      role={failed ? 'img' : undefined}
      aria-label={failed ? alt : undefined}
    >
      {failed || !src ? (
        <div className="image-fallback" aria-hidden="true" />
      ) : (
        <img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
