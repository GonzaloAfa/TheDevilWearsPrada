import { useMessages } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { UiText } from '../uiText';

export function asUiText(messages: Record<string, any>): UiText {
  return messages as UiText;
}

export async function getUiText(): Promise<UiText> {
  const messages = await getMessages();
  return asUiText(messages as Record<string, any>);
}

export function useUiText(): UiText {
  return asUiText(useMessages() as Record<string, any>);
}
