import photo from '../assets/rian.webp'
import { L } from '../i18n'

/**
 * Dados pessoais e de contato.
 * Tudo o que aparece no topo, no "Sobre" e no "Contato" sai daqui.
 * Textos traduzidos usam L('português', 'english').
 */
export const profile = {
  name: 'Rian Rafael',
  firstName: 'Rian',
  lastName: 'Rafael',
  role: L('Desenvolvedor de software em formação', 'Software developer in training'),
  location: {
    city: 'Mococa',
    state: 'SP',
    timeZone: 'America/Sao_Paulo',
  },
  /** Aparece no topo da página e no contato. Ajuste quando a sua situação mudar. */
  availability: L('Aberto a estágio e primeiras oportunidades', 'Open to internships and entry-level roles'),

  heroBio: L(
    'Estudo Desenvolvimento de Sistemas no SENAI e faço o ensino médio no SESI. Gosto de projetos que saem do papel e resolvem um problema concreto. O maior até agora é o SICAPDA, o meu TCC.',
    'I study Systems Development at SENAI and attend high school at SESI. I like projects that leave the drawing board and solve a concrete problem. The biggest so far is SICAPDA, my capstone project.',
  ),

  about: {
    lead: L(
      'No meu TCC, ajudo a construir um sistema que vai do cartão RFID na catraca até o gráfico de previsão no painel do gestor.',
      'For my capstone project, I help build a system that goes from the RFID card at the turnstile to the forecast chart on the manager’s dashboard.',
    ),
    paragraphs: [
      {
        title: L('Hoje', 'Today'),
        text: L(
          'Curso o técnico em Desenvolvimento de Sistemas no SENAI junto com o ensino médio no SESI. Nas aulas e nos projetos trabalho com desenvolvimento web, banco de dados, integração de sistemas, interfaces e aplicativos mobile.',
          'I’m taking the technical course in Systems Development at SENAI alongside high school at SESI. In classes and projects I work with web development, databases, systems integration, interfaces and mobile apps.',
        ),
      },
      {
        title: L('No SICAPDA', 'On SICAPDA'),
        text: L(
          'Sou Scrum Master e desenvolvedor full-stack da FLUXE, uma equipe de cinco pessoas. Além de organizar as entregas, desenvolvo no sistema web e no aplicativo.',
          'I’m the Scrum Master and a full-stack developer at FLUXE, a team of five. Besides organizing deliveries, I develop the web system and the app.',
        ),
      },
      {
        title: L('Próximo passo', 'Next step'),
        text: L(
          'Estou estudando TypeScript e Angular e procuro a minha primeira oportunidade profissional com programação.',
          'I’m studying TypeScript and Angular and looking for my first professional opportunity in programming.',
        ),
      },
    ],
    facts: [
      { label: L('Base', 'Based in'), value: L('Mococa, SP — Brasil', 'Mococa, São Paulo — Brazil') },
      {
        label: L('Técnico', 'Technical course'),
        value: L('Desenvolvimento de Sistemas, SENAI (em andamento)', 'Systems Development, SENAI (in progress)'),
      },
      { label: L('Ensino médio', 'High school'), value: L('SESI (em andamento)', 'SESI (in progress)') },
      { label: L('Interesses', 'Interests'), value: L('Web, back-end e aplicações mobile', 'Web, back-end and mobile apps') },
      { label: L('Estudando', 'Learning'), value: L('TypeScript e Angular', 'TypeScript and Angular') },
    ],
  },

  photo: {
    src: photo,
    alt: L('Retrato de Rian Rafael, de óculos e camisa vermelha', 'Portrait of Rian Rafael, wearing glasses and a red shirt'),
    caption: L('Rian Rafael, Mococa (SP)', 'Rian Rafael, Mococa (Brazil)'),
  },

  /**
   * E-mail de contato. Deixe vazio ('') para esconder o e-mail do site:
   * o contato continua funcionando pelo LinkedIn e pelo GitHub.
   */
  email: 'rianrafael063@gmail.com',

  links: {
    github: { label: 'GitHub', handle: '@rianzitos', url: 'https://github.com/rianzitos' },
    linkedin: {
      label: 'LinkedIn',
      handle: 'in/rian-rafael',
      url: 'https://www.linkedin.com/in/rian-rafael-11218a41a/',
    },
  },
}

export type Profile = typeof profile
