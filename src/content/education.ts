import { L, type Localized, type Text } from '../i18n'

/** Formação acadêmica. Sem datas inventadas: preencha `period` só quando tiver certeza. */
export interface EducationItem {
  title: Localized
  institution: string
  status: 'andamento' | 'concluido'
  period?: Text
  description: Localized
  link?: { href: string; label: Localized }
}

export const education: EducationItem[] = [
  {
    title: L('Técnico em Desenvolvimento de Sistemas', 'Technical course in Systems Development'),
    institution: 'SENAI',
    status: 'andamento',
    description: L(
      'Desenvolvimento web, banco de dados, integração de sistemas, interfaces e aplicativos mobile. O projeto integrador (TCC) é o SICAPDA.',
      'Web development, databases, systems integration, interfaces and mobile apps. The capstone project is SICAPDA.',
    ),
    link: { href: '#sicapda', label: L('Ver o projeto integrador', 'See the capstone project') },
  },
  {
    title: L('Ensino Médio', 'High school'),
    institution: 'SESI',
    status: 'andamento',
    description: L('Cursado em paralelo ao técnico do SENAI.', 'Taken alongside the SENAI technical course.'),
  },
]
