import {
  CONQUISTAS, EIXOS, MISSOES, XP_MAX_MISSAO, medalhaPorAproveitamento, missoesDoEixo,
} from '../data';
import type { Medalha } from '../data';
import type { Configuracao, EixoId, Jogador, Missao, Tentativa } from '../types';

export const tentativasDa = (j: Jogador, missaoId: string) => j.tentativas.filter((t) => t.missaoId === missaoId);

export function melhorTentativa(j: Jogador, missaoId: string): Tentativa | undefined {
  return tentativasDa(j, missaoId).reduce<Tentativa | undefined>((m, t) => (!m || t.xp > m.xp ? t : m), undefined);
}

export function primeiraTentativa(j: Jogador, missaoId: string): Tentativa | undefined {
  return tentativasDa(j, missaoId)[0];
}

export const missaoConcluida = (j: Jogador, missaoId: string) => j.tentativas.some((t) => t.missaoId === missaoId);

export const moduloConcluido = (j: Jogador, eixo: EixoId) => missoesDoEixo(eixo).every((m) => missaoConcluida(j, m.id));

export function moduloDesbloqueado(j: Jogador, eixo: EixoId, cfg: Configuracao) {
  if (cfg.liberarTudo) return true;
  const idx = EIXOS.findIndex((e) => e.id === eixo);
  return idx <= 0 || moduloConcluido(j, EIXOS[idx - 1].id);
}

export function missaoDesbloqueada(j: Jogador, m: Missao, cfg: Configuracao) {
  if (cfg.liberarTudo) return true;
  if (!moduloDesbloqueado(j, m.eixo, cfg)) return false;
  const doEixo = missoesDoEixo(m.eixo);
  const i = doEixo.findIndex((x) => x.id === m.id);
  return i <= 0 || missaoConcluida(j, doEixo[i - 1].id);
}

export function medalhaDa(j: Jogador, missaoId: string): Medalha | null {
  const t = melhorTentativa(j, missaoId);
  return t ? medalhaPorAproveitamento(t.aproveitamento) : null;
}

/** Aproveitamento do jogo por eixo (0 a 100), com base na melhor ou na primeira tentativa de cada missão. */
export function aproveitamentoEixo(j: Jogador, eixo: EixoId, base: 'melhor' | 'primeira' = 'melhor') {
  const ms = missoesDoEixo(eixo);
  const max = ms.reduce((s, m) => s + XP_MAX_MISSAO(m), 0);
  const obtido = ms.reduce((s, m) => {
    const t = base === 'melhor' ? melhorTentativa(j, m.id) : primeiraTentativa(j, m.id);
    return s + (t ? t.xp : 0);
  }, 0);
  const concluidas = ms.filter((m) => missaoConcluida(j, m.id)).length;
  return { pct: max ? (obtido / max) * 100 : 0, concluidas, total: ms.length };
}

export function proximaMissao(j: Jogador, cfg: Configuracao): Missao | undefined {
  return MISSOES.find((m) => missaoDesbloqueada(j, m, cfg) && !missaoConcluida(j, m.id));
}

/** Retorna os IDs das conquistas que o jogador cumpre agora. */
export function avaliarConquistas(j: Jogador): string[] {
  const ok = new Set<string>();
  if (j.tentativas.length > 0) ok.add('primeiro-passo');
  EIXOS.forEach((e) => { if (moduloConcluido(j, e.id)) ok.add(`modulo-${e.id}`); });
  if (MISSOES.every((m) => missaoConcluida(j, m.id))) ok.add('jornada-completa');
  const ouros = MISSOES.filter((m) => medalhaDa(j, m.id) === 'ouro').length;
  if (ouros >= 3) ok.add('tres-ouros');
  const melhorou = MISSOES.some((m) => {
    const ts = tentativasDa(j, m.id);
    return ts.length > 1 && ts.slice(1).some((t) => t.xp > ts[0].xp);
  });
  if (melhorou) ok.add('persistencia');
  if (j.comparacoesAbertas >= 5) ok.add('comparar');
  if (j.melhorSequencia >= 4) ok.add('sequencia');
  return CONQUISTAS.filter((c) => ok.has(c.id)).map((c) => c.id);
}
