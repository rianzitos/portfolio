import { L } from '../i18n'

/**
 * Textos de interface (botões, títulos de seção, rótulos), nos dois idiomas.
 * O conteúdo sobre você e os projetos fica nos outros arquivos desta pasta.
 */
export const ui = {
  meta: {
    homeTitle: L('Rian Rafael — Desenvolvedor de software em formação', 'Rian Rafael — Software developer in training'),
    homeDescription: L(
      'Portfólio de Rian Rafael, estudante de Desenvolvimento de Sistemas no SENAI (Mococa, SP). Projetos web, back-end e mobile, com destaque para o SICAPDA, e certificados de cursos do SENAI-SP.',
      'Portfolio of Rian Rafael, a Systems Development student at SENAI (Mococa, Brazil). Web, back-end and mobile projects, featuring SICAPDA, plus course certificates from SENAI-SP.',
    ),
    caseTitle: L('SICAPDA — Estudo de caso · Rian Rafael', 'SICAPDA — Case study · Rian Rafael'),
    caseDescription: L(
      'Estudo de caso do SICAPDA, sistema de controle de acesso por RFID e previsão de demanda alimentar desenvolvido pela equipe FLUXE no técnico em Desenvolvimento de Sistemas do SENAI.',
      'Case study of SICAPDA, an RFID access control and food demand forecasting system built by the FLUXE team in SENAI’s technical course in Systems Development.',
    ),
  },

  common: {
    newTab: L(' (abre em nova aba)', ' (opens in a new tab)'),
    close: L('Fechar', 'Close'),
    portfolio: L('Portfólio', 'Portfolio'),
    technologies: L('Tecnologias', 'Technologies'),
    repository: L('Repositório', 'Repository'),
    viewLive: L('Ver online', 'View live'),
    backToTop: L('Voltar ao topo', 'Back to top'),
    previous: L('Anterior', 'Previous'),
    next: L('Próximo', 'Next'),
    enlarge: L('Ampliar', 'Enlarge'),
    enlargedImage: L('Imagem ampliada', 'Enlarged image'),
    email: L('E-mail', 'Email'),
  },

  header: {
    skip: L('Pular para o conteúdo', 'Skip to content'),
    tagline: L('Dev. em formação', 'Dev in training'),
    sections: L('Seções', 'Sections'),
    menu: L('Menu', 'Menu'),
    backToTopAria: L('voltar ao topo', 'back to top'),
    /* O rótulo descreve a ação e fica no idioma de destino. */
    switchLanguage: L('Switch to English', 'Mudar para português'),
    darkTheme: L('Ativar tema escuro', 'Switch to dark theme'),
    lightTheme: L('Ativar tema claro', 'Switch to light theme'),
  },

  footer: {
    madeWith: L('Feito com React, TypeScript e Tailwind CSS.', 'Built with React, TypeScript and Tailwind CSS.'),
  },

  hero: {
    index: L('Índice', 'Contents'),
    indexAria: L('Índice da página', 'Page contents'),
    viewProjects: L('Ver projetos', 'View projects'),
    contact: L('Entrar em contato', 'Get in touch'),
  },

  about: {
    label: L('Sobre', 'About'),
    aside: L('Quem está por trás do código', 'The person behind the code'),
  },

  featured: {
    label: L('Projeto principal', 'Main project'),
    aside: L('Projeto Integrador · SENAI · Equipe FLUXE', 'Capstone project · SENAI · FLUXE team'),
    caseStudy: L('Ver estudo de caso', 'Read the case study'),
    tour: L('Tour pelo sistema', 'System tour'),
    tourAside: L('do login ao aplicativo', 'from login to the app'),
    screens: L('Telas do sistema web', 'Web system screens'),
    allScreens: L('Todas as telas e o aplicativo', 'All screens and the app'),
  },

  projects: {
    label: L('Outros projetos', 'Other projects'),
    more: L('Mais no GitHub', 'More on GitHub'),
    logoOf: L('Logo do', 'Logo of'),
  },

  stack: {
    aside: L(
      'Sem barras de porcentagem: só onde cada coisa já foi usada',
      'No percentage bars: just where each thing has actually been used',
    ),
    title: L('Ferramentas do dia a dia', 'Everyday tools'),
    inUse: L('Uso em projetos', 'Used in projects'),
    learning: L('Em aprendizado', 'Learning'),
    usedInSr: L('Onde já usei: ', 'Where I’ve used it: '),
  },

  certificates: {
    label: L('Cursos e certificados', 'Courses and certificates'),
    aside: L('SENAI-SP · Educação a distância', 'SENAI-SP · Online learning'),
    statCourses: L('cursos concluídos', 'courses completed'),
    statHours: L('de carga horária', 'of coursework'),
    statAreas: L('áreas de estudo', 'areas of study'),
    introA: L('Cursos livres a distância do SENAI-SP, feitos entre', 'Short online courses from SENAI-SP, taken between'),
    introAnd: L('e', 'and'),
    introB: L(
      'Cada certificado pode ser aberto em PDF e conferido no site do SENAI pelo código de autenticação.',
      'Each certificate can be opened as a PDF and verified on SENAI’s website using its authentication code. Certificates are issued in Portuguese.',
    ),
    hoursByArea: L('Horas por área', 'Hours by area'),
    hoursWord: L('horas', 'hours'),
    filterAria: L('Filtrar por área', 'Filter by area'),
    all: L('Todos', 'All'),
    colNumber: L('Nº', 'No.'),
    colCourse: L('Curso', 'Course'),
    colArea: L('Área', 'Area'),
    colHours: L('Carga', 'Hours'),
    colDone: L('Conclusão', 'Completed'),
    view: L('Ver certificado', 'View certificate'),
    privacy: L(
      'Nas versões publicadas aqui, o número do documento de identidade foi coberto. Os certificados originais podem ser conferidos no site do SENAI-SP pelo código de autenticação de cada um.',
      'In the versions published here, the ID document number has been covered. The original certificates can be verified on the SENAI-SP website using each one’s authentication code.',
    ),
    dialogLabel: L('Certificado', 'Certificate'),
    of: L('de', 'of'),
    imageAltA: L('Certificado do curso', 'Certificate for the course'),
    imageAltB: L('emitido pelo', 'issued by'),
    noImage: L('Imagem não disponível. Abra o PDF.', 'Image not available. Open the PDF.'),
    originalTitle: L('Título original', 'Original title'),
    institution: L('Instituição', 'Institution'),
    unit: L('Unidade', 'Campus'),
    modality: L('Modalidade', 'Format'),
    workload: L('Carga horária', 'Workload'),
    period: L('Período', 'Period'),
    to: L('a', 'to'),
    area: L('Área', 'Area'),
    content: L('Conteúdo', 'Topics'),
    openPdf: L('Abrir PDF', 'Open PDF'),
    verify: L('Verificar no SENAI', 'Verify with SENAI'),
    code: L('Código', 'Code'),
  },

  education: {
    label: L('Formação', 'Education'),
    aside: L('Ensino médio, técnico e cursos livres', 'High school, technical course and short courses'),
    title: L(['Escola,', 'técnico e', 'cursos'], ['School,', 'technical', 'and courses']),
    ongoing: L('Em andamento', 'In progress'),
    done: L('Concluído', 'Completed'),
    coursesTitle: L('Cursos livres a distância', 'Short online courses'),
    coursesText: L(
      'cursos e {hours} horas em tecnologia, gestão, sustentabilidade e segurança do trabalho.',
      'courses and {hours} hours in technology, management, sustainability and workplace safety.',
    ),
    viewCertificates: L('Ver certificados', 'View certificates'),
  },

  contact: {
    label: L('Contato', 'Contact'),
    title: L(['Vamos', 'conversar'], ['Let’s', 'talk']),
    text: L(
      'Procuro estágio ou uma primeira oportunidade em desenvolvimento. Se você tem uma vaga, um projeto ou quer saber mais sobre o SICAPDA, pode me chamar.',
      'I’m looking for an internship or a first opportunity in software development. If you have an opening, a project, or want to know more about SICAPDA, reach out.',
    ),
    replyLinkedin: L('Respondo pelo LinkedIn.', 'I reply on LinkedIn.'),
    replyBoth: L('Respondo pelo LinkedIn ou por e-mail.', 'I reply on LinkedIn or by email.'),
    copy: L('Copiar', 'Copy'),
    copied: L('Copiado', 'Copied'),
    copyAria: L('Copiar endereço de e-mail', 'Copy email address'),
  },

  video: {
    aria: L(
      'Tour de 30 segundos pelo SICAPDA: login, painel, análise mensal, pessoas, assistente, relatórios, configurações e aplicativo',
      '30-second tour of SICAPDA: login, dashboard, monthly analysis, people, assistant, reports, settings and app',
    ),
    watch: L('Assistir ao tour', 'Watch the tour'),
    pause: L('Pausar vídeo', 'Pause video'),
    play: L('Reproduzir vídeo', 'Play video'),
    unmute: L('Ativar som', 'Turn sound on'),
    mute: L('Desativar som', 'Turn sound off'),
    soundOn: L('Som ligado', 'Sound on'),
    fullscreen: L('Tela cheia', 'Fullscreen'),
    chapters: L('Capítulos do vídeo', 'Video chapters'),
  },

  flow: {
    label: L('Como funciona', 'How it works'),
    title: L('Do cartão ao painel', 'From the card to the dashboard'),
    step: L('Passo', 'Step'),
    stepsAria: L('Etapas do funcionamento', 'How it works, step by step'),
    goTo: L('Ir para o passo', 'Go to step'),
    hint: L('Role para acompanhar', 'Scroll to follow along'),
    canvasAria: L(
      'Ilustração animada do caminho dos dados: catraca com leitor RFID, placa ESP32, servidor, banco de dados, previsão e painel.',
      'Animated illustration of the data path: RFID turnstile, ESP32 board, server, database, forecast and dashboard.',
    ),
  },

  card: {
    label: L('Cartão de acesso', 'Access card'),
    contact: L('Contato', 'Contact'),
    place: L('Mococa · SP · Brasil', 'Mococa · SP · Brazil'),
    hint: L('Arraste ou clique', 'Drag or click'),
    hintAria: L('Virar o cartão', 'Flip the card'),
  },

  gallery: {
    aria: L('Telas do sistema', 'System screens'),
    previous: L('Tela anterior', 'Previous screen'),
    next: L('Próxima tela', 'Next screen'),
    enlargeScreen: L('Ampliar a tela', 'Enlarge the screen'),
    screenOf: L('Tela', 'Screen'),
    ofSicapda: L('do SICAPDA', 'of SICAPDA'),
  },

  app: {
    previous: L('Telas anteriores', 'Previous screens'),
    next: L('Próximas telas', 'Next screens'),
    aria: L('Telas do aplicativo', 'App screens'),
    alt: L('Aplicativo SICAPDA, tela', 'SICAPDA app, screen:'),
  },

  caseStudy: {
    nav: {
      overview: L('Visão geral', 'Overview'),
      how: L('Como funciona', 'How it works'),
      features: L('Funcionalidades', 'Features'),
      screens: L('Telas', 'Screens'),
      app: L('App', 'App'),
      team: L('Equipe', 'Team'),
    },
    breadcrumbAria: L('Você está em', 'You are here'),
    projects: L('Projetos', 'Projects'),
    eyebrow: L('Estudo de caso', 'Case study'),
    repoSystem: L('Repositório do sistema', 'System repository'),
    repoApp: L('Repositório do app', 'App repository'),
    site: L('Site do projeto', 'Project website'),
    painelAlt: L('Painel geral do SICAPDA.', 'SICAPDA’s main dashboard.'),
    tourOf: L('Tour de', 'Tour:'),
    howAside: L('Do cartão ao painel', 'From the card to the dashboard'),
    howTitle: L(['Cada passagem na catraca', 'alimenta a previsão.'], ['Every turnstile pass', 'feeds the forecast.']),
    featuresAside: L('Com o arquivo onde cada uma vive no código', 'With the file where each one lives in the code'),
    screensLabel: L('Telas do sistema web', 'Web system screens'),
    captures: L('capturas', 'screenshots'),
    appLabel: L('Aplicativo', 'App'),
    appAside: L('Flutter · Android, Windows e navegador', 'Flutter · Android, Windows and browser'),
    appTitle: L(['O mesmo sistema,', 'no bolso do gestor.'], ['The same system,', 'in the manager’s pocket.']),
    appText: L(
      'O app em Flutter usa o mesmo login, a mesma API e as mesmas regras do site. Quem cuida da cozinha ou da portaria consulta a previsão, vê quem está no local, cadastra cartões e acompanha as catracas sem estar no computador.',
      'The Flutter app uses the same login, the same API and the same rules as the website. Whoever runs the kitchen or the front gate can check the forecast, see who is on site, register cards and monitor the turnstiles without being at a computer.',
    ),
    appCode: L('Código do aplicativo', 'App source code'),
    engineeringLabel: L('Detalhes de engenharia', 'Engineering details'),
    engineeringAside: L('Problemas pequenos que fazem diferença', 'Small problems that make a difference'),
    teamLabel: L('Equipe e tecnologias', 'Team and technologies'),
    teamTitle: L('Equipe FLUXE', 'FLUXE team'),
    me: L('eu', 'me'),
    alsoInProject: L('Também no projeto', 'Also in the project'),
    back: L('Voltar ao portfólio', 'Back to the portfolio'),
  },
}
