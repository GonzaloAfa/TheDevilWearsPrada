'use client';

import { useRouter } from 'next/navigation';
import type { Lang } from '../lib/types';
import { langPath, getLocaleMeta, LOCALES } from '../lib/i18n';
import { useUiText } from '../lib/i18n';

type SiteHeaderProps = {
  lang: Lang;
  showLanguageSwitch?: boolean;
  pathSuffix?: string;
};

export function SiteHeader({ lang, showLanguageSwitch = false, pathSuffix }: SiteHeaderProps) {
  const ui = useUiText();
  const router = useRouter();

  return (
    <div className="site-header">
      <div className="site-header-left">
        <span className="site-header-emoji" role="img" aria-label="Tacón">
          👠
        </span>
        <div className="site-header-title">{ui.filmTitle}</div>
      </div>
      {showLanguageSwitch ? (
        <div className="lang-switch" aria-label={ui.languageLabel}>
          <label className="sr-only" htmlFor="lang-select">
            {ui.languageLabel}
          </label>
          <select
            id="lang-select"
            className="lang-select"
            value={lang}
            onChange={(event) => {
              const next = event.target.value as Lang;
              router.push(langPath(next, pathSuffix || ''));
            }}
          >
            {LOCALES.map((locale) => {
              const meta = getLocaleMeta(locale);
              return (
                <option key={locale} value={locale}>
                  {meta.flag} {meta.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </div>
  );
}
