import { LOCALES } from './i18n';

/**
 * Build hreflang alternates for metadata.
 * Maps "cl" → "es-CL" (valid BCP 47) and adds x-default → /en variant.
 */
export function buildAlternates(baseUrl: string, lang: string, suffix: string = '') {
  const path = suffix ? `/${suffix}` : '';
  const canonical =
    lang === 'cl' ? `${baseUrl}/es${path}` : `${baseUrl}/${lang}${path}`;

  const languages: Record<string, string> = {};
  LOCALES.forEach((locale) => {
    if (locale === 'cl') {
      languages['es-CL'] = `${baseUrl}/cl${path}`;
    } else {
      languages[locale] = `${baseUrl}/${locale}${path}`;
    }
  });
  languages['x-default'] = `${baseUrl}/en${path}`;

  return { canonical, languages };
}
