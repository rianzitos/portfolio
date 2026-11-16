import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ui } from '../../content/ui'
import { useT } from '../../i18n'

type Variant = 'solid' | 'outline' | 'sica' | 'signal' | 'outline-dark'
type Arrow = 'right' | 'down' | 'external' | 'none'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  variant?: Variant
  arrow?: Arrow
}

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-signal hover:text-carbon',
  outline: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'outline-dark': 'border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink',
  sica: 'bg-sica text-carbon hover:bg-paper',
  signal: 'bg-signal text-carbon hover:bg-paper',
}

const arrows = { right: ArrowRight, down: ArrowDown, external: ArrowUpRight } as const

export function ButtonLink({ href, children, variant = 'solid', arrow = 'right', className, ...rest }: ButtonLinkProps) {
  const t = useT()
  const external = arrow === 'external' || /^https?:/.test(href)
  const Icon = arrow === 'none' ? null : arrows[arrow]
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group inline-flex min-h-12 items-center gap-3 px-5 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors duration-300',
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          size={18}
          strokeWidth={2}
          className={cn(
            'transition-transform duration-500 ease-[var(--ease-out-expo)]',
            arrow === 'right' && 'group-hover:translate-x-1',
            arrow === 'down' && 'group-hover:translate-y-0.5',
            arrow === 'external' && 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
          )}
        />
      )}
      {external && <span className="sr-only">{t(ui.common.newTab)}</span>}
    </a>
  )
}

/** Link de texto com seta diagonal, para links externos discretos. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const t = useT()
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn('group inline-flex items-center gap-1.5', className)}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        aria-hidden
        size={14}
        className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      {external && <span className="sr-only">{t(ui.common.newTab)}</span>}
    </a>
  )
}
