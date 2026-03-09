import Link from 'next/link';
import type { Lang } from '../lib/types';
import { UI_TEXT } from '../lib/uiText';

type SiteHeaderProps = {
  lang: Lang;
  showLanguageSwitch?: boolean;
  switchHref?: string;
};

export function SiteHeader({ lang, showLanguageSwitch = false, switchHref }: SiteHeaderProps) {
  const ui = UI_TEXT[lang];
  const otherLang = lang === 'es' ? 'en' : 'es';
  const languagePath = switchHref || `/${otherLang}`;

  return (
    <div className="site-header">
      <div className="site-header-left">
        <img src="/heel.svg" alt="Icono de tacos" className="site-header-icon" />
        <div className="site-header-title">{ui.filmTitle}</div>
      </div>
      {showLanguageSwitch ? (
        <Link href={languagePath} className="chip">
          {ui.languageSwitch}
        </Link>
      ) : null}
    </div>
  );
}
