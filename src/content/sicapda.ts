import painel from '../assets/sicapda/web/painel.webp'
import painelEscuro from '../assets/sicapda/web/painel-escuro.webp'
import analise from '../assets/sicapda/web/analise.webp'
import analiseEscuro from '../assets/sicapda/web/analise-escuro.webp'
import producao from '../assets/sicapda/web/producao.webp'
import pessoas from '../assets/sicapda/web/pessoas.webp'
import relatorios from '../assets/sicapda/web/relatorios.webp'
import assistente from '../assets/sicapda/web/assistente.webp'
import configuracoes from '../assets/sicapda/web/configuracoes.webp'
import login from '../assets/sicapda/web/login.webp'
import landing from '../assets/sicapda/web/landing.webp'

import appPainel from '../assets/sicapda/app/painel.webp'
import appPainelEscuro from '../assets/sicapda/app/painel-escuro.webp'
import appAnalise from '../assets/sicapda/app/analise.webp'
import appPessoas from '../assets/sicapda/app/pessoas.webp'
import appCadastro from '../assets/sicapda/app/cadastro.webp'
import appRelatorios from '../assets/sicapda/app/relatorios.webp'
import appAssistente from '../assets/sicapda/app/assistente.webp'
import appAlertas from '../assets/sicapda/app/alertas.webp'
import appIntegracoes from '../assets/sicapda/app/integracoes.webp'
import appConfiguracoes from '../assets/sicapda/app/configuracoes.webp'

import { L, type Localized, type Text } from '../i18n'

import video from '../assets/sicapda/video/sicapda-tour.mp4'
import poster from '../assets/sicapda/video/sicapda-tour-poster.webp'

/**
 * Conteúdo do SICAPDA (seção da página inicial e estudo de caso em /sicapda/).
 * Fonte: README e código do repositório rianzitos/SystemFluxe.
 * Textos traduzidos usam L('português', 'english').
 */

export interface Screen {
  id: string
  label: Text
  caption: Localized
  src: string
  path: string
}

