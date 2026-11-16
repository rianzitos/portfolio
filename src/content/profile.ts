import photo from '../assets/rian.webp'

/**
 * Dados pessoais e de contato.
 * Tudo o que aparece no topo, no "Sobre" e no "Contato" sai daqui.
 */
export const profile = {
  name: 'Rian Rafael',
  firstName: 'Rian',
  lastName: 'Rafael',
  role: 'Desenvolvedor de software em formação',
  focus: ['Web', 'Back-end', 'Mobile'],
  location: {
    city: 'Mococa',
    state: 'SP',
    country: 'Brasil',
    timeZone: 'America/Sao_Paulo',
  },
  /** Aparece no topo da página e no contato. Ajuste quando a sua situação mudar. */
  availability: 'Aberto a estágio e primeiras oportunidades',

  heroBio:
    'Estudo Desenvolvimento de Sistemas no SENAI e faço o ensino médio no SESI. Gosto de projetos que saem do papel e resolvem um problema concreto. O maior até agora é o SICAPDA, o meu TCC.',

  about: {
    lead:
      'No meu TCC, ajudo a construir um sistema que vai do cartão RFID na catraca até o gráfico de previsão no painel do gestor.',
    paragraphs: [
      {
        title: 'Hoje',
        text: 'Curso o técnico em Desenvolvimento de Sistemas no SENAI junto com o ensino médio no SESI. Nas aulas e nos projetos trabalho com desenvolvimento web, banco de dados, integração de sistemas, interfaces e aplicativos mobile.',
      },
      {
        title: 'No SICAPDA',
        text: 'Sou Scrum Master e desenvolvedor full-stack da FLUXE, uma equipe de cinco pessoas. Além de organizar as entregas, desenvolvo no sistema web e no aplicativo.',
      },
      {
        title: 'Próximo passo',
        text: 'Estou estudando TypeScript e Angular e procuro a minha primeira oportunidade profissional com programação.',
      },
    ],
    facts: [
      { label: 'Base', value: 'Mococa, SP — Brasil' },
      { label: 'Técnico', value: 'Desenvolvimento de Sistemas, SENAI (em andamento)' },
      { label: 'Ensino médio', value: 'SESI (em andamento)' },
      { label: 'Interesses', value: 'Web, back-end e aplicações mobile' },
      { label: 'Estudando', value: 'TypeScript e Angular' },
    ],
  },

  photo: {
    src: photo,
    alt: 'Retrato de Rian Rafael, de óculos e camisa vermelha',
    caption: 'Rian Rafael, Mococa (SP)',
  },

  /**
   * E-mail profissional. Deixe vazio ('') para esconder o e-mail do site:
   * o contato continua funcionando pelo LinkedIn e pelo GitHub.
   * Exemplo: email: 'seunome@gmail.com',
   */
  email: '',

  links: {
    github: { label: 'GitHub', handle: '@rianzitos', url: 'https://github.com/rianzitos' },
    linkedin: {
      label: 'LinkedIn',
      handle: 'in/rian-rafael',
      url: 'https://www.linkedin.com/in/rian-rafael-11218a41a/',
    },
  },
} as const

export type Profile = typeof profile
