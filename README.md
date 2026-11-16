# Portfólio — Rian Rafael

Portfólio pessoal de Rian Rafael, estudante do técnico em Desenvolvimento de Sistemas no SENAI (Mococa, SP).

- **Página inicial** (`/`): apresentação, sobre, SICAPDA em destaque, outros projetos, stack, cursos e certificados, formação e contato.
- **Estudo de caso** (`/sicapda/`): o SICAPDA em detalhes, com vídeo, diagrama de funcionamento, funcionalidades, telas do sistema web, telas do app e equipe.

O site tem versão em **português e inglês** e **tema claro e escuro**, com os dois botões no cabeçalho.

Feito com React 19, TypeScript, Vite, Tailwind CSS 4, Motion e Lucide. Fontes: Archivo (variável, com eixo de largura) e IBM Plex Mono, servidas junto com o site.

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
```

```bash
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173). A página do estudo de caso fica em http://localhost:5173/sicapda/.

Outros comandos:

```bash
npm run build      # verifica o TypeScript e gera o site final em dist/
npm run preview    # serve a pasta dist/ para conferir o build
npm run typecheck  # só a verificação de tipos
```

## Onde editar cada coisa

Todo o texto do site está em `src/content/`. Não é preciso mexer nos componentes para atualizar conteúdo.

| O que | Arquivo |
|---|---|
| Nome, cargo, bio, "Sobre", disponibilidade, foto, **e-mail**, GitHub e LinkedIn | `src/content/profile.ts` |
| Ordem e nomes das seções do menu | `src/content/navigation.ts` |
| Tecnologias da seção Stack (com "onde já usei") | `src/content/skills.ts` |
| Outros projetos (CityDash, NewsToday e novos) | `src/content/projects.ts` |
| SICAPDA: textos, telas, vídeo, equipe, links | `src/content/sicapda.ts` |
| Cursos e certificados | `src/content/certificates.ts` |
| Formação acadêmica | `src/content/education.ts` |
| Textos de interface (botões, títulos de seção, rótulos) | `src/content/ui.ts` |

### Português e inglês

Todo texto traduzido é escrito com `L('português', 'english')`, as duas versões lado a lado:

```ts
role: L('Desenvolvedor de software em formação', 'Software developer in training'),
```

Ao mudar um texto, atualize as duas versões. Nomes próprios e termos iguais nos dois idiomas (como `'SICAPDA'` ou `'JavaScript'`) podem ficar como texto simples.

Como o idioma inicial é escolhido:

1. `?lang=en` ou `?lang=pt` no endereço. Use `https://rianzitos.github.io/portfolio/?lang=en` para mandar o link já em inglês.
2. A última escolha da pessoa naquele navegador.
3. O idioma do navegador: português se "pt" estiver entre os idiomas configurados, inglês nos outros casos.

### Tema claro e escuro

O site abre no tema claro e guarda a escolha de quem trocar. As cores dos dois temas ficam no topo de `src/styles/index.css`: o bloco `@theme` tem o tema claro e o bloco `:root[data-mode="dark"]` tem o escuro.

### E-mail de contato

O e-mail fica no campo `email` de `src/content/profile.ts` e aparece na seção Contato (com botão de copiar) e no rodapé. Para tirar o e-mail do site, deixe o campo vazio (`''`): o contato continua pelo LinkedIn e pelo GitHub.

### Adicionar um projeto

Em `src/content/projects.ts`, copie um objeto da lista `projects` e preencha `title`, `summary`, `description`, `highlights`, `tech` e `links`.

- **Imagens**: coloque o arquivo em `src/assets/projetos/`, importe no topo do arquivo e adicione em `images: [{ src: minhaImagem, alt: 'Descrição da imagem' }]`. Sem imagem, o site monta uma capa com a cor de `cover.background`.
- **Demonstração**: só preencha `links.demo` se existir um endereço publicado. Sem ele, o botão não aparece.

### Adicionar um certificado

1. Coloque os arquivos em `src/assets/certificados/`, todos com o mesmo nome (o `slug`):
   - `meu-curso.pdf` — o certificado
   - `meu-curso.webp` — imagem da primeira página (aparece no visualizador)
   - `meu-curso-thumb.webp` — miniatura (aparece ao passar o mouse na lista)
2. Adicione um objeto em `certificates` (`src/content/certificates.ts`) com `slug: 'meu-curso'`, título, área, carga horária, datas e o código de autenticação.

Os totais (número de cursos, horas, horas por área) são calculados sozinhos. Se tiver só o PDF, tudo bem: o visualizador mostra o botão "Abrir PDF" sem a imagem.

> **Privacidade:** os PDFs originais do SENAI trazem o número do RG. As versões em `src/assets/certificados/` foram geradas com o número coberto por uma tarja (e por isso o texto do PDF não é selecionável). Faça o mesmo com certificados novos antes de publicar.

### Trocar a foto

Substitua `src/assets/rian.webp` (proporção 3:4, por exemplo 720 × 960 px). O texto alternativo e a legenda ficam em `profile.photo`.

### Telas e vídeo do SICAPDA

- Telas do sistema web: `src/assets/sicapda/web/` (2400 × 1500 px, WebP).
- Telas do aplicativo: `src/assets/sicapda/app/`.
- Vídeo do tour: `src/assets/sicapda/video/` (o mesmo vídeo de 30 s do repositório SystemFluxe).

As capturas do sistema web foram feitas rodando o código do repositório SystemFluxe localmente, com o script de dados de demonstração do próprio projeto (`config/dados_exemplo.sql`). Os nomes, a empresa e os números são fictícios, e o site avisa isso abaixo das galerias.

## Publicar

O site gera arquivos estáticos (pasta `dist/`) com caminhos relativos, então funciona tanto na raiz de um domínio quanto em uma subpasta.

**GitHub Pages (já configurado):** o workflow `.github/workflows/deploy.yml` publica a cada push na branch `main`. Na primeira vez, ative em *Settings → Pages → Build and deployment → Source: GitHub Actions*. O endereço será `https://rianzitos.github.io/portfolio/`.

**Vercel ou Netlify:** importe o repositório; comando de build `npm run build`, pasta de saída `dist`.

Se publicar em outro endereço, atualize a URL das imagens de prévia (`og:image`) em `index.html` e `sicapda/index.html`.

## Estrutura

```
index.html                 página inicial (metadados e SEO)
sicapda/index.html         estudo de caso do SICAPDA
public/                    imagens de prévia para redes sociais (og.jpg, og-sicapda.jpg)
src/
  content/                 todo o conteúdo editável
  assets/                  foto, capturas, vídeo, certificados, logos
  components/layout/       cabeçalho (com menu mobile) e rodapé
  components/ui/           botões, ícones de marcas, molduras, diálogos, animações
  sections/                seções da página inicial
  sicapda/                 vídeo com capítulos, galeria de telas, diagrama, telas do app
  pages/                   montagem das duas páginas
  i18n/                    idioma: função L(), detecção e troca de idioma
  lib/                     hooks e utilitários (tema, hora local, seção ativa, datas)
  styles/index.css         tokens de cor, tipografia e estilos base
```

## Acessibilidade e desempenho

- Navegação completa por teclado, link "Pular para o conteúdo", foco visível, diálogos nativos (`<dialog>`) e menu mobile com foco preso.
- Contraste de texto AA em todas as combinações de cor usadas, nos dois temas.
- Com "reduzir movimento" ativado no sistema, as animações de deslocamento são desligadas e o vídeo não toca sozinho.
- O vídeo só é baixado quando começa a tocar; imagens abaixo da dobra carregam sob demanda.
