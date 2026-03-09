import type { Lang } from '../types';

export async function loadMessages(lang: Lang) {
  const messages = await import(`../../locales/${lang}.json`);
  return messages.default;
}
