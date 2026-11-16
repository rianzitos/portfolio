import cityDashLogo from '../assets/projetos/citydash-logo.webp'

/**
 * Outros projetos.
 * Para adicionar um novo, copie um objeto da lista e preencha os campos.
 * - images: capturas de tela (importe o arquivo de src/assets/projetos/). Sem imagens,
 *   o site monta uma capa tipográfica com a cor de `cover`.
 * - links: só preencha o que existe. Sem `demo`, o botão de demonstração não aparece.
 */
export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  highlights: string[]
  tech: string[]
  images?: ProjectImage[]
  cover: {
    /** Cor de fundo da capa quando não há imagem. */
    background: string
    foreground: string
    logo?: string
  }
  links: {
    repo?: string
    demo?: string
  }
}

export const projects: Project[] = [
  {
    slug: 'citydash',
    title: 'CityDash',
    summary: 'Painel pessoal que reúne clima, horário local, mapa, notícias e anotações em uma única tela.',
    description:
      'Feito com HTML, CSS e JavaScript puro, sem framework. Integra várias APIs públicas com fetch e async/await: Open-Meteo para clima, previsão e busca de cidades, a Geolocation API do navegador e Leaflet com OpenStreetMap para o mapa.',
    highlights: [
      'Busca de cidade com autocomplete',
      'Relógio no fuso horário do local buscado',
      'Previsão do tempo para 5 dias',
      'Quadro de anotações com arrastar e soltar',
    ],
    tech: ['JavaScript', 'HTML', 'CSS', 'Leaflet', 'Open-Meteo'],
    cover: { background: '#141a33', foreground: '#eef1ff', logo: cityDashLogo },
    links: { repo: 'https://github.com/rianzitos/CityDash' },
  },
  {
    slug: 'newstoday',
    title: 'NewsToday',
    summary: 'Portal de notícias responsivo, com barra de pesquisa e seções separadas por assunto.',
    description:
      'Exercício de interface com HTML semântico (header, main, section e footer) e CSS responsivo. O layout foi ajustado para três faixas de tela, com media queries em 1024, 768 e 480 px.',
    highlights: [
      'HTML semântico',
      'Media queries para tablet, celular e telas pequenas',
      'Barra de pesquisa e filtro por assunto',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    cover: { background: '#0b5cff', foreground: '#ffffff' },
    links: { repo: 'https://github.com/rianzitos/NewsToday' },
  },
]
