import { cn } from '../lib/cn'

/** "SICA" + "PDA" em amarelo, como na marca do projeto. */
export function SicapdaWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('display block whitespace-nowrap', className)} aria-label="SICAPDA" role="img">
      <span aria-hidden>SICA</span>
      <span aria-hidden className="text-sica">
        PDA
      </span>
    </span>
  )
}
