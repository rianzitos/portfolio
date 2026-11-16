import type { IconKey } from '../components/ui/BrandIcon'

export type SkillStatus = 'uso' | 'aprendendo'

export interface Skill {
  name: string
  icon: IconKey
  status: SkillStatus
  /** Onde a tecnologia já foi usada de verdade. Nada de porcentagens inventadas. */
  usedIn: string[]
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'front-end',
    title: 'Front-end',
    description: 'Interfaces, layout responsivo e interação no navegador.',
    skills: [
      { name: 'HTML5', icon: 'html5', status: 'uso', usedIn: ['SICAPDA', 'CityDash', 'NewsToday'] },
      { name: 'CSS3', icon: 'css', status: 'uso', usedIn: ['SICAPDA', 'CityDash', 'NewsToday'] },
      { name: 'JavaScript', icon: 'javascript', status: 'uso', usedIn: ['SICAPDA', 'CityDash'] },
      { name: 'TypeScript', icon: 'typescript', status: 'aprendendo', usedIn: ['Estudos'] },
      { name: 'Angular', icon: 'angular', status: 'aprendendo', usedIn: ['Estudos'] },
    ],
  },
  {
    id: 'back-end',
    title: 'Back-end e dados',
    description: 'Regras de negócio, APIs e persistência.',
    skills: [
      { name: 'PHP', icon: 'php', status: 'uso', usedIn: ['SICAPDA (MVC próprio)', 'CRUDs em MVC'] },
      { name: 'MySQL', icon: 'mysql', status: 'uso', usedIn: ['SICAPDA', 'CRUDs em MVC'] },
      { name: 'Python', icon: 'python', status: 'uso', usedIn: ['Atividades do curso'] },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    description: 'Aplicativos para Android, Windows e navegador.',
    skills: [
      { name: 'Flutter', icon: 'flutter', status: 'uso', usedIn: ['App do SICAPDA'] },
      { name: 'Dart', icon: 'dart', status: 'uso', usedIn: ['App do SICAPDA'] },
    ],
  },
  {
    id: 'ferramentas',
    title: 'Ferramentas',
    description: 'O que uso no dia a dia para escrever, versionar e compilar.',
    skills: [
      { name: 'Git', icon: 'git', status: 'uso', usedIn: ['Todos os projetos'] },
      { name: 'GitHub', icon: 'github', status: 'uso', usedIn: ['Repositórios e pull requests'] },
      { name: 'Visual Studio Code', icon: 'vscode', status: 'uso', usedIn: ['Editor principal'] },
      { name: 'Android Studio', icon: 'androidstudio', status: 'uso', usedIn: ['Build do app Android'] },
    ],
  },
]
