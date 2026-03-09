'use client';

import { useMemo, useState } from 'react';
import { useUiText } from '../lib/i18n';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ShareBarProps = {
  url: string;
  title: string;
};

function resolveShareUrl(url: string) {
  if (typeof window === 'undefined') {
    return url;
  }

  const currentOrigin = window.location.origin;

  try {
    const parsed = new URL(url, currentOrigin);
    const parsedHost = parsed.hostname;
    const isLocalUrl =
      parsedHost === 'localhost' || parsedHost === '127.0.0.1' || parsedHost === '0.0.0.0';

    if (isLocalUrl || parsed.origin !== currentOrigin) {
      return `${currentOrigin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return parsed.toString();
  } catch {
    return url;
  }
}

export function ShareBar({ url, title }: ShareBarProps) {
  const labels = useUiText().share;
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => resolveShareUrl(url), [url]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(title);

  const track = (method: string) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', 'share', {
      method,
      content_type: 'page',
      item_id: shareUrl
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
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
          className="share-button icon-only"
          href={`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('x')}
          aria-label="X"
          title="X"
        >
          <svg className="share-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M18.244 2H21l-6.52 7.45L22 22h-6.8l-5.33-6.98L4.3 22H2l7.05-8.06L2 2h6.92l4.82 6.33L18.244 2zm-1.19 18h1.88L7.01 4h-2.0l12.044 16z"/>
          </svg>
        </a>
        <a
          className="share-button icon-only"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('facebook')}
          aria-label="Facebook"
          title="Facebook"
        >
          <svg className="share-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.3c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H16l-.4 3h-2.7v7A10 10 0 0 0 22 12z"/>
          </svg>
        </a>
        <a
          className="share-button icon-only"
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('whatsapp')}
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <svg className="share-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M20 12a8 8 0 0 0-12.7-6.4A8 8 0 0 0 6 20l-1.1 4L9 22.9A8 8 0 0 0 20 12zm-8 6.6a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2 .5.5-1.9-.1-.2a6.5 6.5 0 1 1 5.1 2.6zm3.7-4.9c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.2-.4.1a5.3 5.3 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2 0-.4-.1-.1-.4-1-.6-1.3-.2-.4-.3-.3-.4-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.7-.8 1.8 0 1 .8 2.1 1 2.2.1.1 1.6 2.4 3.9 3.4.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z"/>
          </svg>
        </a>
        <button className="share-button" type="button" onClick={handleCopy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
    </div>
  );
}
