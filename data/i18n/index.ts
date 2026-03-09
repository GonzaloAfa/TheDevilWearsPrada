import type { Lang } from '../../lib/types';

export type I18nOverlay = {
  locations?: Record<string, { name?: string; scene?: string; production_note?: string; trivia?: string[] }>;
  coffee_events?: Record<string, { label: string }>;
};

import fr from './fr.json';
import de from './de.json';

export const DATA_I18N: Partial<Record<Lang, I18nOverlay>> = {
  fr: fr as I18nOverlay,
  de: de as I18nOverlay
};
