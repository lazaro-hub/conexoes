import React, { useMemo, useState } from 'react';
import { Barra, Icone, MedalhaIcone, SeloNivel, COR_NIVEL, useAvisos } from '../components/ui';
import { CONQUISTAS, EIXOS, MISSOES, ROTULO_MEDALHA, medalhaPorAproveitamento } from '../data';
import { aproveitamentoEixo, medalhaDa, melhorTentativa } from '../lib/progresso';
import { gerarCodigoEnvio } from '../lib/codigo';
import { copiar, dataCurta, pct } from '../lib/util';
import { useJogo } from '../state/jogo';
import type { Ir } from '../nav';

export function Progresso() {
  const { jogador } = useJogo();
  const avisar = useAvisos();
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const codigo = useMemo(() => (jogador ? gerarCodigoEnvio(jogador) : ''), [jogador]);
  if (!jogador) return null;

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink2 flex gap-2 items-start max-w-[70ch]">
        <Icone nome="info" className="w-4 h-4 mt-0.5 shrink-0" />
        Este é o seu aproveitamento dentro do jogo, calculado pela melhor tentativa de cada missão. Ele serve para acompanhar a sua jornada e não equivale aos questionários da pesquisa.
      </p>

      <section>
        <h2 className="text-2xl font-bold mb-3">Por eixo</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {EIXOS.map((e) => {
            const ap = aproveitamentoEixo(jogador, e.id);
            return (
              <div key={e.id} className="card p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold min-w-0">Eixo {e.numero} · {e.nome}</p>
                  <p className="font-display text-2xl font-bold tnum" style={{ color: `rgb(var(--${e.id}))` }}>{pct(ap.pct)}</p>
                </div>
                <Barra valor={ap.pct} cor={e.id} className="mt-2" rotulo={`Aproveitamento no eixo ${e.numero}`} />
                <p className="text-sm text-ink2 mt-2 tnum">{ap.concluidas} de {ap.total} missões concluídas</p>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">As 18 habilidades</h2>
        <div className="grid gap-2 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {MISSOES.map((m) => {
            const t = melhorTentativa(jogador, m.id);
            const med = medalhaDa(jogador, m.id);
            return (
              <div key={m.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5">
                <span className="font-mono text-sm font-bold tnum w-6 text-center" style={{ color: `rgb(var(--${m.eixo}))` }}>{String(m.numero).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold truncate">{m.habilidade}</span>
                  <span className="block text-xs text-ink2">{t ? `${ROTULO_MEDALHA[med!]} · ${pct(t.aproveitamento)}` : 'Ainda não jogada'}</span>
                </span>
                <MedalhaIcone tipo={med} className="w-8 h-8" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="text-xl font-bold mb-1">Enviar resultados para a equipe de pesquisa</h2>
        <p className="text-ink2 text-sm mb-4 max-w-[65ch]">
          Se a equipe pedir, copie este código e envie pelo canal combinado. Ele contém apenas o seu código de participante, o apelido e as escolhas feitas nas missões.
        </p>
        {mostrarCodigo ? (
          <div className="space-y-3">
            <textarea readOnly id="codigo-envio" className="w-full h-28 rounded-xl border border-line bg-surface2 p-3 font-mono text-xs break-all" value={codigo} onFocus={(e) => e.currentTarget.select()} />
            <button className="btn btn-primary" onClick={async () => {
              const ok = await copiar(codigo);
              if (ok) avisar('Código copiado');
              else { (document.getElementById('codigo-envio') as HTMLTextAreaElement | null)?.select(); avisar('Selecione o texto e copie manualmente', 'info'); }
            }}>
              <Icone nome="copiar" className="w-4 h-4" /> Copiar código
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost" onClick={() => setMostrarCodigo(true)} disabled={jogador.tentativas.length === 0}>
            {jogador.tentativas.length === 0 ? 'Conclua uma missão para gerar o código' : 'Gerar código de resultados'}
          </button>
        )}
      </section>
    </div>
  );
}

const ICONE_CONQUISTA: Record<string, string> = {
  passo: 'pegada', eixo1: 'balao', eixo2: 'pessoa', eixo3: 'lupa', eixo4: 'estrela', completa: 'trofeu', ouro: 'estrela', repetir: 'repetir', lupa: 'lupa', sequencia: 'sequencia',
};

export function Conquistas() {
  const { jogador } = useJogo();
  if (!jogador) return null;
  const n = jogador.conquistas.length;
  return (
    <div>
      <p className="text-ink2 mb-4 tnum"><strong className="text-ink">{n}</strong> de {CONQUISTAS.length} conquistas desbloqueadas</p>
      <div className="grid gap-3 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {CONQUISTAS.map((c) => {
          const tem = jogador.conquistas.includes(c.id);
          return (
            <div key={c.id} className={`card p-4 flex gap-3 items-center ${tem ? '' : 'opacity-60'}`}>
              <span className={`shrink-0 grid place-items-center w-12 h-12 rounded-2xl ${tem ? 'bg-accent text-accent-ink' : 'bg-surface2 text-ink2'}`}>
                <Icone nome={tem ? ICONE_CONQUISTA[c.icone] : 'cadeado'} className="w-6 h-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold">{c.nome}</span>
                <span className="block text-sm text-ink2">{c.descricao}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Historico({ ir }: { ir: Ir }) {
  const { jogador } = useJogo();
  if (!jogador) return null;
  const lista = [...jogador.tentativas].reverse();
  if (lista.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="font-bold">Nenhuma missão jogada ainda.</p>
        <p className="text-ink2 text-sm mt-1">Cada tentativa aparece aqui, com as condutas escolhidas em cada etapa.</p>
        <button className="btn btn-primary mt-4" onClick={() => ir({ nome: 'hub', aba: 'jornada' })}>Ir para a jornada</button>
      </div>
    );
  }
  return (
    <ol className="space-y-2">
      {lista.map((t, i) => {
        const m = MISSOES.find((x) => x.id === t.missaoId);
        if (!m) return null;
        const med = medalhaPorAproveitamento(t.aproveitamento);
        return (
          <li key={i} className="card p-3 sm:p-4 flex flex-wrap items-center gap-3">
            <MedalhaIcone tipo={med} className="w-9 h-9" />
            <div className="min-w-0 flex-1">
              <p className="font-bold truncate">{m.titulo}</p>
              <p className="text-sm text-ink2">{m.habilidade} · {dataCurta(t.fim)}</p>
            </div>
            <div className="flex items-center gap-1.5" aria-label="Condutas escolhidas">
              {t.escolhas.map((e, k) => (
                <span key={k} title={`Etapa ${k + 1}`} className="w-3.5 h-3.5 rounded-full" style={{ background: `rgb(var(--${COR_NIVEL[e.nivel]}))` }} />
              ))}
            </div>
            <div className="text-right tnum w-20">
              <p className="font-bold">{pct(t.aproveitamento)}</p>
              <p className="text-xs text-ink2">{t.xp} XP</p>
            </div>
            <button className="btn btn-ghost py-1.5 min-h-0 text-sm" onClick={() => ir({ nome: 'briefing', missaoId: m.id })}>
              <Icone nome="repetir" className="w-4 h-4" /> Repetir
            </button>
          </li>
        );
      })}
      <li className="pt-2 flex flex-wrap gap-3 text-xs text-ink2">
        {(['adequada', 'parcial', 'pouco', 'inadequada'] as const).map((n) => <SeloNivel key={n} nivel={n} curto />)}
      </li>
    </ol>
  );
}
