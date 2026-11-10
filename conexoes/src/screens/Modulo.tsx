import React from 'react';
import { Avatar } from '../components/Avatar';
import { Cena, NOME_CENA } from '../components/Cena';
import { ChipEixo, Icone, MedalhaIcone } from '../components/ui';
import { EIXOS, PERSONAGENS, ROTULO_MEDALHA, missaoPorId, missoesDoEixo } from '../data';
import { medalhaDa, melhorTentativa, missaoDesbloqueada, tentativasDa } from '../lib/progresso';
import { pct } from '../lib/util';
import { useJogo } from '../state/jogo';
import type { EixoId } from '../types';
import type { Ir } from '../nav';

export function Modulo({ ir, eixo }: { ir: Ir; eixo: EixoId }) {
  const { jogador, banco } = useJogo();
  const e = EIXOS.find((x) => x.id === eixo)!;
  if (!jogador) return null;
  const ms = missoesDoEixo(eixo);

  return (
    <div className="max-w-4xl mx-auto py-5 sm:py-8">
      <button className="btn btn-ghost mb-4" onClick={() => ir({ nome: 'hub', aba: 'jornada' })}>
        <Icone nome="voltar" className="w-4 h-4" /> Jornada
      </button>
      <header className="mb-6">
        <ChipEixo eixo={eixo} texto={`Módulo ${e.numero} · Eixo ${e.numero}`} />
        <h1 className="text-4xl sm:text-5xl font-extrabold mt-2">{e.modulo}</h1>
        <p className="text-lg font-bold mt-1" style={{ color: `rgb(var(--${eixo}))` }}>{e.nome}</p>
        <p className="text-ink2 mt-2 max-w-[62ch]">{e.resumo}</p>
      </header>

      <ol className="space-y-3">
        {ms.map((m, i) => {
          const liberada = missaoDesbloqueada(jogador, m, banco.config);
          const melhor = melhorTentativa(jogador, m.id);
          const med = medalhaDa(jogador, m.id);
          const n = tentativasDa(jogador, m.id).length;
          return (
            <li key={m.id}>
              <button disabled={!liberada} onClick={() => ir({ nome: 'briefing', missaoId: m.id })}
                className={`w-full card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-left transition-colors ${liberada ? 'hover:border-brand' : 'opacity-60 cursor-not-allowed'}`}>
                <span className="shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-line">
                  <Cena cena={m.cena} className={`absolute inset-0 w-full h-full ${liberada ? '' : 'grayscale'}`} />
                  <span className="absolute inset-x-0 bottom-0 flex justify-center">
                    <Avatar aparencia={PERSONAGENS[m.personagens[0]].aparencia} className="w-12 sm:w-14" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="label block" style={{ color: `rgb(var(--${eixo}))` }}>Missão {i + 1} · Habilidade {String(m.numero).padStart(2, '0')}</span>
                  <span className="block font-display text-lg sm:text-xl font-bold leading-tight">{m.titulo}</span>
                  <span className="block text-sm text-ink2">{m.habilidade} · {NOME_CENA[m.cena]}</span>
                  {melhor && <span className="block text-xs text-ink2 mt-0.5 tnum">{ROTULO_MEDALHA[med!]} · melhor resultado {pct(melhor.aproveitamento)} · {n} {n === 1 ? 'tentativa' : 'tentativas'}</span>}
                </span>
                <span className="shrink-0">
                  {liberada ? <MedalhaIcone tipo={med} className="w-10 h-10" /> : <Icone nome="cadeado" className="w-6 h-6 text-ink2" />}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Briefing({ ir, missaoId }: { ir: Ir; missaoId: string }) {
  const { jogador } = useJogo();
  const m = missaoPorId(missaoId);
  if (!m || !jogador) return null;
  const e = EIXOS.find((x) => x.id === m.eixo)!;
  const melhor = melhorTentativa(jogador, m.id);

  const Campo = ({ rotulo, children }: { rotulo: string; children: React.ReactNode }) => (
    <div className="py-3 border-b border-dashed border-line last:border-0">
      <p className="label text-ink2 mb-1">{rotulo}</p>
      <div className="text-[1.02rem]">{children}</div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-5 sm:py-8">
      <button className="btn btn-ghost mb-4" onClick={() => ir({ nome: 'modulo', eixo: m.eixo })}>
        <Icone nome="voltar" className="w-4 h-4" /> {e.modulo}
      </button>

      <article className="card overflow-hidden anim-sobe">
        <div className="relative h-40 sm:h-52">
          <Cena cena={m.cena} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1">
            {m.personagens.slice(0, 3).map((id) => <Avatar key={id} aparencia={PERSONAGENS[id].aparencia} className="w-24 sm:w-32" />)}
          </div>
        </div>
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <ChipEixo eixo={m.eixo} texto={`Eixo ${e.numero} · ${e.nome}`} />
          </div>
          <p className="label text-ink2">Ficha da missão · Habilidade {String(m.numero).padStart(2, '0')}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">{m.titulo}</h1>
          <p className="text-lg font-bold mt-1" style={{ color: `rgb(var(--${m.eixo}))` }}>{m.habilidade}</p>

          <div className="mt-4">
            <Campo rotulo="Local e horário"><span className="font-mono text-sm">{m.local}</span></Campo>
            <Campo rotulo="Objetivo de aprendizagem">{m.objetivo}</Campo>
            <Campo rotulo="Contexto">{m.contexto}</Campo>
            <Campo rotulo="Situação-problema">{m.situacaoProblema}</Campo>
            <Campo rotulo="Comportamentos observados">
              <ul className="flex flex-wrap gap-2 mt-1">
                {m.comportamentos.map((c) => <li key={c} className="rounded-lg bg-surface2 px-2.5 py-1 text-sm">{c}</li>)}
              </ul>
            </Campo>
            <Campo rotulo="Personagens">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {m.personagens.map((id) => <li key={id}><strong>{PERSONAGENS[id].nome}</strong> <span className="text-ink2">· {PERSONAGENS[id].papel}</span></li>)}
              </ul>
            </Campo>
            <Campo rotulo="Como funciona">
              <span className="text-ink2 text-sm">
                {m.etapas.length} decisões. Cada escolha muda o medidor <strong className="text-ink">{m.medidor}</strong> e recebe uma explicação.
                Escolha a conduta que você realmente adotaria.
              </span>
            </Campo>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="btn btn-primary text-lg px-6" onClick={() => ir({ nome: 'missao', missaoId: m.id })}>
              <Icone nome={melhor ? 'repetir' : 'play'} className="w-4 h-4" /> {melhor ? 'Repetir missão' : 'Iniciar missão'}
            </button>
            {melhor && <span className="text-sm text-ink2 tnum">Melhor resultado: {pct(melhor.aproveitamento)}</span>}
          </div>
        </div>
      </article>
    </div>
  );
}
