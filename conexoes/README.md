# CONEXÕES: Desenvolvendo Soft Skills na Enfermagem

Serious game web do projeto de pesquisa "Desenvolvimento de serious game para aprendizagem de soft skills em alunos da enfermagem".
Funciona no navegador, sem instalação, em computador, tablet e celular.

## O que o jogo contém

- 4 módulos (eixos) e 18 missões, uma para cada habilidade da estrutura pedagógica.
- Cada missão tem 2 etapas de decisão, com 4 condutas por etapa (144 alternativas no total). Cada alternativa tem consequência na cena e feedback explicando por que a conduta é mais ou menos adequada.
- Cada missão traz: habilidade, objetivo de aprendizagem, contexto, situação-problema, comportamentos observáveis, desafios, alternativas, consequências, feedback, justificativa pedagógica e uma pergunta para refletir.
- Mecânicas: XP, 6 níveis, medalhas por missão (ouro, prata, bronze), 10 conquistas, desbloqueio sequencial de missões e módulos, medidor de consequência por missão, comparação entre condutas, histórico de tentativas e repetição de missões.
- A ordem das alternativas é sorteada a cada tentativa, para que a posição não vire pista.
- Área do pesquisador (código de acesso em `src/lib/config.ts`): desempenho por eixo e por missão, distribuição das condutas na 1ª tentativa, lista de participantes, exportação em CSV e importação de resultados.

## Separação entre jogo e instrumento de pesquisa

- O jogo usa uma escala própria (XP e aproveitamento em %). Ela não equivale ao escore do instrumento pré e pós-teste (18 questões, 0 a 54 pontos) e não deve ser comparada a ele.
- As questões e o gabarito do instrumento não estão no jogo. As missões foram escritas do zero; vale conferir se nenhuma situação ficou parecida demais com um item do instrumento, para não contaminar o pós-teste.
- A classificação das condutas nas missões é uma proposta pedagógica e precisa passar por validação de conteúdo com especialistas.

## Onde ficam os dados

O progresso fica no armazenamento local do navegador (localStorage). Não há servidor.
- Em computadores de laboratório, a área do pesquisador mostra todos os participantes que jogaram naquele navegador.
- Em aplicação remota, cada participante gera, na aba Progresso, um código de envio (começa com `CNX1.`) e o envia à equipe. O pesquisador cola o código em "Importar resultados".
- O CSV exportado tem uma linha por decisão: participante, missão, habilidade, eixo, etapa, conduta escolhida, XP e datas.

## Estrutura do código

```
src/
  types.ts                 tipos (missão, etapa, alternativa, jogador)
  data/
    personagens.ts         personagens fictícios e eixos
    missoes/eixo1..4.ts    conteúdo das 18 missões
    index.ts               pontuação do jogo, níveis, medalhas e conquistas
  components/              Avatar (personagens em SVG), Cena (cenários), elementos de interface
  screens/                 Início, Identificação, Jornada, Módulo, Ficha, Missão, Resultado, Progresso, Pesquisador
  state/jogo.tsx           estado do jogo e gravação local
  lib/                     progresso, código de envio, CSV, configurações
tests/
  validar-conteudo.ts      confere 18 habilidades, 4 condutas por etapa, campos obrigatórios e ausência de travessão
  e2e.py                   joga as 18 missões no navegador (celular), confere progresso salvo e área do pesquisador
```

## Como rodar e editar

Requisitos: Node.js 18 ou mais recente.

```
npm install
npm run build      # gera dist/conexoes.html (arquivo único)
npm test           # checagem de tipos + validação do conteúdo
```

Para publicar, basta hospedar `dist/conexoes.html` em qualquer servidor de páginas estáticas (GitHub Pages, Netlify, servidor da universidade).
A página carrega React e as fontes da internet.

Para criar uma nova missão, copie uma missão existente em `src/data/missoes/`, ajuste os textos e rode `npm run validar`.
Use `{nome}` nos textos para inserir o apelido do jogador.

Antes de usar com participantes, troque o código de acesso da área do pesquisador em `src/lib/config.ts` e gere o build novamente.

## Publicar no GitHub e jogar pelo GitHub Pages

O build também gera `docs/index.html`, a versão completa da página para hospedagem própria.

1. Crie um repositório no GitHub (pode ser público ou privado; o Pages gratuito exige repositório público).
2. Envie os arquivos desta pasta (pelo site, em "Add file > Upload files", ou pelo terminal com `git push`).
3. No repositório, abra Settings > Pages, escolha "Deploy from a branch", branch `main` e pasta `/docs`, e salve.
4. Em alguns minutos o jogo fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Sempre que alterar o jogo, rode `npm run build` e envie de novo a pasta `docs/`.
