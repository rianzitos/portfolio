import { L, type Text } from '../i18n'

/** Seções da página inicial, na ordem em que aparecem. O índice do topo e o menu usam esta lista. */
export const sections = [
  { id: 'sobre', label: L('Sobre', 'About'), note: L('Quem sou', 'Who I am') },
  { id: 'sicapda', label: 'SICAPDA', note: L('Projeto principal', 'Main project') },
  { id: 'projetos', label: L('Projetos', 'Projects'), note: L('Outros trabalhos', 'Other work') },
  { id: 'stack', label: 'Stack', note: L('Tecnologias', 'Technologies') },
  { id: 'cursos', label: L('Cursos', 'Courses'), note: L('Certificados', 'Certificates') },
  { id: 'formacao', label: L('Formação', 'Education'), note: L('Escola e técnico', 'School and technical course') },
  { id: 'contato', label: L('Contato', 'Contact'), note: L('Fale comigo', 'Get in touch') },
] as const satisfies ReadonlyArray<{ id: string; label: Text; note: Text }>

export type SectionId = (typeof sections)[number]['id']

export const sectionNumber = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')
