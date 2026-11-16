import type { Lang } from '../i18n'

const months: Record<Lang, string[]> = {
  pt: ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

const parse = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** 2026-04-29 → "29/04/2026" (pt) ou "Apr 29, 2026" (en) */
export const formatDate = (iso: string, lang: Lang) => {
  const { y, m, d } = parse(iso)
  return lang === 'pt' ? `${pad2(d)}/${pad2(m)}/${y}` : `${months.en[m - 1]} ${d}, ${y}`
}

/** 2026-04-29 → "abr. 2026" (pt) ou "Apr 2026" (en) */
export const formatMonthYear = (iso: string, lang: Lang) => {
  const { y, m } = parse(iso)
  return `${months[lang][m - 1]} ${y}`
}

/** 25.7 → "0:25" */
export const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${pad2(Math.floor(s % 60))}`
