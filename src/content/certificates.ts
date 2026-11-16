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
 *   2. Adicione um objeto na lista `certificates`. Textos traduzidos usam L('português', 'english').
 *
 * Observação: nas versões publicadas, o número do RG foi coberto por uma tarja.
 */

import { L, type Localized } from '../i18n'

export type CertificateArea = 'tecnologia' | 'gestao' | 'sustentabilidade' | 'seguranca'

export const areaLabels: Record<CertificateArea, Localized> = {
  tecnologia: L('Tecnologia', 'Technology'),
  gestao: L('Gestão e negócios', 'Management and business'),
  sustentabilidade: L('Sustentabilidade', 'Sustainability'),
  seguranca: L('Segurança do trabalho', 'Workplace safety'),
}

export interface Certificate {
  slug: string
  /** Título oficial, como está no certificado (pt), e a tradução (en). */
  title: Localized
  area: CertificateArea
  hours: number
  /** Datas no formato AAAA-MM-DD, como no certificado. */
  start: string
  end: string
  institution: string
  unit: string
  modality: Localized
  /** Código de autenticação impresso no certificado (consulta no site do SENAI-SP). */
  verifyCode?: string
  topics: Localized<string[]>
}

const SENAI_SJBV = 'Centro de Treinamento SENAI – São João da Boa Vista'
const EAD = L('EAD', 'Online')

