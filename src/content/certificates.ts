/**
 * Cursos e certificados.
 *
 * Os dados abaixo foram transcritos dos PDFs emitidos pelo SENAI-SP.
 * Para adicionar um certificado:
 *   1. Coloque em src/assets/certificados/ três arquivos com o mesmo nome (o `slug`):
 *        <slug>.pdf          (o certificado)
 *        <slug>.webp         (imagem da 1ª página, para a visualização)
 *        <slug>-thumb.webp   (miniatura)
 *      Se tiver só o PDF, tudo bem: o site mostra o botão "Abrir PDF" sem a imagem.
 *   2. Adicione um objeto na lista `certificates`.
 *
 * Observação: nas versões publicadas, o número do RG foi coberto por uma tarja.
 */

export type CertificateArea = 'Tecnologia' | 'Gestão e negócios' | 'Sustentabilidade' | 'Segurança do trabalho'

export interface Certificate {
  slug: string
  title: string
  area: CertificateArea
  hours: number
  /** Datas no formato AAAA-MM-DD, como no certificado. */
  start: string
  end: string
  institution: string
  unit: string
  modality: string
  /** Código de autenticação impresso no certificado (consulta no site do SENAI-SP). */
  verifyCode?: string
  topics: string[]
}

const SENAI_SJBV = 'Centro de Treinamento SENAI – São João da Boa Vista'

