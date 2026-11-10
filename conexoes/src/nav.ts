import type { EixoId, Tentativa } from './types';
import type { ResultadoRegistro } from './state/jogo';

export type Aba = 'jornada' | 'progresso' | 'conquistas' | 'historico';

export type Tela =
  | { nome: 'inicio' }
  | { nome: 'identificacao'; editar?: boolean }
  | { nome: 'hub'; aba: Aba }
  | { nome: 'modulo'; eixo: EixoId }
  | { nome: 'briefing'; missaoId: string }
  | { nome: 'missao'; missaoId: string }
  | { nome: 'resultado'; tentativa: Tentativa; registro: ResultadoRegistro }
  | { nome: 'admin' };

export type Ir = (t: Tela) => void;
