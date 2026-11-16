import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Moldura mínima de navegador: só uma barra com o caminho da tela. */
export function BrowserFrame({
  path,
  children,
  className,
  tone = 'dark',
}: {
  path: string
  children: ReactNode
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cn(
        'overflow-hidden border',
        tone === 'dark' ? 'border-paper/15 bg-ink-2' : 'border-ink/15 bg-paper-2',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-9 items-center gap-3 border-b px-3 font-mono text-[0.7rem]',
          tone === 'dark' ? 'border-paper/10 text-muted-dark' : 'border-ink/10 text-muted',
        )}
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-current opacity-40" />
          <span className="size-2 rounded-full bg-current opacity-40" />
          <span className="size-2 rounded-full bg-current opacity-40" />
        </span>
        <span className="truncate">sicapda{path}</span>
      </div>
      {children}
    </div>
  )
}

/** Moldura de celular feita só com CSS. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[2.1rem] border border-paper/15 bg-ink p-[0.45rem] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]', className)}>
      <div className="overflow-hidden rounded-[1.7rem] bg-ink-3">{children}</div>
    </div>
  )
}
