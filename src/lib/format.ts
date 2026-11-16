const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.']

const parse = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m, d }
}

/** 2026-04-29 → "29/04/2026" */
export const formatDate = (iso: string) => {
  const { y, m, d } = parse(iso)
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`
}

/** 2026-04-29 → "abr. 2026" */
export const formatMonthYear = (iso: string) => {
  const { y, m } = parse(iso)
  return `${months[m - 1]} ${y}`
}

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** 25.7 → "0:25" */
export const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${pad2(Math.floor(s % 60))}`
