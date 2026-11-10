// Validação estrutural do conteúdo pedagógico.
// Executar com: npm run validar
import { EIXOS, MISSOES, PERSONAGENS } from '../src/data';

const HABILIDADES = [
  'Comunicação', 'Escuta ativa', 'Empatia', 'Acolhimento',
  'Liderança', 'Trabalho em equipe', 'Colaboração', 'Negociação', 'Manejo de conflitos',
  'Pensamento crítico', 'Reflexão', 'Resolução de problemas', 'Tomada de decisão',
  'Autonomia', 'Iniciativa', 'Adaptabilidade', 'Autorregulação emocional', 'Aprendizagem contínua',
];
const EIXO_DA_HAB = [1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];

const erros: string[] = [];
const textos: string[] = [];

if (EIXOS.length !== 4) erros.push(`Esperados 4 eixos, encontrados ${EIXOS.length}`);
if (MISSOES.length !== 18) erros.push(`Esperadas 18 missões, encontradas ${MISSOES.length}`);

HABILIDADES.forEach((h, i) => {
  const ms = MISSOES.filter((m) => m.habilidade === h);
  if (ms.length < 1) erros.push(`Habilidade sem missão: ${h}`);
  ms.forEach((m) => {
    if (m.numero !== i + 1) erros.push(`${m.id}: número ${m.numero} deveria ser ${i + 1}`);
    if (m.eixo !== `e${EIXO_DA_HAB[i]}`) erros.push(`${m.id}: eixo ${m.eixo} deveria ser e${EIXO_DA_HAB[i]}`);
  });
});

const ids = new Set<string>();
for (const m of MISSOES) {
  if (ids.has(m.id)) erros.push(`ID repetido: ${m.id}`);
  ids.add(m.id);
  for (const campo of ['habilidade', 'titulo', 'objetivo', 'contexto', 'situacaoProblema', 'local', 'medidor', 'justificativa', 'paraRefletir'] as const) {
    if (!m[campo] || String(m[campo]).trim().length < 3) erros.push(`${m.id}: campo vazio ${campo}`);
    textos.push(`${m.id}.${campo}: ${m[campo]}`);
  }
  m.comportamentos.forEach((c) => textos.push(`${m.id}.comportamento: ${c}`));
  if (m.comportamentos.length < 2) erros.push(`${m.id}: poucos comportamentos observáveis`);
  m.personagens.forEach((pid) => { if (!PERSONAGENS[pid]) erros.push(`${m.id}: personagem inexistente ${pid}`); });
  if (m.etapas.length < 1) erros.push(`${m.id}: sem etapas`);
  for (const e of m.etapas) {
    if (ids.has(e.id)) erros.push(`ID repetido: ${e.id}`);
    ids.add(e.id);
    textos.push(`${e.id}.desafio: ${e.desafio}`);
    const falas = [...e.situacao, ...e.opcoes.flatMap((o) => o.consequencia)];
    falas.forEach((f) => {
      textos.push(`${e.id}.fala: ${f.texto}`);
      if (f.quem !== 'narrador' && f.quem !== 'jogador' && !PERSONAGENS[f.quem]) erros.push(`${e.id}: fala de personagem inexistente ${f.quem}`);
      if (f.quem !== 'narrador' && f.quem !== 'jogador' && !m.personagens.includes(f.quem)) erros.push(`${e.id}: ${f.quem} fala mas não está no elenco da missão`);
    });
    if (e.opcoes.length !== 4) erros.push(`${e.id}: esperadas 4 alternativas`);
    const niveis = e.opcoes.map((o) => o.nivel).sort().join(',');
    if (niveis !== 'adequada,inadequada,parcial,pouco') erros.push(`${e.id}: cada nível deve aparecer uma vez (${niveis})`);
    e.opcoes.forEach((o) => {
      textos.push(`${e.id}.${o.id}.texto: ${o.texto}`);
      textos.push(`${e.id}.${o.id}.feedback: ${o.feedback}`);
      if (o.consequencia.length < 1) erros.push(`${e.id}.${o.id}: sem consequência`);
      if (o.feedback.length < 60) erros.push(`${e.id}.${o.id}: feedback curto demais`);
    });
    // Evita que a conduta mais adequada seja sempre a mais longa (pista óbvia).
  }
}

// Sem travessão (—) nem meia-risca (–) em nenhum texto exibido.
textos.forEach((t) => { if (/[—–]/.test(t)) erros.push(`Travessão encontrado: ${t.slice(0, 90)}`); });

// Pista de comprimento: em quantas etapas a alternativa mais adequada é a mais longa?
let maisLonga = 0;
let total = 0;
for (const m of MISSOES) for (const e of m.etapas) {
  total++;
  const max = Math.max(...e.opcoes.map((o) => o.texto.length));
  if (e.opcoes.find((o) => o.nivel === 'adequada')!.texto.length === max) maisLonga++;
}

if (erros.length) {
  console.error(`✗ ${erros.length} problema(s):\n` + erros.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ 4 eixos, ${MISSOES.length} missões, ${total} decisões, ${total * 4} alternativas, ${textos.length} textos verificados, sem travessão.`);
console.log(`  Alternativa mais adequada é a mais longa em ${maisLonga} de ${total} decisões.`);
