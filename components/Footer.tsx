import type { Lang } from '../lib/types';
import { UI_TEXT } from '../lib/uiText';

export function Footer({ lang }: { lang: Lang }) {
  const ui = UI_TEXT[lang];
  const donateUrl =
    process.env.NEXT_PUBLIC_DONATE_URL || 'https://buymeacoffee.com/gonzaloo5';

  return (
    <div className="footer">
      <span>{ui.footer.donateText}</span>
      <a href={donateUrl} target="_blank" rel="noreferrer">
        {ui.footer.donateCta}
      </a>
    </div>
  );
}
