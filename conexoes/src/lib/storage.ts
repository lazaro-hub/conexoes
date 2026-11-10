import type { Configuracao, Jogador } from '../types';
import { CHAVE_ARMAZENAMENTO } from './config';

export interface JogadorSalvo extends Jogador {
  /** 'dispositivo' = jogou neste navegador; 'importado' = recebido por código de envio. */
  origem: 'dispositivo' | 'importado';
}

export interface Banco {
  versao: 1;
  ativo: string | null;
  jogadores: Record<string, JogadorSalvo>;
  config: Configuracao;
}

const VAZIO: Banco = { versao: 1, ativo: null, jogadores: {}, config: { liberarTudo: false } };

// O progresso fica apenas neste navegador. Se o armazenamento estiver bloqueado
// (janela anônima, por exemplo), o jogo continua funcionando só na memória.
let memoria: Banco = structuredCloneSeguro(VAZIO);

function structuredCloneSeguro<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export function carregar(): Banco {
  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return structuredCloneSeguro(memoria);
    const dados = JSON.parse(bruto) as Banco;
    if (!dados || dados.versao !== 1 || typeof dados.jogadores !== 'object') return structuredCloneSeguro(VAZIO);
    dados.config = { ...VAZIO.config, ...(dados.config || {}) };
    memoria = dados;
    return structuredCloneSeguro(dados);
  } catch {
    return structuredCloneSeguro(memoria);
  }
}

export function salvar(b: Banco): boolean {
  memoria = structuredCloneSeguro(b);
  try {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(b));
    return true;
  } catch {
    return false;
  }
}

export function armazenamentoDisponivel(): boolean {
  try {
    const k = CHAVE_ARMAZENAMENTO + ':teste';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export const bancoVazio = () => structuredCloneSeguro(VAZIO);
