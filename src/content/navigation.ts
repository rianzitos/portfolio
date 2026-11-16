/** Seções da página inicial, na ordem em que aparecem. O índice do topo e o menu usam esta lista. */
export const sections = [
  { id: 'sobre', label: 'Sobre', note: 'Quem sou' },
  { id: 'sicapda', label: 'SICAPDA', note: 'Projeto principal' },
  { id: 'projetos', label: 'Projetos', note: 'Outros trabalhos' },
  { id: 'stack', label: 'Stack', note: 'Tecnologias' },
  { id: 'cursos', label: 'Cursos', note: 'Certificados' },
  { id: 'formacao', label: 'Formação', note: 'Escola e técnico' },
  { id: 'contato', label: 'Contato', note: 'Fale comigo' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionNumber = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')
