import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ui } from '../../content/ui'
import { useT } from '../../i18n'

interface DialogProps {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLDialogElement>) => void
}

/**
 * <dialog> nativo: o navegador cuida do foco preso, do Esc e de bloquear o fundo.
 * Clique fora do conteúdo fecha.
 */
export function Dialog({ open, onClose, label, children, className, onKeyDown }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Se o componente sair da tela com o diálogo aberto, devolve a rolagem da página.
  useEffect(() => () => void (document.documentElement.style.overflow = ''), [])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      document.documentElement.style.overflow = ''
      onClose()
    }
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close()
      }}
      className={cn(
        'on-ink m-auto max-h-[100dvh] max-w-[100vw] bg-transparent p-0 text-paper backdrop:backdrop-blur-[2px] open:animate-[dialog-in_0.35s_var(--ease-out-expo)]',
        className,
      )}
    >
      {open && children}
    </dialog>
  )
}

export function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex size-11 items-center justify-center border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink',
        className,
      )}
    >
      <X aria-hidden size={20} />
      <span className="sr-only">{t(ui.common.close)}</span>
    </button>
  )
}

/** Visualizador de imagem em tela cheia. */
export function Lightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string; caption?: string } | null
  onClose: () => void
}) {
  const t = useT()
  return (
    <Dialog open={Boolean(image)} onClose={onClose} label={image?.alt ?? t(ui.common.enlargedImage)} className="w-[min(96vw,1600px)]">
      {image && (
        <figure className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <figcaption className="eyebrow text-paper/80">{image.caption ?? image.alt}</figcaption>
            <CloseButton onClick={onClose} />
          </div>
          <img src={image.src} alt={image.alt} className="max-h-[82dvh] w-full object-contain" />
        </figure>
      )}
    </Dialog>
  )
}
