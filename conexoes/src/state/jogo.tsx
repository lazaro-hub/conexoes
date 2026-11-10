import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { nivelDoJogador } from '../data';
import type { Aparencia, Configuracao, Tentativa } from '../types';
import { avaliarConquistas } from '../lib/progresso';
import { armazenamentoDisponivel, bancoVazio, carregar, salvar } from '../lib/storage';
import type { Banco, JogadorSalvo } from '../lib/storage';
import type { Importado } from '../lib/codigo';

export interface ResultadoRegistro {
  novasConquistas: string[];
  nivelAntes: number;
  nivelDepois: number;
}

interface Ctx {
  banco: Banco;
  jogador: JogadorSalvo | null;
  armazenamentoOk: boolean;
  criarJogador: (codigo: string, apelido: string, aparencia: Aparencia) => void;
  entrar: (codigo: string) => void;
  sair: () => void;
  atualizarPerfil: (apelido: string, aparencia: Aparencia) => void;
  registrarTentativa: (t: Tentativa) => ResultadoRegistro;
  registrarComparacao: () => string[];
  definirConfig: (c: Partial<Configuracao>) => void;
  importar: (imp: Importado) => 'novo' | 'atualizado';
  removerJogador: (codigo: string) => void;
  apagarTudo: () => void;
}

const JogoCtx = createContext<Ctx | null>(null);

export function ProvedorJogo({ children }: { children: React.ReactNode }) {
  const [banco, setBanco] = useState<Banco>(() => carregar());
  const [armazenamentoOk] = useState(() => armazenamentoDisponivel());

  const aplicar = useCallback((fn: (b: Banco) => Banco) => {
    setBanco((atual) => {
      const novo = fn(JSON.parse(JSON.stringify(atual)));
      salvar(novo);
      return novo;
    });
  }, []);

  const jogador = banco.ativo ? banco.jogadores[banco.ativo] ?? null : null;

  const criarJogador = useCallback((codigo: string, apelido: string, aparencia: Aparencia) => {
    aplicar((b) => {
      const existente = b.jogadores[codigo];
      if (existente && existente.origem === 'dispositivo') {
        existente.apelido = apelido;
        existente.aparencia = aparencia;
      } else {
        b.jogadores[codigo] = {
          codigo, apelido, aparencia, criadoEm: new Date().toISOString(), xp: 0, tentativas: [], conquistas: [],
          comparacoesAbertas: 0, melhorSequencia: 0, sequenciaAtual: 0, origem: 'dispositivo',
        };
      }
      b.ativo = codigo;
      return b;
    });
  }, [aplicar]);

  const entrar = useCallback((codigo: string) => aplicar((b) => ({ ...b, ativo: b.jogadores[codigo] ? codigo : null })), [aplicar]);
  const sair = useCallback(() => aplicar((b) => ({ ...b, ativo: null })), [aplicar]);

  const atualizarPerfil = useCallback((apelido: string, aparencia: Aparencia) => {
    aplicar((b) => {
      const j = b.ativo ? b.jogadores[b.ativo] : null;
      if (j) { j.apelido = apelido; j.aparencia = aparencia; }
      return b;
    });
  }, [aplicar]);

  const registrarTentativa = useCallback((t: Tentativa): ResultadoRegistro => {
    // Calcula o resultado de forma síncrona a partir do estado atual, para que a tela de resultado
    // receba conquistas e nível corretos.
    const atual = carregarAtual(banco);
    const j = atual.ativo ? atual.jogadores[atual.ativo] : null;
    if (!j) return { novasConquistas: [], nivelAntes: 1, nivelDepois: 1 };
    const nivelAntes = nivelDoJogador(j.xp).numero;
    const melhorAntes = j.tentativas.filter((x) => x.missaoId === t.missaoId).reduce((m, x) => Math.max(m, x.xp), 0);
    j.tentativas.push(t);
    j.xp += Math.max(0, t.xp - melhorAntes); // XP total soma apenas melhorias, para não premiar repetição pura
    t.escolhas.forEach((e) => {
      j.sequenciaAtual = e.nivel === 'adequada' ? j.sequenciaAtual + 1 : 0;
      j.melhorSequencia = Math.max(j.melhorSequencia, j.sequenciaAtual);
    });
    const agora = avaliarConquistas(j);
    const novas = agora.filter((c) => !j.conquistas.includes(c));
    j.conquistas = agora;
    salvar(atual);
    setBanco(atual);
    return { novasConquistas: novas, nivelAntes, nivelDepois: nivelDoJogador(j.xp).numero };
  }, [banco]);

  const registrarComparacao = useCallback((): string[] => {
    const atual = carregarAtual(banco);
    const j = atual.ativo ? atual.jogadores[atual.ativo] : null;
    if (!j) return [];
    j.comparacoesAbertas += 1;
    const agora = avaliarConquistas(j);
    const novas = agora.filter((c) => !j.conquistas.includes(c));
    j.conquistas = agora;
    salvar(atual);
    setBanco(atual);
    return novas;
  }, [banco]);

  const definirConfig = useCallback((c: Partial<Configuracao>) => aplicar((b) => ({ ...b, config: { ...b.config, ...c } })), [aplicar]);

  const importar = useCallback((imp: Importado): 'novo' | 'atualizado' => {
    const chave = banco.jogadores[imp.codigo]?.origem === 'dispositivo' ? `${imp.codigo} (importado)` : imp.codigo;
    const existia = !!banco.jogadores[chave];
    aplicar((b) => {
      const j: JogadorSalvo = {
        codigo: chave, apelido: imp.apelido, aparencia: { pele: '#C98A5E', cabelo: 'curto', corCabelo: '#1F1A17', roupa: 'scrub', corRoupa: '#1F7A78' },
        criadoEm: imp.tentativas[0]?.inicio ?? new Date().toISOString(), xp: 0, tentativas: imp.tentativas, conquistas: [],
        comparacoesAbertas: 0, melhorSequencia: 0, sequenciaAtual: 0, origem: 'importado',
      };
      const melhores: Record<string, number> = {};
      imp.tentativas.forEach((t) => { melhores[t.missaoId] = Math.max(melhores[t.missaoId] ?? 0, t.xp); });
      j.xp = Object.values(melhores).reduce((s, v) => s + v, 0);
      b.jogadores[chave] = j;
      return b;
    });
    return existia ? 'atualizado' : 'novo';
  }, [aplicar, banco]);

  const removerJogador = useCallback((codigo: string) => aplicar((b) => {
    delete b.jogadores[codigo];
    if (b.ativo === codigo) b.ativo = null;
    return b;
  }), [aplicar]);

  const apagarTudo = useCallback(() => aplicar(() => bancoVazio()), [aplicar]);

  const valor = useMemo<Ctx>(() => ({
    banco, jogador, armazenamentoOk, criarJogador, entrar, sair, atualizarPerfil, registrarTentativa,
    registrarComparacao, definirConfig, importar, removerJogador, apagarTudo,
  }), [banco, jogador, armazenamentoOk, criarJogador, entrar, sair, atualizarPerfil, registrarTentativa, registrarComparacao, definirConfig, importar, removerJogador, apagarTudo]);

  return <JogoCtx.Provider value={valor}>{children}</JogoCtx.Provider>;
}

function carregarAtual(b: Banco): Banco {
  return JSON.parse(JSON.stringify(b));
}

export function useJogo() {
  const c = useContext(JogoCtx);
  if (!c) throw new Error('useJogo fora do ProvedorJogo');
  return c;
}
