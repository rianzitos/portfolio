import {
  siAndroidstudio,
  siAngular,
  siCss,
  siDart,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siPhp,
  siPython,
  siTypescript,
} from 'simple-icons'

interface IconData {
  title: string
  path: string
  hex: string
}

/* O LinkedIn e o VS Code não estão mais no Simple Icons (pedido das marcas).
   LinkedIn: glifo "in" no formato oficial. VS Code: glifo neutro de código. */
const linkedin: IconData = {
  title: 'LinkedIn',
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const vscode: IconData = {
  title: 'Visual Studio Code',
  hex: '2F80ED',
  path: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
}

const icons = {
  html5: siHtml5,
  css: siCss,
  javascript: siJavascript,
  typescript: siTypescript,
  angular: siAngular,
  php: siPhp,
  mysql: siMysql,
  python: siPython,
  flutter: siFlutter,
  dart: siDart,
  git: siGit,
  github: siGithub,
  androidstudio: siAndroidstudio,
  linkedin,
  vscode,
} satisfies Record<string, IconData>

export type IconKey = keyof typeof icons

interface BrandIconProps {
  name: IconKey
  size?: number
  className?: string
  /** Usa a cor oficial da marca em vez de currentColor. */
  brandColor?: boolean
  title?: string
}

export function BrandIcon({ name, size = 20, className, brandColor = false, title }: BrandIconProps) {
  const icon = icons[name]
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={brandColor ? `#${icon.hex}` : 'currentColor'}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  )
}

export const brandHex = (name: IconKey) => `#${icons[name].hex}`
