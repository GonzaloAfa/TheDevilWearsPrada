'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ShareBarProps = {
  url: string;
  title: string;
  labels: {
    title: string;
    copy: string;
    copied: string;
  };
};

export function ShareBar({ url, title, labels }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const track = (method: string) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'share', {
      method,
      content_type: 'page',
      item_id: url
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track('copy');
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <div>
      <div className="small" style={{ marginBottom: 8 }}>{labels.title}</div>
      <div className="share-bar">
        <a
          className="share-button"
          href={`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('x')}
        >
          X
        </a>
        <a
          className="share-button"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('facebook')}
        >
          Facebook
        </a>
        <a
          className="share-button"
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('whatsapp')}
        >
          WhatsApp
        </a>
        <button className="share-button" type="button" onClick={handleCopy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
    </div>
  );
}
