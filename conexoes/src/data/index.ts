import type { EixoId, Missao, Nivel } from '../types';
import { EIXO1 } from './missoes/eixo1';
import { EIXO2 } from './missoes/eixo2';
import { EIXO3 } from './missoes/eixo3';
import { EIXO4 } from './missoes/eixo4';

export { EIXOS, PERSONAGENS, PELES, CORES_CABELO, CORES_SCRUB } from './personagens';

export const MISSOES: Missao[] = [...EIXO1, ...EIXO2, ...EIXO3, ...EIXO4];

export const missoesDoEixo = (eixo: EixoId) => MISSOES.filter((m) => m.eixo === eixo);
export const missaoPorId = (id: string) => MISSOES.find((m) => m.id === id);

/* ---------- Pontuação interna do jogo ----------
 * Escala própria do jogo (XP e aproveitamento em %). Ela NÃO é equivalente ao
 * escore do instrumento pré e pós-teste da pesquisa e não deve ser comparada a ele.
 */
export const XP_POR_NIVEL: Record<Nivel, number> = { adequada: 100, parcial: 60, pouco: 25, inadequada: 0 };
export const MEDIDOR_DELTA: Record<Nivel, number> = { adequada: 25, parcial: 8, pouco: -10, inadequada: -25 };
export const MEDIDOR_INICIAL = 50;

export const ROTULO_NIVEL: Record<Nivel, string> = {
  adequada: 'Conduta mais adequada',
  parcial: 'Conduta parcialmente adequada',
  pouco: 'Conduta pouco adequada',
  inadequada: 'Conduta inadequada',
};

export const XP_MAX_MISSAO = (m: Missao) => m.etapas.length * XP_POR_NIVEL.adequada;
export const XP_MAX_TOTAL = MISSOES.reduce((s, m) => s + XP_MAX_MISSAO(m), 0);

export type Medalha = 'ouro' | 'prata' | 'bronze' | 'participacao';
export const medalhaPorAproveitamento = (pct: number): Medalha =>
  pct >= 90 ? 'ouro' : pct >= 60 ? 'prata' : pct >= 30 ? 'bronze' : 'participacao';
export const ROTULO_MEDALHA: Record<Medalha, string> = {
  ouro: 'Medalha de ouro',
  prata: 'Medalha de prata',
  bronze: 'Medalha de bronze',
  participacao: 'Missão concluída',
};

/* ---------- Níveis do jogador ---------- */
export const NIVEIS = [
  { min: 0, titulo: 'Primeiro período' },
  { min: 300, titulo: 'Em campo' },
  { min: 800, titulo: 'Estágio supervisionado' },
  { min: 1500, titulo: 'Referência na turma' },
  { min: 2300, titulo: 'Referência na equipe' },
  { min: 3000, titulo: 'Pronto para o cuidado' },
];

export function nivelDoJogador(xp: number) {
  let i = 0;
  NIVEIS.forEach((n, idx) => {
    if (xp >= n.min) i = idx;
  });
  const atual = NIVEIS[i];
  const prox = NIVEIS[i + 1];
  const progresso = prox ? (xp - atual.min) / (prox.min - atual.min) : 1;
  return { numero: i + 1, titulo: atual.titulo, proximo: prox, progresso: Math.max(0, Math.min(1, progresso)) };
}

/* ---------- Conquistas ---------- */
export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: 'passo' | 'eixo1' | 'eixo2' | 'eixo3' | 'eixo4' | 'completa' | 'ouro' | 'repetir' | 'lupa' | 'sequencia';
}

export const CONQUISTAS: Conquista[] = [
  { id: 'primeiro-passo', nome: 'Primeiro plantão', descricao: 'Concluir a primeira missão.', icone: 'passo' },
  { id: 'modulo-e1', nome: 'Voz que acolhe', descricao: 'Concluir todas as missões do Módulo 1.', icone: 'eixo1' },
  { id: 'modulo-e2', nome: 'Equipe em sintonia', descricao: 'Concluir todas as missões do Módulo 2.', icone: 'eixo2' },
  { id: 'modulo-e3', nome: 'Raciocínio afiado', descricao: 'Concluir todas as missões do Módulo 3.', icone: 'eixo3' },
  { id: 'modulo-e4', nome: 'Em evolução', descricao: 'Concluir todas as missões do Módulo 4.', icone: 'eixo4' },
  { id: 'jornada-completa', nome: 'Jornada completa', descricao: 'Concluir as 18 missões.', icone: 'completa' },
  { id: 'tres-ouros', nome: 'Conduta exemplar', descricao: 'Conquistar medalha de ouro em 3 missões.', icone: 'ouro' },
  { id: 'persistencia', nome: 'Persistência', descricao: 'Repetir uma missão e melhorar o resultado.', icone: 'repetir' },
  { id: 'comparar', nome: 'Olhar reflexivo', descricao: 'Comparar as condutas possíveis em 5 decisões.', icone: 'lupa' },
  { id: 'sequencia', nome: 'Mão firme', descricao: 'Escolher a conduta mais adequada em 4 decisões seguidas.', icone: 'sequencia' },
];
