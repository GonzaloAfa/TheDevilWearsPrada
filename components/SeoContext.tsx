'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { normalizeLang, useUiText } from '../lib/i18n';

type Variant = 'locations' | 'locationDetail' | 'city' | 'faq';

export function SeoContext({ variant }: { variant: Variant }) {
  const params = useParams();
  const lang = normalizeLang(String(params?.lang || ''));
  const text = useUiText();
  const ui = text.seoContext[variant];
  return (
    <div className="section">
      <div className="name">{ui.title}</div>
      <div className="meta">{ui.body}</div>
      <div className="cta-row" style={{ marginTop: 12 }}>
        <Link href={`/${lang}/map`} className="cta-button">
          {ui.cta}
        </Link>
        <Link href={`/${lang}`} className="cta-secondary">
          {text.labels.breadcrumbHome}
        </Link>
      </div>
    </div>
  );
}