export const certificates: Certificate[] = [
  {
    slug: 'competencia-transversal-logica-de-programacao',
    title: L('Competência Transversal – Lógica de Programação', 'Cross-Disciplinary Skills – Programming Logic'),
    area: 'tecnologia',
    hours: 14,
    start: '2025-02-27',
    end: '2025-03-13',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00035937/7992865',
    topics: L(
      ['Representações de um algoritmo', 'Tipos de dados e variáveis indexadas', 'Expressões aritméticas, literais e lógicas', 'Estruturas de condição e de repetição'],
      ['Ways to represent an algorithm', 'Data types and indexed variables', 'Arithmetic, string and logical expressions', 'Conditional and loop structures'],
    ),
  },
  {
    slug: 'etica-na-inteligencia-artificial',
    title: L('Ética na Inteligência Artificial', 'Ethics in Artificial Intelligence'),
    area: 'tecnologia',
    hours: 4,
    start: '2025-03-17',
    end: '2025-05-06',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045616/7992865',
    topics: L(
      ['Definição de Inteligência Artificial', 'Pilares da IA responsável', 'Marco legal para IA', 'Desafios e oportunidades da IA'],
      ['Definition of Artificial Intelligence', 'Pillars of responsible AI', 'Legal framework for AI', 'Challenges and opportunities of AI'],
    ),
  },
  {
    slug: 'fluencia-fundamentos-da-inteligencia-artificial',
    title: L('Fluência – Fundamentos da Inteligência Artificial', 'Fluency – Fundamentals of Artificial Intelligence'),
    area: 'tecnologia',
    hours: 8,
    start: '2025-03-17',
    end: '2025-05-07',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045740/7992865',
    topics: L(
      ['IA tradicional e IA generativa', 'Impacto da IA nos mecanismos de pesquisa', 'Bing Chat e Copilot do Microsoft 365 no trabalho', 'Questões éticas e uso responsável'],
      ['Traditional AI and generative AI', 'The impact of AI on search engines', 'Bing Chat and Microsoft 365 Copilot at work', 'Ethical issues and responsible use'],
    ),
  },
  {
    slug: 'regulamentacao-da-lgpd-e-atuacao-da-anpd',
    title: L('Regulamentação da LGPD e Atuação da ANPD', 'LGPD Regulation and the Role of the ANPD'),
    area: 'tecnologia',
    hours: 4,
    start: '2025-05-27',
    end: '2025-05-29',
    institution: 'SENAI-SP',
    unit: 'Escola SENAI de Educação Online',
    modality: EAD,
    verifyCode: '00042680/7992865',
    topics: L(
      ['Principais funções da ANPD', 'Regulamentação da LGPD', 'Procedimentos e sanções administrativas'],
      ['Main functions of the ANPD (Brazil’s data protection authority)', 'LGPD regulation (Brazil’s data protection law)', 'Administrative procedures and sanctions'],
    ),
  },
  {
    slug: 'por-dentro-da-seguranca-cibernetica',
    title: L('Por Dentro da Segurança Cibernética', 'Inside Cybersecurity'),
    area: 'tecnologia',
    hours: 4,
    start: '2025-03-17',
    end: '2025-06-06',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045613/7992865',
    topics: L(
      ['Tipos de ameaças cibernéticas', 'Técnicas de coleta de informação', 'Técnicas de prevenção'],
      ['Types of cyber threats', 'Information-gathering techniques', 'Prevention techniques'],
    ),
  },
  {
    slug: 'competencia-transversal-seguranca-no-trabalho',
    title: L('Competência Transversal – Segurança no Trabalho', 'Cross-Disciplinary Skills – Workplace Safety'),
    area: 'seguranca',
    hours: 14,
    start: '2025-03-17',
    end: '2025-06-09',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045611/7992865',
    topics: L(
      ['Conceitos e principais acidentes de trabalho', 'EPI e EPC', 'Causas mais comuns dos acidentes', 'CIPA e mapa de risco'],
      ['Concepts and main workplace accidents', 'Personal and collective protective equipment', 'Most common causes of accidents', 'Accident prevention committee and risk map'],
    ),
  },
  {
    slug: 'excel-basico',
    title: L('Excel Básico', 'Basic Excel'),
    area: 'tecnologia',
    hours: 20,
    start: '2025-03-17',
    end: '2025-06-10',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045610/7992865',
    topics: L(
      ['Edição e formatação de dados', 'Fórmulas e funções básicas', 'Formatação condicional', 'Criação de gráficos'],
      ['Editing and formatting data', 'Basic formulas and functions', 'Conditional formatting', 'Creating charts'],
    ),
  },
  {
    slug: 'desvendando-a-descarbonizacao',
    title: L('Desvendando a Descarbonização', 'Understanding Decarbonization'),
    area: 'sustentabilidade',
    hours: 20,
    start: '2025-03-17',
    end: '2025-06-10',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00045614/7992865',
    topics: L(
      ['Economia de baixo carbono', 'Aspectos e impactos ambientais', 'Mitigação e adaptação às mudanças climáticas', 'Instrumentos de precificação de carbono'],
      ['Low-carbon economy', 'Environmental aspects and impacts', 'Climate change mitigation and adaptation', 'Carbon pricing instruments'],
    ),
  },
  {
    slug: 'desvendando-a-industria-4-0',
    title: L('Desvendando a Indústria 4.0', 'Understanding Industry 4.0'),
    area: 'tecnologia',
    hours: 20,
    start: '2026-02-23',
    end: '2026-03-28',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00029/7992865',
    topics: L(
      ['Tecnologias habilitadoras: IoT, Big Data, nuvem e IA', 'Robótica avançada', 'Manufatura digital e integração de sistemas', 'Boas práticas de segurança digital'],
      ['Enabling technologies: IoT, Big Data, cloud and AI', 'Advanced robotics', 'Digital manufacturing and systems integration', 'Digital security best practices'],
    ),
  },
  {
    slug: 'empreender-senai',
    title: L('Empreender SENAI', 'SENAI Entrepreneurship'),
    area: 'gestao',
    hours: 20,
    start: '2026-02-23',
    end: '2026-04-25',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00053/7992865',
    topics: L(
      ['Estruturação de um negócio próprio', 'Viabilidade e público-alvo', 'Análise de mercado', 'Aspectos legais'],
      ['Structuring your own business', 'Feasibility and target audience', 'Market analysis', 'Legal aspects'],
    ),
  },
  {
    slug: 'cidadania-digital-e-uso-consciente-da-internet',
    title: L('Cidadania Digital e Uso Consciente da Internet', 'Digital Citizenship and Responsible Internet Use'),
    area: 'tecnologia',
    hours: 4,
    start: '2026-02-23',
    end: '2026-04-27',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00069/7992865',
    topics: L(
      ['Legislação sobre internet e proteção de dados', 'Impactos da IA na produção de conteúdo', 'Segurança de dados e privacidade online', 'Uso excessivo de tecnologia e saúde mental'],
      ['Internet and data protection legislation', 'The impact of AI on content production', 'Data security and online privacy', 'Excessive technology use and mental health'],
    ),
  },
  {
    slug: 'geracao-de-valor-circular-e-modelos-de-negocios',
    title: L('Geração de Valor Circular e Modelos de Negócios', 'Circular Value Creation and Business Models'),
    area: 'sustentabilidade',
    hours: 4,
    start: '2026-02-23',
    end: '2026-04-28',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00067/7992865',
    topics: L(
      ['Características da economia circular', 'Princípios de criação de valor circular', 'Modelos de negócio da economia circular', 'Vantagens e desafios desses modelos'],
      ['Characteristics of the circular economy', 'Principles of circular value creation', 'Circular economy business models', 'Advantages and challenges of these models'],
    ),
  },
  {
    slug: 'design-thinking',
    title: L('Design Thinking', 'Design Thinking'),
    area: 'gestao',
    hours: 8,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00060/7992865',
    topics: L(
      ['Novas formas de pensar a criação de produtos e serviços'],
      ['New ways of thinking about creating products and services'],
    ),
  },
  {
    slug: 'fundamentos-da-gestao-de-projetos-aplicados-na-industria',
    title: L('Fundamentos da Gestão de Projetos Aplicados na Indústria', 'Fundamentals of Project Management Applied to Industry'),
    area: 'gestao',
    hours: 12,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00059/7992865',
    topics: L(
      ['Fundamentos da gestão de projetos', 'Metodologias tradicionais e ágeis', 'Ferramentas do Scrum'],
      ['Fundamentals of project management', 'Traditional and agile methodologies', 'Scrum tools'],
    ),
  },
  {
    slug: 'gestao-do-tempo',
    title: L('Gestão do Tempo', 'Time Management'),
    area: 'gestao',
    hours: 8,
    start: '2026-02-23',
    end: '2026-04-29',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00061/7992865',
    topics: L(
      ['Formas eficientes de usar o tempo', 'Ferramentas de organização', 'Aspectos do trabalho remoto'],
      ['Efficient ways to use time', 'Organization tools', 'Aspects of remote work'],
    ),
  },
  {
    slug: 'desvendando-o-esg',
    title: L('Desvendando o ESG', 'Understanding ESG'),
    area: 'sustentabilidade',
    hours: 20,
    start: '2026-02-23',
    end: '2026-05-03',
    institution: 'SENAI-SP',
    unit: SENAI_SJBV,
    modality: EAD,
    verifyCode: '00058/7992865',
    topics: L(
      ['Governança ambiental, social e corporativa', 'Riscos e estratégias de mitigação', 'Responsabilidade social nas empresas', 'Inovação e tecnologia na agenda ESG'],
      ['Environmental, social and corporate governance', 'Risks and mitigation strategies', 'Social responsibility in companies', 'Innovation and technology on the ESG agenda'],
    ),
  },
]

export const certificateAreas: CertificateArea[] = ['tecnologia', 'gestao', 'sustentabilidade', 'seguranca']

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
