/** Embaralha uma cópia do vetor (Fisher-Yates). */
export function embaralhar<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Substitui {nome} pelo apelido do jogador. */
export const comNome = (texto: string, apelido: string) => texto.split('{nome}').join(apelido || 'estudante');

export function dataCurta(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export function gerarCodigo() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++) s += letras[Math.floor(Math.random() * letras.length)];
  return `CX-${s}`;
}

export const normalizarCodigo = (c: string) => c.trim().toUpperCase().replace(/\s+/g, '-').slice(0, 24);

export const pct = (v: number) => `${Math.round(v)}%`;

/** Mistura uma cor hex com preto (fator < 0) ou branco (fator > 0). */
export function ajustarCor(hex: string, fator: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const alvo = fator < 0 ? 0 : 255;
  const f = Math.abs(fator);
  r = Math.round(r + (alvo - r) * f);
  g = Math.round(g + (alvo - g) * f);
  b = Math.round(b + (alvo - b) * f);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** Copia texto para a área de transferência; devolve false se o navegador recusar. */
export async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    return false;
  }
}
