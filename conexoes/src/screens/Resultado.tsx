import React from 'react';
import { Avatar } from '../components/Avatar';
import { Barra, Icone, MedalhaIcone, SeloNivel } from '../components/ui';
import { CONQUISTAS, MISSOES, NIVEIS, ROTULO_MEDALHA, medalhaPorAproveitamento, missaoPorId } from '../data';
import { missaoDesbloqueada, tentativasDa } from '../lib/progresso';
import { comNome, pct } from '../lib/util';
import { useJogo } from '../state/jogo';
import type { Tentativa } from '../types';
import type { ResultadoRegistro } from '../state/jogo';
import type { Ir } from '../nav';

const FRASE: Record<string, string> = {
  ouro: 'Condutas consistentes nas duas decisões.',
  prata: 'Boa base, com pontos para ajustar.',
  bronze: 'Há aprendizados importantes nesta missão.',
  participacao: 'Vale repetir a missão com o que você aprendeu.',
};

export function Resultado({ ir, tentativa, registro }: { ir: Ir; tentativa: Tentativa; registro: ResultadoRegistro }) {
  const { jogador, banco } = useJogo();
  const m = missaoPorId(tentativa.missaoId)!;
  if (!jogador) return null;
  const med = medalhaPorAproveitamento(tentativa.aproveitamento);
  const anteriores = tentativasDa(jogador, m.id).slice(0, -1);
  const melhorAnterior = anteriores.reduce((s, t) => Math.max(s, t.aproveitamento), -1);
  const idx = MISSOES.findIndex((x) => x.id === m.id);
  const seguinte = MISSOES.slice(idx + 1).find((x) => missaoDesbloqueada(jogador, x, banco.config));
  const subiu = registro.nivelDepois > registro.nivelAntes;

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10">
      <section className="card overflow-hidden anim-surge">
        <div className="h-2.5 lanyard" />
        <div className="p-5 sm:p-8 text-center">
          <p className="label text-ink2">Missão concluída · {m.habilidade}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">{m.titulo}</h1>
          <div className="mt-5 flex flex-col items-center">
            <MedalhaIcone tipo={med} className="w-24 h-24 anim-pulso" />
            <p className="font-display text-2xl font-bold mt-2">{ROTULO_MEDALHA[med]}</p>
            <p className="text-ink2">{FRASE[med]}</p>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-surface2 p-3"><dt className="label text-ink2 !text-[0.62rem] leading-tight">Aproveitamento</dt><dd className="font-display text-2xl font-bold tnum">{pct(tentativa.aproveitamento)}</dd></div>
            <div className="rounded-xl bg-surface2 p-3"><dt className="label text-ink2 !text-[0.62rem] leading-tight">XP da missão</dt><dd className="font-display text-2xl font-bold tnum">{tentativa.xp}</dd></div>
            <div className="rounded-xl bg-surface2 p-3"><dt className="label text-ink2 !text-[0.62rem] leading-tight">{m.medidor}</dt><dd className="font-display text-2xl font-bold tnum">{Math.round(tentativa.medidorFinal)}</dd></div>
          </dl>
          {melhorAnterior >= 0 && (
            <p className="mt-3 text-sm text-ink2 tnum">
              {tentativa.aproveitamento > melhorAnterior ? `Você melhorou: antes, o melhor resultado era ${pct(melhorAnterior)}.` : `Seu melhor resultado nesta missão continua ${pct(Math.max(melhorAnterior, tentativa.aproveitamento))}.`}
            </p>
          )}
        </div>
      </section>

      {(subiu || registro.novasConquistas.length > 0) && (
        <section className="mt-4 grid gap-3 sm:grid-cols-2">
          {subiu && (
            <div className="card p-4 flex items-center gap-3 anim-sobe">
              <span className="shrink-0 w-14 h-14 rounded-2xl bg-brand-soft overflow-hidden grid place-items-end"><Avatar aparencia={jogador.aparencia} humor="feliz" className="w-14" /></span>
              <div>
                <p className="label text-accent">Novo nível</p>
                <p className="font-bold">Nível {registro.nivelDepois} · {NIVEIS[registro.nivelDepois - 1].titulo}</p>
              </div>
            </div>
          )}
          {registro.novasConquistas.map((id) => {
            const c = CONQUISTAS.find((x) => x.id === id)!;
            return (
              <div key={id} className="card p-4 flex items-center gap-3 anim-sobe">
                <span className="shrink-0 grid place-items-center w-12 h-12 rounded-2xl bg-accent text-accent-ink"><Icone nome="trofeu" className="w-6 h-6" /></span>
                <div>
                  <p className="label text-accent">Conquista desbloqueada</p>
                  <p className="font-bold">{c.nome}</p>
                  <p className="text-sm text-ink2">{c.descricao}</p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <section className="card p-5 sm:p-6 mt-4">
        <h2 className="text-xl font-bold mb-3">Suas decisões</h2>
        <ol className="space-y-3">
          {tentativa.escolhas.map((e, i) => {
            const etapa = m.etapas.find((x) => x.id === e.etapaId)!;
            const o = etapa.opcoes.find((x) => x.id === e.opcaoId)!;
            return (
              <li key={e.etapaId} className="rounded-xl border border-line p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="label text-ink2">Etapa {i + 1} · {comNome(etapa.desafio, jogador.apelido)}</span>
                  <SeloNivel nivel={e.nivel} curto />
                </div>
                <p className="text-sm">{comNome(o.texto, jogador.apelido)}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="card p-5 sm:p-6 mt-4">
        <p className="label text-brand">Justificativa pedagógica</p>
        <p className="mt-2 max-w-[68ch]">{m.justificativa}</p>
        <div className="mt-5 rounded-xl bg-brand-soft/60 p-4">
          <p className="label text-ink2">Para refletir</p>
          <p className="mt-1 font-bold max-w-[62ch]">{m.paraRefletir}</p>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap gap-3 justify-between">
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-ghost" onClick={() => ir({ nome: 'modulo', eixo: m.eixo })}><Icone nome="voltar" className="w-4 h-4" /> Módulo</button>
          <button className="btn btn-ghost" onClick={() => ir({ nome: 'missao', missaoId: m.id })}><Icone nome="repetir" className="w-4 h-4" /> Repetir missão</button>
        </div>
        {seguinte ? (
          <button className="btn btn-primary" onClick={() => ir({ nome: 'briefing', missaoId: seguinte.id })}>
            Próxima missão: {seguinte.habilidade} <Icone nome="avancar" className="w-4 h-4" />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => ir({ nome: 'hub', aba: 'progresso' })}>
            Ver meu progresso <Icone nome="avancar" className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="mt-6">
        <Barra valor={(new Set(jogador.tentativas.map((t) => t.missaoId)).size / 18) * 100} rotulo="Missões concluídas" />
        <p className="text-sm text-ink2 mt-1 tnum">{new Set(jogador.tentativas.map((t) => t.missaoId)).size} de 18 missões concluídas</p>
      </div>
    </div>
  );
}
