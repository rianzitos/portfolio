import { useMemo } from 'react'
import { profile } from '../content/profile'
import { ui } from '../content/ui'
import { useLang } from '../i18n'
import type { CardContent } from './cardTexture'

/** Textos impressos no cartão 3D, no idioma atual. */
export function useCardContent(): CardContent {
  const { t, lang } = useLang()
  return useMemo(
    () => ({
      name: profile.name,
      role: t(profile.role),
      place: t(ui.card.place),
      label: t(ui.card.label),
      contactLabel: t(ui.card.contact),
      contacts: [
        profile.links.github.url.replace('https://', ''),
        profile.links.linkedin.url.replace('https://www.', '').replace(/\/$/, ''),
        ...(profile.email ? [profile.email] : []),
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  )
}
