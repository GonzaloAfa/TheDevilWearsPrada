import type { Lang } from '../types';

const TIMESTAMP_LABELS: Record<Lang, { na: string; various: string; deleted: string }> = {
  es: { na: 'N/D', various: 'varios', deleted: 'escena eliminada' },
  en: { na: 'N/A', various: 'various', deleted: 'deleted scene' },
  pt: { na: 'S/D', various: 'vários', deleted: 'cena deletada' },
  fr: { na: 'N/D', various: 'divers', deleted: 'scène supprimée' },
  de: { na: 'k. A.', various: 'verschiedene', deleted: 'gestrichene Szene' },
  cl: { na: 'N/D', various: 'varios', deleted: 'escena eliminada' }
};

export function formatTimestampValue(timestamp: string | undefined, lang: Lang) {
  const labels = TIMESTAMP_LABELS[lang];
  if (!timestamp) return labels.na;
  if (timestamp === 'varios') return labels.various;
  if (timestamp === 'escena eliminada') return labels.deleted;
  return timestamp;
}
