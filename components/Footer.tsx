'use client';

import { useUiText } from '../lib/i18n';

export function Footer() {
  const ui = useUiText();
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
