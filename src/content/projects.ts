import cityDashLogo from '../assets/projetos/citydash-logo.webp'
import { L, type Localized } from '../i18n'

/**
 * Outros projetos.
 * Para adicionar um novo, copie um objeto da lista e preencha os campos.
 * - Textos: L('português', 'english').
 * - images: capturas de tela (importe o arquivo de src/assets/projetos/). Sem imagens,
 *   o site monta uma capa tipográfica com a cor de `cover`.
 * - links: só preencha o que existe. Sem `demo`, o botão de demonstração não aparece.
 */
export interface ProjectImage {
  src: string
  alt: Localized
}

export interface Project {
  slug: string
  title: string
  summary: Localized
  description: Localized
  highlights: Localized<string[]>
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
    summary: L(
      'Painel pessoal que reúne clima, horário local, mapa, notícias e anotações em uma única tela.',
      'A personal dashboard that brings weather, local time, a map, news and notes together on one screen.',
    ),
    description: L(
      'Feito com HTML, CSS e JavaScript puro, sem framework. Integra várias APIs públicas com fetch e async/await: Open-Meteo para clima, previsão e busca de cidades, a Geolocation API do navegador e Leaflet com OpenStreetMap para o mapa.',
      'Built with HTML, CSS and vanilla JavaScript, no framework. It integrates several public APIs with fetch and async/await: Open-Meteo for weather, forecast and city search, the browser’s Geolocation API, and Leaflet with OpenStreetMap for the map.',
    ),
    highlights: L(
      [
        'Busca de cidade com autocomplete',
        'Relógio no fuso horário do local buscado',
        'Previsão do tempo para 5 dias',
        'Quadro de anotações com arrastar e soltar',
      ],
      [
        'City search with autocomplete',
        'Clock in the time zone of the searched location',
        '5-day weather forecast',
        'Notes board with drag and drop',
      ],
    ),
    tech: ['JavaScript', 'HTML', 'CSS', 'Leaflet', 'Open-Meteo'],
    cover: { background: '#141a33', foreground: '#eef1ff', logo: cityDashLogo },
    links: { repo: 'https://github.com/rianzitos/CityDash' },
  },
  {
    slug: 'newstoday',
    title: 'NewsToday',
    summary: L(
      'Portal de notícias responsivo, com barra de pesquisa e seções separadas por assunto.',
      'A responsive news site with a search bar and sections split by topic.',
    ),
    description: L(
      'Exercício de interface com HTML semântico (header, main, section e footer) e CSS responsivo. O layout foi ajustado para três faixas de tela, com media queries em 1024, 768 e 480 px.',
      'An interface exercise with semantic HTML (header, main, section and footer) and responsive CSS. The layout was tuned for three screen ranges, with media queries at 1024, 768 and 480 px.',
    ),
    highlights: L(
      ['HTML semântico', 'Media queries para tablet, celular e telas pequenas', 'Barra de pesquisa e filtro por assunto'],
      ['Semantic HTML', 'Media queries for tablets, phones and small screens', 'Search bar and topic filter'],
    ),
    tech: ['HTML', 'CSS', 'JavaScript'],
    cover: { background: '#0b5cff', foreground: '#ffffff' },
    links: { repo: 'https://github.com/rianzitos/NewsToday' },
  },
]
