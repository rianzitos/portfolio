/** Formação acadêmica. Sem datas inventadas: preencha `period` só quando tiver certeza. */
export interface EducationItem {
  title: string
  institution: string
  status: 'Em andamento' | 'Concluído'
  period?: string
  description: string
  href?: string
}

export const education: EducationItem[] = [
  {
    title: 'Técnico em Desenvolvimento de Sistemas',
    institution: 'SENAI',
    status: 'Em andamento',
    description:
      'Desenvolvimento web, banco de dados, integração de sistemas, interfaces e aplicativos mobile. O projeto integrador (TCC) é o SICAPDA.',
    href: '#sicapda',
  },
  {
    title: 'Ensino Médio',
    institution: 'SESI',
    status: 'Em andamento',
    description: 'Cursado em paralelo ao técnico do SENAI.',
  },
]
