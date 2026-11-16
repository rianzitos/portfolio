import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  y?: number
}

/** Entrada sutil ao aparecer na tela. Com "reduzir movimento", só o fade acontece. */
export function Reveal({ children, delay = 0, y = 28, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

interface LinesProps {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

/** Título com cada linha subindo de dentro de uma máscara. */
export function RevealLines({ lines, className, lineClassName, delay = 0, as = 'h2' }: LinesProps) {
  const Tag = motion[as]
  return (
    <Tag className={className} initial="hidden" whileInView="shown" viewport={{ once: true, margin: '0px 0px -10% 0px' }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className={lineClassName ?? 'block'}
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 1, ease, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
