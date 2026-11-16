import type { IconKey } from '../components/ui/BrandIcon'
import { L, type Localized, type Text } from '../i18n'

export type SkillStatus = 'uso' | 'aprendendo'

export interface Skill {
  name: string
  icon: IconKey
  status: SkillStatus
  /** Onde a tecnologia já foi usada de verdade. Nada de porcentagens inventadas. */
  usedIn: Text[]
}

export interface SkillGroup {
  id: string
  title: Text
  description: Localized
  skills: Skill[]
}

const studies = L('Estudos', 'Studies')

export const skillGroups: SkillGroup[] = [
  {
    id: 'front-end',
    title: 'Front-end',
    description: L('Interfaces, layout responsivo e interação no navegador.', 'Interfaces, responsive layout and in-browser interaction.'),
    skills: [
      { name: 'HTML5', icon: 'html5', status: 'uso', usedIn: ['SICAPDA', 'CityDash', 'NewsToday'] },
      { name: 'CSS3', icon: 'css', status: 'uso', usedIn: ['SICAPDA', 'CityDash', 'NewsToday'] },
      { name: 'JavaScript', icon: 'javascript', status: 'uso', usedIn: ['SICAPDA', 'CityDash'] },
      { name: 'TypeScript', icon: 'typescript', status: 'aprendendo', usedIn: [studies] },
      { name: 'Angular', icon: 'angular', status: 'aprendendo', usedIn: [studies] },
    ],
  },
  {
    id: 'back-end',
    title: L('Back-end e dados', 'Back-end and data'),
    description: L('Regras de negócio, APIs e persistência.', 'Business rules, APIs and persistence.'),
    skills: [
      {
        name: 'PHP',
        icon: 'php',
        status: 'uso',
        usedIn: [L('SICAPDA (MVC próprio)', 'SICAPDA (custom MVC)'), L('CRUDs em MVC', 'MVC CRUD apps')],
      },
      { name: 'MySQL', icon: 'mysql', status: 'uso', usedIn: ['SICAPDA', L('CRUDs em MVC', 'MVC CRUD apps')] },
      { name: 'Python', icon: 'python', status: 'uso', usedIn: [L('Atividades do curso', 'Coursework')] },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    description: L('Aplicativos para Android, Windows e navegador.', 'Apps for Android, Windows and the browser.'),
    skills: [
      { name: 'Flutter', icon: 'flutter', status: 'uso', usedIn: [L('App do SICAPDA', 'SICAPDA app')] },
      { name: 'Dart', icon: 'dart', status: 'uso', usedIn: [L('App do SICAPDA', 'SICAPDA app')] },
    ],
  },
  {
    id: 'ferramentas',
    title: L('Ferramentas', 'Tools'),
    description: L('O que uso no dia a dia para escrever, versionar e compilar.', 'What I use every day to write, version and build.'),
    skills: [
      { name: 'Git', icon: 'git', status: 'uso', usedIn: [L('Todos os projetos', 'Every project')] },
      { name: 'GitHub', icon: 'github', status: 'uso', usedIn: [L('Repositórios e pull requests', 'Repositories and pull requests')] },
      { name: 'Visual Studio Code', icon: 'vscode', status: 'uso', usedIn: [L('Editor principal', 'Main editor')] },
      { name: 'Android Studio', icon: 'androidstudio', status: 'uso', usedIn: [L('Build do app Android', 'Android app builds')] },
    ],
  },
]