export const sicapda = {
  name: 'SICAPDA',
  fullName: L(
    'Sistema Inteligente de Controle de Acesso e Previsão de Demanda Alimentar',
    'Smart Access Control and Food Demand Forecasting System',
  ),
  summary: L(
    'Sistema que integra o controle de acesso à previsão de demanda alimentar em escolas e empresas. As entradas e saídas registradas na catraca viram a base para estimar quantas refeições preparar, apoiar o planejamento do refeitório e reduzir o desperdício de comida.',
    'A system that connects access control to food demand forecasting in schools and companies. The entries and exits recorded at the turnstile become the basis for estimating how many meals to prepare, supporting cafeteria planning and reducing food waste.',
  ),

  meta: [
    {
      label: L('Tipo', 'Type'),
      value: L(
        'Projeto Integrador / TCC — Técnico em Desenvolvimento de Sistemas, SENAI',
        'Capstone project — Technical course in Systems Development, SENAI',
      ),
    },
    { label: L('Equipe', 'Team'), value: L('FLUXE, cinco integrantes', 'FLUXE, five members') },
    { label: L('Meu papel', 'My role'), value: L('Scrum Master e desenvolvedor full-stack', 'Scrum Master and full-stack developer') },
    {
      label: L('Plataformas', 'Platforms'),
      value: L('Web, Android, Windows e navegador (PWA)', 'Web, Android, Windows and browser (PWA)'),
    },
  ],

  problem: {
    title: L('O problema', 'The problem'),
    text: L(
      'Em muitos refeitórios a quantidade de comida é decidida na estimativa. Sem saber quantas pessoas estarão no local em cada refeição, a cozinha produz demais, e o que sobra vira desperdício, ou produz de menos.',
      'In many cafeterias, the amount of food is decided by guesswork. Without knowing how many people will be on site for each meal, the kitchen either cooks too much, and the leftovers become waste, or too little.',
    ),
  },
  solution: {
    title: L('A proposta', 'The approach'),
    text: L(
      'Usar um dado que a instituição já gera: quem entrou e quem saiu. O SICAPDA registra os acessos por cartão RFID e cruza esse histórico com a produção e o desperdício de cada dia para prever pessoas, refeições e quilos, com uma estimativa que é conferida contra o que aconteceu de verdade.',
      'Use data the institution already generates: who came in and who left. SICAPDA records access by RFID card and crosses that history with each day’s production and waste to forecast people, meals and kilos, with an estimate that is checked against what actually happened.',
    ),
  },

  flow: [
    {
      id: 'rfid',
      title: L('Cartão RFID', 'RFID card'),
      text: L('A pessoa aproxima o cartão do leitor na catraca.', 'The person taps the card on the turnstile reader.'),
      code: 'UID "04A39F2B"',
      note: L('identificador do cartão (exemplo), lido por um MFRC522', 'card identifier (example), read by an MFRC522'),
    },
    {
      id: 'esp32',
      title: L('Catraca ESP32', 'ESP32 turnstile'),
      text: L('A placa lê o UID e chama o servidor por Wi-Fi, via HTTPS.', 'The board reads the UID and calls the server over Wi-Fi, via HTTPS.'),
      code: 'POST /api/iot/acesso { uid }',
      note: L('autenticado pelo cabeçalho X-Device-Token', 'authenticated by the X-Device-Token header'),
    },
    {
      id: 'api',
      title: L('API em PHP', 'PHP API'),
      text: L(
        'O servidor valida o cartão, decide entrada ou saída e grava o acesso.',
        'The server validates the card, decides entry or exit and records the access.',
      ),
      code: '{ autorizado, direcao, nome, mensagem }',
      note: L('resposta que libera ou nega a catraca', 'the response that releases or denies the turnstile'),
    },
    {
      id: 'db',
      title: 'MySQL',
      text: L(
        'Acessos, produção e desperdício ficam no mesmo banco, separados por empresa.',
        'Access logs, production and waste live in the same database, separated by company.',
      ),
      code: 'INSERT INTO logs_acesso',
      note: L('a tabela que alimenta painel, relatórios e previsão', 'the table that feeds the dashboard, reports and forecast'),
    },
    {
      id: 'previsao',
      title: L('Previsão', 'Forecast'),
      text: L(
        'Média ponderada dos mesmos dias da semana, tendência recente e feriados.',
        'Weighted average of the same weekdays, recent trend and holidays.',
      ),
      code: 'Previsao.php',
      note: L('pessoas → refeições → quilos', 'people → meals → kilos'),
    },
    {
      id: 'painel',
      title: L('Painel e app', 'Dashboard and app'),
      text: L(
        'Gestores acompanham tudo no site e no aplicativo, em tempo real.',
        'Managers follow everything on the website and in the app, in real time.',
      ),
      code: 'GET /api/aovivo',
      note: L('as telas abertas se atualizam sozinhas', 'open screens update on their own'),
    },
  ],

  features: [
    {
      title: L('Controle de acesso', 'Access control'),
      text: L(
        'Entradas e saídas por cartão RFID. Cadastro de pessoas e cartões, ativação e desativação e importação por planilha CSV.',
        'Entries and exits by RFID card. People and card registration, activation and deactivation, and CSV spreadsheet import.',
      ),
      path: 'app/models/CadastroPessoas.php',
    },
    {
      title: L('Previsão de demanda', 'Demand forecasting'),
      text: L(
        'Estima pessoas, refeições e quilos para café, almoço, jantar e ceia, considera feriados nacionais e mede a própria precisão refazendo os últimos 30 dias.',
        'Estimates people, meals and kilos for breakfast, lunch, dinner and supper, accounts for national holidays and measures its own accuracy by re-running the last 30 days.',
      ),
      path: 'app/models/Previsao.php',
    },
    {
      title: L('Produção e desperdício', 'Production and waste'),
      text: L(
        'Registro do que foi produzido e desperdiçado em cada refeição, com meta de desperdício e uma balança IoT (ESP32 + HX711) que envia as pesagens.',
        'A record of what was produced and wasted at each meal, with a waste target and an IoT scale (ESP32 + HX711) that sends the weighings.',
      ),
      path: 'app/models/RegistroProducao.php',
    },
    {
      title: L('Relatórios', 'Reports'),
      text: L(
        'Uma linha por permanência, com filtros, indicadores e exportação para Excel (.xlsx montado em PHP, sem biblioteca) e CSV.',
        'One row per stay, with filters, indicators and export to Excel (.xlsx built in PHP, with no library) and CSV.',
      ),
      path: 'app/helpers/Xlsx.php',
    },
    {
      title: L('Assistente virtual', 'Virtual assistant'),
      text: L(
        'Responde só sobre o SICAPDA. A IA consulta os dados por ferramentas que sempre filtram pela empresa logada e, sem chave de API, um motor local em PHP assume.',
        'It only answers about SICAPDA. The AI queries data through tools that always filter by the logged-in company and, without an API key, a local PHP engine takes over.',
      ),
      path: 'app/models/AssistenteIA.php',
    },
    {
      title: L('Tempo real e alertas', 'Real time and alerts'),
      text: L(
        'Telas que se atualizam sozinhas, sino de notificações e e-mails automáticos de desperdício alto e de resumo diário, enviados por SMTP próprio.',
        'Screens that update on their own, a notification bell and automatic e-mails for high waste and a daily summary, sent through the project’s own SMTP client.',
      ),
      path: 'app/models/EmailsAutomaticos.php',
    },
    {
      title: L('Aplicativo', 'App'),
      text: L(
        'Feito em Flutter para Android, Windows e navegador (PWA). Usa a mesma API e as mesmas regras do site.',
        'Built with Flutter for Android, Windows and the browser (PWA). It uses the same API and the same rules as the website.',
      ),
      path: 'fluxe_app/lib',
    },
    {
      title: L('Segurança', 'Security'),
      text: L(
        'CSRF nos formulários, papéis de usuário, token próprio para cada dispositivo IoT e sessões ativas que podem ser encerradas.',
        'CSRF protection on forms, user roles, a separate token for each IoT device and active sessions that can be ended.',
      ),
      path: 'app/middleware',
    },
  ],

  engineering: [
    {
      title: L('O turno da noite', 'The night shift'),
      text: L(
        'Nos relatórios, a permanência pertence ao dia da entrada: quem entra às 22h e sai às 2h aparece no dia em que começou, com “+1 dia” na saída.',
        'In reports, a stay belongs to the day of entry: someone who comes in at 10 pm and leaves at 2 am appears on the day the stay began, with “+1 day” on the exit.',
      ),
    },
    {
      title: L('Uma previsão que se avalia', 'A forecast that grades itself'),
      text: L(
        'Para medir a precisão, o sistema recalcula cada um dos últimos 30 dias usando só os dados anteriores a ele e compara com o que foi realizado.',
        'To measure accuracy, the system recomputes each of the last 30 days using only the data from before that day and compares it with what actually happened.',
      ),
    },
    {
      title: L('Mesmas regras, dois clientes', 'Same rules, two clients'),
      text: L(
        'O site (sessão e CSRF) e o app (token Bearer) chamam os mesmos models. Uma regra de cadastro só existe em um lugar.',
        'The website (session and CSRF) and the app (Bearer token) call the same models. A registration rule exists in only one place.',
      ),
    },
    {
      title: L('Catracas independentes', 'Independent turnstiles'),
      text: L(
        'Cada ESP32 se autentica com o próprio token, separado do login das pessoas, e o painel mostra quem está online pelo último sinal.',
        'Each ESP32 authenticates with its own token, separate from people’s logins, and the dashboard shows which ones are online by their last signal.',
      ),
    },
  ],

  tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Flutter', 'Dart', 'ESP32'],
  techExtra: ['Chart.js', L('API do Gemini', 'Gemini API'), L('Wokwi (simulação do circuito)', 'Wokwi (circuit simulation)')] as Text[],

  team: [
    { name: 'Davi Gonçalves', role: L('Project Owner e full-stack', 'Project Owner and full-stack'), me: false },
    { name: 'Rian Rafael', role: L('Scrum Master e full-stack', 'Scrum Master and full-stack'), me: true },
    { name: 'Rhyan Gabriel', role: L('Front-end', 'Front-end'), me: false },
    { name: 'Beatriz Moreira', role: L('Documentação', 'Documentation'), me: false },
    { name: 'Julia Ferreira', role: L('Banco de dados', 'Database'), me: false },
  ],

  links: {
    repo: 'https://github.com/rianzitos/SystemFluxe',
    app: 'https://github.com/rianzitos/fluxe_app',
    site: 'https://fluxeteam.com.br/sicapda',
  },

  video: {
    src: video,
    poster,
    duration: '0:30',
    chapters: [
      { label: 'Login', time: 2.5 },
      { label: L('Painel', 'Dashboard'), time: 5.4 },
      { label: L('Análise mensal', 'Monthly analysis'), time: 9.7 },
      { label: L('Pessoas', 'People'), time: 12.1 },
      { label: L('Assistente', 'Assistant'), time: 14.5 },
      { label: L('Relatórios', 'Reports'), time: 19.1 },
      { label: L('Configurações', 'Settings'), time: 22.1 },
      { label: L('Aplicativo', 'App'), time: 25.7 },
    ] as { label: Text; time: number }[],
  },

  screens: [
    {
      id: 'painel',
      label: L('Painel', 'Dashboard'),
      path: '/painel',
      src: painel,
      caption: L(
        'Indicadores do mês, previsto × realizado em quilos, distribuição por refeição, próximas horas e alertas.',
        'Monthly indicators, forecast vs. actual in kilos, breakdown by meal, upcoming hours and alerts.',
      ),
    },
    {
      id: 'analise',
      label: L('Análise mensal', 'Monthly analysis'),
      path: '/acessos',
      src: analise,
      caption: L('Pessoas por dia, produção e desperdício diários do mês.', 'People per day, plus daily production and waste for the month.'),
    },
    {
      id: 'producao',
      label: L('Produção', 'Production'),
      path: '/producao',
      src: producao,
      caption: L(
        'Registro do produzido e do desperdiçado por refeição, com o previsto ao lado e os últimos 14 dias.',
        'Recording what was produced and wasted per meal, with the forecast alongside and the last 14 days.',
      ),
    },
    {
      id: 'pessoas',
      label: L('Pessoas', 'People'),
      path: '/pessoas',
      src: pessoas,
      caption: L(
        'Quem está no local agora, agrupado por função, com horário de entrada.',
        'Who is on site right now, grouped by role, with entry time.',
      ),
    },
    {
      id: 'relatorios',
      label: L('Relatórios', 'Reports'),
      path: '/relatorios',
      src: relatorios,
      caption: L(
        'Uma linha por permanência, com filtros, indicadores e exportação para Excel e CSV.',
        'One row per stay, with filters, indicators and export to Excel and CSV.',
      ),
    },
    {
      id: 'assistente',
      label: L('Assistente', 'Assistant'),
      path: '/assistente',
      src: assistente,
      caption: L(
        'Assistente virtual com perguntas rápidas, eventos do calendário e a precisão da previsão.',
        'Virtual assistant with quick questions, calendar events and the forecast accuracy.',
      ),
    },
    {
      id: 'configuracoes',
      label: L('Configurações', 'Settings'),
      path: '/configuracoes',
      src: configuracoes,
      caption: L(
        'Perfil, aparência, notificações, integrações IoT e segurança da conta.',
        'Profile, appearance, notifications, IoT integrations and account security.',
      ),
    },
    {
      id: 'painel-escuro',
      label: L('Tema escuro', 'Dark theme'),
      path: '/painel',
      src: painelEscuro,
      caption: L('Todas as telas internas têm tema claro e escuro.', 'Every internal screen has a light and a dark theme.'),
    },
    {
      id: 'analise-escuro',
      label: L('Análise (escuro)', 'Analysis (dark)'),
      path: '/acessos',
      src: analiseEscuro,
      caption: L('Análise mensal no tema escuro.', 'Monthly analysis in the dark theme.'),
    },
    {
      id: 'login',
      label: 'Login',
      path: '/login',
      src: login,
      caption: L('Tela de entrada do sistema.', 'The system’s sign-in screen.'),
    },
    {
      id: 'landing',
      label: L('Página do produto', 'Product page'),
      path: '/sicapda',
      src: landing,
      caption: L('Página pública de apresentação do SICAPDA.', 'SICAPDA’s public landing page.'),
    },
  ] as Screen[],

  appScreens: [
    { id: 'painel', label: L('Painel', 'Dashboard'), src: appPainel },
    { id: 'analise', label: L('Análise mensal', 'Monthly analysis'), src: appAnalise },
    { id: 'pessoas', label: L('Pessoas', 'People'), src: appPessoas },
    { id: 'cadastro', label: L('Cadastro e cartões', 'Registration and cards'), src: appCadastro },
    { id: 'relatorios', label: L('Relatórios', 'Reports'), src: appRelatorios },
    { id: 'assistente', label: L('Assistente', 'Assistant'), src: appAssistente },
    { id: 'alertas', label: L('Alertas', 'Alerts'), src: appAlertas },
    { id: 'integracoes', label: L('Integrações IoT', 'IoT integrations'), src: appIntegracoes },
    { id: 'configuracoes', label: L('Configurações', 'Settings'), src: appConfiguracoes },
    { id: 'painel-escuro', label: L('Tema escuro', 'Dark theme'), src: appPainelEscuro },
  ],

  screenshotNote: L(
    'Capturas do sistema web feitas rodando o código do repositório localmente, com o script de dados de demonstração do próprio projeto (config/dados_exemplo.sql). Nomes, empresa e números são fictícios.',
    'Screenshots of the web system taken by running the repository’s code locally with the project’s own demo data script (config/dados_exemplo.sql). Names, company and numbers are fictional. The system’s interface is in Portuguese.',
  ),
}
