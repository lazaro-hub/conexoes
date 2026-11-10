import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Cena } from '../components/Cena';
import { Barra, Confirmacao, Icone, MedalhaIcone } from '../components/ui';
import { EIXOS, MISSOES, XP_MAX_TOTAL, missoesDoEixo, nivelDoJogador } from '../data';
import { aproveitamentoEixo, medalhaDa, missaoConcluida, moduloDesbloqueado, proximaMissao } from '../lib/progresso';
import { useJogo } from '../state/jogo';
import type { Aba, Ir } from '../nav';
import { Conquistas, Historico, Progresso } from './Painel';

const ABAS: { id: Aba; nome: string; icone: string }[] = [
  { id: 'jornada', nome: 'Jornada', icone: 'mapa' },
  { id: 'progresso', nome: 'Progresso', icone: 'grafico' },
  { id: 'conquistas', nome: 'Conquistas', icone: 'trofeu' },
  { id: 'historico', nome: 'Histórico', icone: 'historico' },
];

export function Hub({ ir, aba }: { ir: Ir; aba: Aba }) {
  const { jogador, sair } = useJogo();
  const [confirmarSaida, setConfirmarSaida] = useState(false);
  if (!jogador) return null;

  return (
    <div className="max-w-5xl mx-auto py-5 sm:py-8">
      <Cracha ir={ir} onSair={() => setConfirmarSaida(true)} />

      <nav className="mt-5 flex gap-1 p-1 rounded-xl bg-surface2 scroll-x" aria-label="Seções">
        {ABAS.map((a) => (
          <button key={a.id} onClick={() => ir({ nome: 'hub', aba: a.id })} aria-current={aba === a.id ? 'page' : undefined}
            className={`flex-1 min-w-[5.5rem] inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${aba === a.id ? 'bg-surface text-ink shadow-sm' : 'text-ink2 hover:text-ink'}`}>
            <Icone nome={a.icone} className="w-4 h-4 hidden min-[380px]:block" /> {a.nome}
          </button>
        ))}
      </nav>

      <div key={aba} className="mt-6 anim-sobe">
        {aba === 'jornada' && <Jornada ir={ir} />}
        {aba === 'progresso' && <Progresso />}
        {aba === 'conquistas' && <Conquistas />}
        {aba === 'historico' && <Historico ir={ir} />}
      </div>

      <Confirmacao
        aberto={confirmarSaida}
        titulo="Trocar de participante?"
        texto="Seu progresso continua salvo neste dispositivo. Para voltar, escolha seu nome na tela inicial."
        confirmar="Trocar"
        onConfirmar={() => { setConfirmarSaida(false); sair(); ir({ nome: 'inicio' }); }}
        onCancelar={() => setConfirmarSaida(false)}
      />
    </div>
  );
}

function Cracha({ ir, onSair }: { ir: Ir; onSair: () => void }) {
  const { jogador } = useJogo();
  if (!jogador) return null;
  const nv = nivelDoJogador(jogador.xp);
  const feitas = MISSOES.filter((m) => missaoConcluida(jogador, m.id)).length;
  return (
    <header className="card overflow-hidden">
      <div className="h-2.5 lanyard" />
      <div className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
        <button onClick={() => ir({ nome: 'identificacao', editar: true })} className="shrink-0 w-20 h-20 rounded-2xl bg-brand-soft overflow-hidden grid place-items-end" aria-label="Editar personagem">
          <Avatar aparencia={jogador.aparencia} humor="feliz" className="w-20" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="label text-ink2">Estudante de Enfermagem · <span className="font-mono">{jogador.codigo}</span></p>
          <p className="font-display text-2xl sm:text-3xl font-bold truncate">{jogador.apelido}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="shrink-0 rounded-md bg-accent text-accent-ink px-2 py-0.5 text-sm font-bold">Nível {nv.numero}</span>
            <span className="text-sm font-bold truncate">{nv.titulo}</span>
          </div>
        </div>
        <div className="w-full sm:w-64">
          <div className="flex justify-between text-sm mb-1 tnum">
            <span className="text-ink2">{jogador.xp} XP</span>
            <span className="text-ink2">{nv.proximo ? `próximo nível: ${nv.proximo.min}` : `máximo: ${XP_MAX_TOTAL}`}</span>
          </div>
          <Barra valor={nv.progresso * 100} cor="accent" rotulo="Progresso para o próximo nível" />
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="tnum"><strong>{feitas}</strong> <span className="text-ink2">de 18 missões</span></span>
            <button className="inline-flex items-center gap-1 text-ink2 hover:text-ink font-bold" onClick={onSair}>
              <Icone nome="sair" className="w-4 h-4" /> Trocar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Jornada({ ir }: { ir: Ir }) {
  const { jogador, banco } = useJogo();
  if (!jogador) return null;
  const prox = proximaMissao(jogador, banco.config);

  return (
    <div>
      {prox ? (
        <button className="w-full card p-4 sm:p-5 mb-6 flex items-center gap-4 text-left hover:border-brand transition-colors" onClick={() => ir({ nome: 'briefing', missaoId: prox.id })}>
          <span className="shrink-0 grid place-items-center w-12 h-12 rounded-full bg-brand text-brand-ink anim-pulso"><Icone nome="play" className="w-5 h-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="label text-brand block">Próxima missão · {prox.habilidade}</span>
            <span className="block font-display text-xl font-bold">{prox.titulo}</span>
            <span className="block text-sm text-ink2 truncate">{prox.local}</span>
          </span>
          <Icone nome="avancar" className="w-5 h-5 text-ink2" />
        </button>
      ) : (
        <div className="card p-5 mb-6 flex items-center gap-4">
          <MedalhaIcone tipo="ouro" className="w-12 h-12" />
          <div>
            <p className="font-display text-xl font-bold">Jornada concluída</p>
            <p className="text-ink2">Você passou pelas 18 missões. Repita qualquer uma para explorar outras condutas.</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {EIXOS.map((e) => {
          const liberado = moduloDesbloqueado(jogador, e.id, banco.config);
          const ap = aproveitamentoEixo(jogador, e.id);
          const ms = missoesDoEixo(e.id);
          return (
            <button key={e.id} disabled={!liberado} onClick={() => ir({ nome: 'modulo', eixo: e.id })}
              className={`card overflow-hidden text-left transition-transform ${liberado ? 'hover:-translate-y-0.5' : 'opacity-70 cursor-not-allowed'}`}>
              <div className="relative h-28">
                <Cena cena={e.cena} className={`absolute inset-0 w-full h-full ${liberado ? '' : 'grayscale'}`} />
                <span className="absolute left-3 top-3 rounded-md px-2 py-1 label bg-surface/90" style={{ color: `rgb(var(--${e.id}))` }}>Módulo {e.numero}</span>
                {!liberado && <span className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full bg-surface/90 text-ink2"><Icone nome="cadeado" className="w-4 h-4" /></span>}
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl font-bold">{e.modulo}</h3>
                <p className="text-sm font-bold" style={{ color: `rgb(var(--${e.id}))` }}>Eixo {e.numero} · {e.nome}</p>
                <p className="text-sm text-ink2 mt-1">{liberado ? e.resumo : `Conclua o Módulo ${e.numero - 1} para liberar.`}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  {ms.map((m) => <MedalhaIcone key={m.id} tipo={medalhaDa(jogador, m.id)} className="w-7 h-7" />)}
                  <span className="ml-auto text-sm text-ink2 tnum">{ap.concluidas}/{ap.total}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
