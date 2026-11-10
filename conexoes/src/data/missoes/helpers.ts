import type { Fala, Humor, Nivel, Opcao } from '../../types';

/** Fala do narrador. */
export const n = (texto: string): Fala => ({ quem: 'narrador', texto });

/** Fala de personagem. */
export const p = (quem: string, humor: Humor, texto: string): Fala => ({ quem, texto, humor });

const IDS: Record<Nivel, string> = { adequada: 'a', parcial: 'b', pouco: 'c', inadequada: 'd' };

/** Cria uma alternativa de decisão. A ordem de exibição é embaralhada no jogo. */
export const op = (nivel: Nivel, texto: string, consequencia: Fala[], feedback: string): Opcao => ({
  id: IDS[nivel],
  nivel,
  texto,
  consequencia,
  feedback,
});
