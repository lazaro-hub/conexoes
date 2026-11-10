import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Cena } from '../components/Cena';
import { Barra, ChipEixo, Confirmacao, Icone, SeloNivel, COR_NIVEL, useAvisos } from '../components/ui';
import { CONQUISTAS, MEDIDOR_DELTA, MEDIDOR_INICIAL, PERSONAGENS, XP_MAX_MISSAO, XP_POR_NIVEL, missaoPorId } from '../data';
import { comNome, embaralhar } from '../lib/util';
import { useJogo } from '../state/jogo';
import type { EscolhaRegistrada, Fala, Humor, Nivel, Opcao, Tentativa } from '../types';
import type { Ir } from '../nav';

type Fase = 'situacao' | 'escolha' | 'consequencia' | 'feedback';

const HUMOR_JOGADOR: Record<Nivel, Humor> = { adequada: 'aliviado', parcial: 'neutro', pouco: 'preocupado', inadequada: 'triste' };

export function Missao({ ir, missaoId }: { ir: Ir; missaoId: string }) {
  const { jogador, registrarTentativa, registrarComparacao } = useJogo();
  const avisar = useAvisos();
  const m = missaoPorId(missaoId)!;

  // A ordem das alternativas é sorteada a cada tentativa, para evitar que a posição vire pista.
  const [ordem] = useState<Record<string, Opcao[]>>(() => Object.fromEntries(m.etapas.map((e) => [e.id, embaralhar(e.opcoes)])));
  const [inicio] = useState(() => new Date().toISOString());
  const [etapaIdx, setEtapaIdx] = useState(0);
  const [fase, setFase] = useState<Fase>('situacao');
  const [falaIdx, setFalaIdx] = useState(0);
  const [escolhas, setEscolhas] = useState<EscolhaRegistrada[]>([]);
  const [escolhida, setEscolhida] = useState<Opcao | null>(null);
  const [medidor, setMedidor] = useState(MEDIDOR_INICIAL);
  const [delta, setDelta] = useState<{ v: number; k: number } | null>(null);
  const [comparar, setComparar] = useState(false);
  const [comparou, setComparou] = useState<Record<string, boolean>>({});
  const [sair, setSair] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  const etapa = m.etapas[etapaIdx];
  const apelido = jogador?.apelido ?? 'estudante';
  const falas: Fala[] = fase === 'situacao' ? etapa.situacao : fase === 'consequencia' && escolhida ? escolhida.consequencia : [];
  const falaAtual = falas[falaIdx];

  // Falas já exibidas nesta etapa: definem quem está em cena e com qual expressão.
  const exibidas = useMemo(() => {
    const sit = fase === 'situacao' ? etapa.situacao.slice(0, falaIdx + 1) : etapa.situacao;
    const cons = escolhida && (fase === 'consequencia' || fase === 'feedback')
      ? escolhida.consequencia.slice(0, fase === 'consequencia' ? falaIdx + 1 : undefined)
      : [];
    return [...sit, ...cons];
  }, [etapa, fase, falaIdx, escolhida]);

  const { elenco, humores } = useMemo(() => {
    const ordemIds: string[] = [];
    const h: Record<string, Humor> = {};
    exibidas.forEach((f) => {
      if (f.quem === 'narrador' || f.quem === 'jogador') return;
      const i = ordemIds.indexOf(f.quem);
      if (i >= 0) ordemIds.splice(i, 1);
      ordemIds.push(f.quem);
      h[f.quem] = f.humor ?? 'neutro';
    });
    const ids = ordemIds.length ? ordemIds.slice(-2) : [m.personagens[0]];
    return { elenco: ids, humores: h };
  }, [exibidas, m.personagens]);

  const falando = fase === 'escolha' ? 'jogador' : falaAtual?.quem ?? (fase === 'feedback' ? 'narrador' : null);

  const avancar = useCallback(() => {
    if (fase === 'situacao') {
      if (falaIdx < etapa.situacao.length - 1) setFalaIdx((i) => i + 1);
      else { setFase('escolha'); setFalaIdx(0); }
    } else if (fase === 'consequencia' && escolhida) {
      if (falaIdx < escolhida.consequencia.length - 1) setFalaIdx((i) => i + 1);
      else setFase('feedback');
    }
  }, [fase, falaIdx, etapa, escolhida]);

  const escolher = useCallback((o: Opcao) => {
    setEscolhida(o);
    setEscolhas((es) => [...es, { etapaId: etapa.id, opcaoId: o.id, nivel: o.nivel }]);
    setMedidor((v) => Math.max(0, Math.min(100, v + MEDIDOR_DELTA[o.nivel])));
    setDelta({ v: MEDIDOR_DELTA[o.nivel], k: Date.now() });
    setFase('consequencia');
    setFalaIdx(0);
    setComparar(false);
  }, [etapa]);

  const proxima = useCallback(() => {
    if (etapaIdx < m.etapas.length - 1) {
      setEtapaIdx((i) => i + 1);
      setFase('situacao');
      setFalaIdx(0);
      setEscolhida(null);
      setComparar(false);
      return;
    }
    const xp = escolhas.reduce((s, e) => s + XP_POR_NIVEL[e.nivel], 0);
    const tentativa: Tentativa = {
      missaoId: m.id,
      inicio,
      fim: new Date().toISOString(),
      escolhas,
      xp,
      aproveitamento: (xp / XP_MAX_MISSAO(m)) * 100,
      medidorFinal: medidor,
    };
    const registro = registrarTentativa(tentativa);
    ir({ nome: 'resultado', tentativa, registro });
  }, [etapaIdx, m, escolhas, inicio, medidor, registrarTentativa, ir]);

  const abrirComparacao = () => {
    const abrir = !comparar;
    setComparar(abrir);
    if (abrir && !comparou[etapa.id]) {
      setComparou((c) => ({ ...c, [etapa.id]: true }));
      const novas = registrarComparacao();
      novas.forEach((id) => avisar(`Conquista: ${CONQUISTAS.find((c) => c.id === id)?.nome}`, 'conquista'));
    }
  };

  // Teclado: Enter/Espaço/seta para avançar falas; 1 a 4 para escolher.
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (sair) return;
      const alvo = ev.target as HTMLElement;
      if (alvo && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(alvo.tagName)) return;
      if ((fase === 'situacao' || fase === 'consequencia') && (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'ArrowRight')) {
        ev.preventDefault();
        avancar();
      } else if (fase === 'escolha' && /^[1-4]$/.test(ev.key)) {
        escolher(ordem[etapa.id][Number(ev.key) - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fase, avancar, escolher, ordem, etapa, sair]);

  // Mantém a área de interação visível em telas pequenas.
  useEffect(() => {
    if (fase === 'escolha' || fase === 'feedback') {
      areaRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [fase, etapaIdx]);

  if (!jogador) return null;
  const cena = etapa.cena ?? m.cena;
  const humorJogador: Humor = escolhida && (fase === 'consequencia' || fase === 'feedback') ? HUMOR_JOGADOR[escolhida.nivel] : fase === 'escolha' ? 'preocupado' : 'neutro';
  const narrando = falando === 'narrador';

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6">
      {/* Barra superior */}
      <div className="flex items-center gap-3 mb-3">
        <button className="btn btn-ghost px-3" onClick={() => setSair(true)} aria-label="Sair da missão">
          <Icone nome="fechar" className="w-4 h-4" /> <span className="hidden sm:inline">Sair</span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-lg leading-tight truncate">{m.titulo}</p>
          <ChipEixo eixo={m.eixo} texto={m.habilidade} />
        </div>
        <div className="text-right">
          <p className="label text-ink2">Etapa</p>
          <p className="font-display font-bold text-xl tnum">{etapaIdx + 1}<span className="text-ink2">/{m.etapas.length}</span></p>
        </div>
      </div>

      {/* Cenário */}
      <div className="relative w-full aspect-[16/11] min-[480px]:aspect-[16/9] sm:aspect-[16/8] max-h-[52vh] rounded-2xl overflow-hidden border border-line bg-surface2">
        <div key={cena} className="absolute inset-0 anim-surge">
          <Cena cena={cena} className="absolute inset-0 w-full h-full" />
        </div>
        <span className="absolute right-3 top-3 rounded-md bg-surface/90 px-2 py-1 font-mono text-[11px] sm:text-xs text-ink2 max-w-[70%] truncate">{m.local}</span>

        {/* Jogador */}
        <div className={`ator absolute bottom-0 left-[2%] h-[70%] sm:h-[84%] aspect-[120/150] ${falando === 'jogador' ? 'z-10' : ''}`} data-falando={String(falando === 'jogador' || narrando)}>
          <Avatar aparencia={jogador.aparencia} humor={humorJogador} className="w-full h-full" titulo={`Você (${apelido})`} />
        </div>

        {/* Personagens em cena */}
        <div className="absolute bottom-0 right-[1%] h-[70%] sm:h-[84%] flex items-end justify-end">
          {elenco.map((id) => (
            <div key={id} className={`ator h-full aspect-[120/150] -ml-[10%] first:ml-0 anim-sobe ${falando === id ? 'relative z-10' : ''}`} data-falando={String(falando === id || narrando)}>
              <Avatar aparencia={PERSONAGENS[id].aparencia} humor={humores[id] ?? 'neutro'} className="w-full h-full" titulo={PERSONAGENS[id].nome} />
            </div>
          ))}
        </div>
      </div>

      {/* Medidor */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <span className="label text-ink2">{m.medidor}</span>
          <span className="relative font-bold tnum text-sm">
            {Math.round(medidor)}<span className="text-ink2 font-normal">/100</span>
            {delta && (
              <span key={delta.k} className="anim-brilho absolute right-0 -top-5 text-xs font-bold" style={{ color: `rgb(var(--${delta.v >= 0 ? 'ok' : 'bad'}))` }}>
                {delta.v > 0 ? `+${delta.v}` : delta.v}
              </span>
            )}
          </span>
        </div>
        <Barra valor={medidor} cor={medidor >= 60 ? 'ok' : medidor >= 40 ? 'mid' : 'bad'} rotulo={m.medidor} />
      </div>

      {/* Área de interação */}
      <div ref={areaRef} className="mt-3 scroll-mb-4">
        {escolhida && (fase === 'consequencia' || fase === 'feedback') && (
          <div className="mb-3 rounded-xl border border-line bg-surface2 px-4 py-2.5 text-sm">
            <span className="label text-ink2 mr-2">Sua conduta</span>
            {comNome(escolhida.texto, apelido)}
          </div>
        )}

        {(fase === 'situacao' || fase === 'consequencia') && falaAtual && (
          <CaixaDialogo key={`${etapa.id}-${fase}-${falaIdx}`} fala={falaAtual} apelido={apelido} total={falas.length} indice={falaIdx} onAvancar={avancar} />
        )}

        {fase === 'escolha' && (
          <div className="card p-4 sm:p-5 anim-sobe">
            <p className="label text-brand">Sua decisão</p>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 mb-4">{comNome(etapa.desafio, apelido)}</h2>
            <div className="grid gap-2.5">
              {ordem[etapa.id].map((o, i) => (
                <button key={o.id} onClick={() => escolher(o)}
                  className="group flex items-start gap-3 text-left rounded-xl border border-line bg-surface px-3.5 py-3 hover:border-brand hover:bg-brand-soft/40 transition-colors">
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-lg bg-surface2 font-mono font-bold text-ink2 group-hover:bg-brand group-hover:text-brand-ink transition-colors">{'ABCD'[i]}</span>
                  <span className="pt-0.5">{comNome(o.texto, apelido)}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-ink2 mt-3 hidden sm:block">Atalho: teclas 1 a 4.</p>
          </div>
        )}

        {fase === 'feedback' && escolhida && (
          <div className="card p-4 sm:p-5 anim-sobe">
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <SeloNivel nivel={escolhida.nivel} />
              <span className="font-bold tnum" style={{ color: `rgb(var(--${COR_NIVEL[escolhida.nivel]}))` }}>+{XP_POR_NIVEL[escolhida.nivel]} XP</span>
            </div>
            <h2 className="text-lg font-bold mt-3">Por quê?</h2>
            <p className="mt-1 text-[1.05rem] max-w-[68ch]">{comNome(escolhida.feedback, apelido)}</p>

            <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand" onClick={abrirComparacao} aria-expanded={comparar}>
              <Icone nome="lupa" className="w-4 h-4" /> {comparar ? 'Ocultar as outras condutas' : 'Comparar com as outras condutas'}
            </button>
            {comparar && (
              <ul className="mt-3 space-y-2">
                {ordem[etapa.id].map((o) => (
                  <li key={o.id} className={`rounded-xl border p-3 ${o.id === escolhida.id ? 'border-brand' : 'border-line'}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <SeloNivel nivel={o.nivel} curto />
                      {o.id === escolhida.id && <span className="label text-brand">sua escolha</span>}
                    </div>
                    <p className="font-bold text-sm">{comNome(o.texto, apelido)}</p>
                    <p className="text-sm text-ink2 mt-1">{comNome(o.feedback, apelido)}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex justify-end">
              <BotaoFocado className="btn btn-primary" onClick={proxima}>
                {etapaIdx < m.etapas.length - 1 ? 'Próxima etapa' : 'Ver resultado da missão'} <Icone nome="avancar" className="w-4 h-4" />
              </BotaoFocado>
            </div>
          </div>
        )}
      </div>

      <Confirmacao
        aberto={sair}
        titulo="Sair da missão?"
        texto="As escolhas desta tentativa não serão salvas. Você pode recomeçar a missão quando quiser."
        confirmar="Sair"
        cancelar="Continuar jogando"
        onConfirmar={() => ir({ nome: 'briefing', missaoId: m.id })}
        onCancelar={() => setSair(false)}
      />
    </div>
  );
}

function CaixaDialogo({ fala, apelido, total, indice, onAvancar }: { fala: Fala; apelido: string; total: number; indice: number; onAvancar: () => void }) {
  const narrador = fala.quem === 'narrador';
  const p = !narrador && fala.quem !== 'jogador' ? PERSONAGENS[fala.quem] : null;
  const ultimo = indice === total - 1;
  return (
    <div className="card p-4 sm:p-5 anim-sobe" aria-live="polite">
      <div className="flex items-center justify-between gap-3 mb-2">
        {narrador ? (
          <span className="label text-ink2">Narração</span>
        ) : (
          <span className="min-w-0">
            <span className="font-display font-bold text-lg">{p?.nome ?? 'Você'}</span>
            {p && <span className="text-sm text-ink2"> · {p.papel}</span>}
          </span>
        )}
        <span className="flex gap-1 shrink-0" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= indice ? 'bg-brand' : 'bg-line'}`} />
          ))}
        </span>
      </div>
      <p className={`text-[1.08rem] leading-relaxed max-w-[68ch] ${narrador ? 'italic text-ink2' : ''}`}>
        {narrador ? comNome(fala.texto, apelido) : <>&ldquo;{comNome(fala.texto, apelido)}&rdquo;</>}
      </p>
      <div className="mt-4 flex justify-end">
        <BotaoFocado className="btn btn-primary" onClick={onAvancar} data-acao="continuar">
          {ultimo ? 'Continuar' : 'Avançar'} <Icone nome="avancar" className="w-4 h-4" />
        </BotaoFocado>
      </div>
    </div>
  );
}

/** Botão que recebe o foco ao aparecer, sem rolar a página (útil para teclado e leitores de tela). */
function BotaoFocado(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { 'data-acao'?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); }, []);
  return <button ref={ref} {...props} />;
}
