import { EIXOS, MISSOES, ROTULO_NIVEL } from '../data';
import type { JogadorSalvo } from './storage';

const esc = (v: unknown) => {
  const s = String(v ?? '');
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/**
 * Uma linha por decisão tomada no jogo (formato longo), pronta para análise.
 * Separador ";" para abrir corretamente no Excel em português.
 * Observação: são dados de desempenho DENTRO do jogo, não do instrumento pré e pós-teste.
 */
export function gerarCSV(jogadores: JogadorSalvo[]): string {
  const cab = [
    'codigo_participante', 'apelido', 'origem', 'tentativa_n', 'missao_id', 'habilidade_n', 'habilidade', 'eixo',
    'etapa', 'nivel_conduta', 'nivel_conduta_rotulo', 'xp_etapa', 'aproveitamento_missao_pct', 'inicio', 'fim',
  ];
  const linhas = [cab.join(';')];
  const XP: Record<string, number> = { adequada: 100, parcial: 60, pouco: 25, inadequada: 0 };
  for (const j of jogadores) {
    const contador: Record<string, number> = {};
    for (const t of j.tentativas) {
      const m = MISSOES.find((x) => x.id === t.missaoId);
      if (!m) continue;
      contador[m.id] = (contador[m.id] || 0) + 1;
      const eixo = EIXOS.find((e) => e.id === m.eixo)!;
      t.escolhas.forEach((e, i) => {
        linhas.push([
          j.codigo, j.apelido, j.origem, contador[m.id], m.id, m.numero, m.habilidade, `Eixo ${eixo.numero}`,
          i + 1, e.nivel, ROTULO_NIVEL[e.nivel], XP[e.nivel], Math.round(t.aproveitamento), t.inicio, t.fim,
        ].map(esc).join(';'));
      });
    }
  }
  return '﻿' + linhas.join('\n');
}
