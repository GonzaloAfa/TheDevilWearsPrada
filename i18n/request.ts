import { getRequestConfig } from 'next-intl/server';
import { normalizeLang } from '../lib/i18n';
import { loadMessages } from '../lib/i18n/messages';

export default getRequestConfig(async ({ locale }) => {
  const lang = normalizeLang(locale || '');
  return {
    locale: lang,
    messages: await loadMessages(lang)
  };
});
