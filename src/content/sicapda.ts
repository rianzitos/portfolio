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

import video from '../assets/sicapda/video/sicapda-tour.mp4'
import poster from '../assets/sicapda/video/sicapda-tour-poster.webp'

/**
 * Conteúdo do SICAPDA (seção da página inicial e estudo de caso em /sicapda/).
 * Fonte: README e código do repositório rianzitos/SystemFluxe.
 */

export interface Screen {
  id: string
  label: string
  caption: string
  src: string
  path: string
}

export const sicapda = {
  name: 'SICAPDA',
  fullName: 'Sistema Inteligente de Controle de Acesso e Previsão de Demanda Alimentar',
  summary:
    'Sistema que integra o controle de acesso à previsão de demanda alimentar em escolas e empresas. As entradas e saídas registradas na catraca viram a base para estimar quantas refeições preparar, apoiar o planejamento do refeitório e reduzir o desperdício de comida.',

  meta: [
    { label: 'Tipo', value: 'Projeto Integrador / TCC — Técnico em Desenvolvimento de Sistemas, SENAI' },
    { label: 'Equipe', value: 'FLUXE, cinco integrantes' },
    { label: 'Meu papel', value: 'Scrum Master e desenvolvedor full-stack' },
    { label: 'Plataformas', value: 'Web, Android, Windows e navegador (PWA)' },
  ],

  problem: {
    title: 'O problema',
    text: 'Em muitos refeitórios a quantidade de comida é decidida na estimativa. Sem saber quantas pessoas estarão no local em cada refeição, a cozinha produz demais, e o que sobra vira desperdício, ou produz de menos.',
  },
  solution: {
    title: 'A proposta',
    text: 'Usar um dado que a instituição já gera: quem entrou e quem saiu. O SICAPDA registra os acessos por cartão RFID e cruza esse histórico com a produção e o desperdício de cada dia para prever pessoas, refeições e quilos, com uma estimativa que é conferida contra o que aconteceu de verdade.',
  },

  flow: [
    { id: 'rfid', title: 'Cartão RFID', text: 'A pessoa aproxima o cartão do leitor na catraca.' },
    { id: 'esp32', title: 'Catraca ESP32', text: 'A placa lê o UID e chama o servidor por Wi-Fi, via HTTPS.' },
    { id: 'api', title: 'API em PHP', text: 'O servidor valida o cartão, decide entrada ou saída e grava o acesso.' },
    { id: 'db', title: 'MySQL', text: 'Acessos, produção e desperdício ficam no mesmo banco, separados por empresa.' },
    { id: 'previsao', title: 'Previsão', text: 'Média ponderada dos mesmos dias da semana, tendência recente e feriados.' },
    { id: 'painel', title: 'Painel e app', text: 'Gestores acompanham tudo no site e no aplicativo, em tempo real.' },
  ],

  features: [
    {
      title: 'Controle de acesso',
      text: 'Entradas e saídas por cartão RFID. Cadastro de pessoas e cartões, ativação e desativação e importação por planilha CSV.',
      path: 'app/models/CadastroPessoas.php',
    },
    {
      title: 'Previsão de demanda',
      text: 'Estima pessoas, refeições e quilos para café, almoço, jantar e ceia, considera feriados nacionais e mede a própria precisão refazendo os últimos 30 dias.',
      path: 'app/models/Previsao.php',
    },
    {
      title: 'Produção e desperdício',
      text: 'Registro do que foi produzido e desperdiçado em cada refeição, com meta de desperdício e uma balança IoT (ESP32 + HX711) que envia as pesagens.',
      path: 'app/models/RegistroProducao.php',
    },
    {
      title: 'Relatórios',
      text: 'Uma linha por permanência, com filtros, indicadores e exportação para Excel (.xlsx montado em PHP, sem biblioteca) e CSV.',
      path: 'app/helpers/Xlsx.php',
    },
    {
      title: 'Assistente virtual',
      text: 'Responde só sobre o SICAPDA. A IA consulta os dados por ferramentas que sempre filtram pela empresa logada e, sem chave de API, um motor local em PHP assume.',
      path: 'app/models/AssistenteIA.php',
    },
    {
      title: 'Tempo real e alertas',
      text: 'Telas que se atualizam sozinhas, sino de notificações e e-mails automáticos de desperdício alto e de resumo diário, enviados por SMTP próprio.',
      path: 'app/models/EmailsAutomaticos.php',
    },
    {
      title: 'Aplicativo',
      text: 'Feito em Flutter para Android, Windows e navegador (PWA). Usa a mesma API e as mesmas regras do site.',
      path: 'fluxe_app/lib',
    },
    {
      title: 'Segurança',
      text: 'CSRF nos formulários, papéis de usuário, token próprio para cada dispositivo IoT e sessões ativas que podem ser encerradas.',
      path: 'app/middleware',
    },
  ],

  engineering: [
    {
      title: 'O turno da noite',
      text: 'Nos relatórios, a permanência pertence ao dia da entrada: quem entra às 22h e sai às 2h aparece no dia em que começou, com “+1 dia” na saída.',
    },
    {
      title: 'Uma previsão que se avalia',
      text: 'Para medir a precisão, o sistema recalcula cada um dos últimos 30 dias usando só os dados anteriores a ele e compara com o que foi realizado.',
    },
    {
      title: 'Mesmas regras, dois clientes',
      text: 'O site (sessão e CSRF) e o app (token Bearer) chamam os mesmos models. Uma regra de cadastro só existe em um lugar.',
    },
    {
      title: 'Catracas independentes',
      text: 'Cada ESP32 se autentica com o próprio token, separado do login das pessoas, e o painel mostra quem está online pelo último sinal.',
    },
  ],

  tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Flutter', 'Dart', 'ESP32'],
  techExtra: ['Chart.js', 'API do Gemini', 'Wokwi (simulação do circuito)'],

  team: [
    { name: 'Davi Gonçalves', role: 'Project Owner e full-stack' },
    { name: 'Rian Rafael', role: 'Scrum Master e full-stack', me: true },
    { name: 'Rhyan Gabriel', role: 'Front-end' },
    { name: 'Beatriz Moreira', role: 'Documentação' },
    { name: 'Julia Ferreira', role: 'Banco de dados' },
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
      { label: 'Painel', time: 5.4 },
      { label: 'Análise mensal', time: 9.7 },
      { label: 'Pessoas', time: 12.1 },
      { label: 'Assistente', time: 14.5 },
      { label: 'Relatórios', time: 19.1 },
      { label: 'Configurações', time: 22.1 },
      { label: 'Aplicativo', time: 25.7 },
    ],
  },

  screens: [
    { id: 'painel', label: 'Painel', path: '/painel', src: painel, caption: 'Indicadores do mês, previsto × realizado em quilos, distribuição por refeição, próximas horas e alertas.' },
    { id: 'analise', label: 'Análise mensal', path: '/acessos', src: analise, caption: 'Pessoas por dia, produção e desperdício diários do mês.' },
    { id: 'producao', label: 'Produção', path: '/producao', src: producao, caption: 'Registro do produzido e do desperdiçado por refeição, com o previsto ao lado e os últimos 14 dias.' },
    { id: 'pessoas', label: 'Pessoas', path: '/pessoas', src: pessoas, caption: 'Quem está no local agora, agrupado por função, com horário de entrada.' },
    { id: 'relatorios', label: 'Relatórios', path: '/relatorios', src: relatorios, caption: 'Uma linha por permanência, com filtros, indicadores e exportação para Excel e CSV.' },
    { id: 'assistente', label: 'Assistente', path: '/assistente', src: assistente, caption: 'Assistente virtual com perguntas rápidas, eventos do calendário e a precisão da previsão.' },
    { id: 'configuracoes', label: 'Configurações', path: '/configuracoes', src: configuracoes, caption: 'Perfil, aparência, notificações, integrações IoT e segurança da conta.' },
    { id: 'painel-escuro', label: 'Tema escuro', path: '/painel', src: painelEscuro, caption: 'Todas as telas internas têm tema claro e escuro.' },
    { id: 'analise-escuro', label: 'Análise (escuro)', path: '/acessos', src: analiseEscuro, caption: 'Análise mensal no tema escuro.' },
    { id: 'login', label: 'Login', path: '/login', src: login, caption: 'Tela de entrada do sistema.' },
    { id: 'landing', label: 'Página do produto', path: '/sicapda', src: landing, caption: 'Página pública de apresentação do SICAPDA.' },
  ] as Screen[],

  appScreens: [
    { id: 'painel', label: 'Painel', src: appPainel },
    { id: 'analise', label: 'Análise mensal', src: appAnalise },
    { id: 'pessoas', label: 'Pessoas', src: appPessoas },
    { id: 'cadastro', label: 'Cadastro e cartões', src: appCadastro },
    { id: 'relatorios', label: 'Relatórios', src: appRelatorios },
    { id: 'assistente', label: 'Assistente', src: appAssistente },
    { id: 'alertas', label: 'Alertas', src: appAlertas },
    { id: 'integracoes', label: 'Integrações IoT', src: appIntegracoes },
    { id: 'configuracoes', label: 'Configurações', src: appConfiguracoes },
    { id: 'painel-escuro', label: 'Tema escuro', src: appPainelEscuro },
  ],

  screenshotNote:
    'Capturas do sistema web feitas rodando o código do repositório localmente, com o script de dados de demonstração do próprio projeto (config/dados_exemplo.sql). Nomes, empresa e números são fictícios.',
} as const
