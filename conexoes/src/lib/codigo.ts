// Código de envio de resultados: permite que o participante entregue seus resultados
// ao pesquisador (por mensagem, formulário etc.) sem servidor. O código contém apenas
// o código do participante, o apelido e as escolhas feitas nas missões.
import { MISSOES, XP_MAX_MISSAO, XP_POR_NIVEL } from '../data';
import type { Jogador, Nivel, Tentativa } from '../types';
import { PREFIXO_CODIGO_ENVIO } from './config';

const NIVEIS: Nivel[] = ['adequada', 'parcial', 'pouco', 'inadequada'];

type Compacta = [number, number, number, string]; // [índice da missão, início (min), duração (s), níveis "0213"]

interface Pacote { c: string; a: string; t: Compacta[] }

function paraBase64Url(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function deBase64Url(s: string) {
  const b = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b + '==='.slice((b.length + 3) % 4));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function gerarCodigoEnvio(j: Jogador): string {
  const t: Compacta[] = j.tentativas.map((x) => {
    const idx = MISSOES.findIndex((m) => m.id === x.missaoId);
    const ini = Math.round(new Date(x.inicio).getTime() / 60000);
    const dur = Math.max(0, Math.round((new Date(x.fim).getTime() - new Date(x.inicio).getTime()) / 1000));
    return [idx, ini, dur, x.escolhas.map((e) => NIVEIS.indexOf(e.nivel)).join('')];
  });
  const pacote: Pacote = { c: j.codigo, a: j.apelido, t };
  return `${PREFIXO_CODIGO_ENVIO}.${paraBase64Url(JSON.stringify(pacote))}`;
}

export interface Importado { codigo: string; apelido: string; tentativas: Tentativa[] }

export function lerCodigoEnvio(texto: string): Importado {
  const limpo = texto.trim().replace(/\s+/g, '');
  const [prefixo, corpo] = limpo.split('.');
  if (prefixo !== PREFIXO_CODIGO_ENVIO || !corpo) throw new Error('O código não começa com ' + PREFIXO_CODIGO_ENVIO + '.');
  let p: Pacote;
  try {
    p = JSON.parse(deBase64Url(corpo));
  } catch {
    throw new Error('O código está incompleto ou foi alterado. Peça ao participante que copie o código inteiro de novo.');
  }
  if (!p || typeof p.c !== 'string' || !Array.isArray(p.t)) throw new Error('O conteúdo do código não foi reconhecido.');
  const tentativas: Tentativa[] = p.t.map(([idx, ini, dur, nv]) => {
    const m = MISSOES[idx];
    if (!m) throw new Error('O código contém uma missão desconhecida.');
    const niveis = String(nv).split('').map((d) => NIVEIS[Number(d)]);
    const escolhas = m.etapas.map((e, i) => {
      const nivel = niveis[i] ?? 'inadequada';
      return { etapaId: e.id, opcaoId: e.opcoes.find((o) => o.nivel === nivel)!.id, nivel };
    });
    const xp = escolhas.reduce((s, e) => s + XP_POR_NIVEL[e.nivel], 0);
    const inicio = new Date(ini * 60000).toISOString();
    return {
      missaoId: m.id,
      inicio,
      fim: new Date(ini * 60000 + dur * 1000).toISOString(),
      escolhas,
      xp,
      aproveitamento: (xp / XP_MAX_MISSAO(m)) * 100,
      medidorFinal: 0,
    };
  });
  return { codigo: p.c.slice(0, 24), apelido: String(p.a || '').slice(0, 24), tentativas };
}
