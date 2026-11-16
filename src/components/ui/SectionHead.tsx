import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadProps {
  index: string
  label: string
  aside?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Cabeçalho corrido de seção: "02 — Projeto principal ———————— aside". */
export function SectionHead({ index, label, aside, tone = 'light', className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        'eyebrow flex items-center gap-4 border-t pt-4',
        tone === 'light' ? 'border-ink text-ink' : 'border-paper/80 text-paper',
        className,
      )}
    >
      <span className="tabular">{index}</span>
      <span aria-hidden className={cn('h-px w-6', tone === 'light' ? 'bg-ink' : 'bg-paper')} />
      <span>{label}</span>
      {aside && (
        <span className={cn('ml-auto hidden text-right sm:block', tone === 'light' ? 'text-muted' : 'text-muted-dark')}>
          {aside}
        </span>
      )}
    </div>
  )
}