export const certificates: Certificate[] = [
  {
    slug: 'competencia-transversal-logica-de-programacao',
    title: 'Competência Transversal – Lógica de Programação',
    area: 'Tecnologia',
    hours: 14,
    start: '2025-02-27',
    end: '2025-03-13',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00035937/7992865',
    topics: [
      'Representações de um algoritmo',
      'Tipos de dados e variáveis indexadas',
      'Expressões aritméticas, literais e lógicas',
      'Estruturas de condição e de repetição',
    ],
  },
  {
    slug: 'etica-na-inteligencia-artificial',
    title: 'Ética na Inteligência Artificial',
    area: 'Tecnologia',
    hours: 4,
    start: '2025-03-17',
    end: '2025-05-06',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045616/7992865',
    topics: ['Definição de Inteligência Artificial', 'Pilares da IA responsável', 'Marco legal para IA', 'Desafios e oportunidades da IA'],
  },
  {
    slug: 'fluencia-fundamentos-da-inteligencia-artificial',
    title: 'Fluência – Fundamentos da Inteligência Artificial',
    area: 'Tecnologia',
    hours: 8,
    start: '2025-03-17',
    end: '2025-05-07',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045740/7992865',
    topics: [
      'IA tradicional e IA generativa',
      'Impacto da IA nos mecanismos de pesquisa',
      'Bing Chat e Copilot do Microsoft 365 no trabalho',
      'Questões éticas e uso responsável',
    ],
  },
  {
    slug: 'regulamentacao-da-lgpd-e-atuacao-da-anpd',
    title: 'Regulamentação da LGPD e Atuação da ANPD',
    area: 'Tecnologia',
    hours: 4,
    start: '2025-05-27',
    end: '2025-05-29',
    institution: 'SENAI-SP',
    unit: 'Escola SENAI de Educação Online',
    modality: 'EAD',
    verifyCode: '00042680/7992865',
    topics: ['Principais funções da ANPD', 'Regulamentação da LGPD', 'Procedimentos e sanções administrativas'],
  },
  {
    slug: 'por-dentro-da-seguranca-cibernetica',
    title: 'Por Dentro da Segurança Cibernética',
    area: 'Tecnologia',
    hours: 4,
    start: '2025-03-17',
    end: '2025-06-06',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045613/7992865',
    topics: ['Tipos de ameaças cibernéticas', 'Técnicas de coleta de informação', 'Técnicas de prevenção'],
  },
  {
    slug: 'competencia-transversal-seguranca-no-trabalho',
    title: 'Competência Transversal – Segurança no Trabalho',
    area: 'Segurança do trabalho',
    hours: 14,
    start: '2025-03-17',
    end: '2025-06-09',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045611/7992865',
    topics: ['Conceitos e principais acidentes de trabalho', 'EPI e EPC', 'Causas mais comuns dos acidentes', 'CIPA e mapa de risco'],
  },
  {
    slug: 'excel-basico',
    title: 'Excel Básico',
    area: 'Tecnologia',
    hours: 20,
    start: '2025-03-17',
    end: '2025-06-10',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045610/7992865',
    topics: ['Edição e formatação de dados', 'Fórmulas e funções básicas', 'Formatação condicional', 'Criação de gráficos'],
  },
  {
    slug: 'desvendando-a-descarbonizacao',
    title: 'Desvendando a Descarbonização',
    area: 'Sustentabilidade',
    hours: 20,
    start: '2025-03-17',
    end: '2025-06-10',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00045614/7992865',
    topics: [
      'Economia de baixo carbono',
      'Aspectos e impactos ambientais',
      'Mitigação e adaptação às mudanças climáticas',
      'Instrumentos de precificação de carbono',
    ],
  },
  {
    slug: 'desvendando-a-industria-4-0',
    title: 'Desvendando a Indústria 4.0',
    area: 'Tecnologia',
    hours: 20,
    start: '2026-02-23',
    end: '2026-03-28',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00029/7992865',
    topics: [
      'Tecnologias habilitadoras: IoT, Big Data, nuvem e IA',
      'Robótica avançada',
      'Manufatura digital e integração de sistemas',
      'Boas práticas de segurança digital',
    ],
  },
  {
    slug: 'empreender-senai',
    title: 'Empreender SENAI',
    area: 'Gestão e negócios',
    hours: 20,
    start: '2026-02-23',
    end: '2026-04-25',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00053/7992865',
    topics: ['Estruturação de um negócio próprio', 'Viabilidade e público-alvo', 'Análise de mercado', 'Aspectos legais'],
  },
  {
    slug: 'cidadania-digital-e-uso-consciente-da-internet',
    title: 'Cidadania Digital e Uso Consciente da Internet',
    area: 'Tecnologia',
    hours: 4,
    start: '2026-02-23',
    end: '2026-04-27',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00069/7992865',
    topics: [
      'Legislação sobre internet e proteção de dados',
      'Impactos da IA na produção de conteúdo',
      'Segurança de dados e privacidade online',
      'Uso excessivo de tecnologia e saúde mental',
    ],
  },
  {
    slug: 'geracao-de-valor-circular-e-modelos-de-negocios',
    title: 'Geração de Valor Circular e Modelos de Negócios',
    area: 'Sustentabilidade',
    hours: 4,
    start: '2026-02-23',
    end: '2026-04-28',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00067/7992865',
    topics: [
      'Características da economia circular',
      'Princípios de criação de valor circular',
      'Modelos de negócio da economia circular',
      'Vantagens e desafios desses modelos',
    ],
  },
  {
    slug: 'design-thinking',
    title: 'Design Thinking',
    area: 'Gestão e negócios',
    hours: 8,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00060/7992865',
    topics: ['Novas formas de pensar a criação de produtos e serviços'],
  },
  {
    slug: 'fundamentos-da-gestao-de-projetos-aplicados-na-industria',
    title: 'Fundamentos da Gestão de Projetos Aplicados na Indústria',
    area: 'Gestão e negócios',
    hours: 12,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00059/7992865',
    topics: ['Fundamentos da gestão de projetos', 'Metodologias tradicionais e ágeis', 'Ferramentas do Scrum'],
  },
  {
    slug: 'gestao-do-tempo',
    title: 'Gestão do Tempo',
    area: 'Gestão e negócios',
    hours: 8,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00061/7992865',
    topics: ['Formas eficientes de usar o tempo', 'Ferramentas de organização', 'Aspectos do trabalho remoto'],
  },
  {
    slug: 'desvendando-o-esg',
    title: 'Desvendando o ESG',
    area: 'Sustentabilidade',
    hours: 20,
    start: '2026-02-23',
    end: '2026-05-03',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: 'EAD',
    verifyCode: '00058/7992865',
    topics: [
      'Governança ambiental, social e corporativa',
      'Riscos e estratégias de mitigação',
      'Responsabilidade social nas empresas',
      'Inovação e tecnologia na agenda ESG',
    ],
  },
]

export const certificateAreas: CertificateArea[] = ['Tecnologia', 'Gestão e negócios', 'Sustentabilidade', 'Segurança do trabalho']

export const verifyUrl = (code: string) => `https://www.sp.senai.br/consulta-certificado?qrcode=${code}`

/* ─── Arquivos (PDF e imagens) ────────────────────────────────────────────────
   Encontrados automaticamente pelo nome. Não precisa importar um por um. */
const pdfs = import.meta.glob<string>('../assets/certificados/*.pdf', { eager: true, query: '?url', import: 'default' })
const images = import.meta.glob<string>('../assets/certificados/*.webp', { eager: true, query: '?url', import: 'default' })

const fileFor = (map: Record<string, string>, name: string) => map[`../assets/certificados/${name}`]

export const certificateFiles = (slug: string) => ({
  pdf: fileFor(pdfs, `${slug}.pdf`),
  image: fileFor(images, `${slug}.webp`),
  thumb: fileFor(images, `${slug}-thumb.webp`) ?? fileFor(images, `${slug}.webp`),
})
