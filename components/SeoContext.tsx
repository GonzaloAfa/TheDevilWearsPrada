import Link from 'next/link';
import type { Lang } from '../lib/types';
import { UI_TEXT } from '../lib/uiText';

type Variant = 'locations' | 'locationDetail' | 'city' | 'faq';

export function SeoContext({ lang, variant }: { lang: Lang; variant: Variant }) {
  const ui = UI_TEXT[lang].seoContext[variant];
  return (
    <div className="section">
      <div className="name">{ui.title}</div>
      <div className="meta">{ui.body}</div>
      <div className="cta-row" style={{ marginTop: 12 }}>
        <Link href={`/${lang}/map`} className="cta-button">
          {ui.cta}
        </Link>
        <Link href={`/${lang}`} className="cta-secondary">
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
