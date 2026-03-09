import Link from 'next/link';
import type { Lang } from '../lib/types';
import { UI_TEXT } from '../lib/uiText';
import { LANG_OPTIONS, langPath } from '../lib/i18n';

type SiteHeaderProps = {
  lang: Lang;
  showLanguageSwitch?: boolean;
  pathSuffix?: string;
};

export function SiteHeader({ lang, showLanguageSwitch = false, pathSuffix }: SiteHeaderProps) {
  const ui = UI_TEXT[lang];

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
          {LANG_OPTIONS.map((option) => {
            const href = langPath(option.code, pathSuffix || '');
            const isActive = option.code === lang;
            return (
              <Link
                key={option.code}
                href={href}
                className={`chip lang-chip${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="flag" aria-hidden="true">
                  {option.flag}
                </span>
                <span>{option.label}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
