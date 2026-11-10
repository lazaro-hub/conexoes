import React, { createContext, useCallback, useContext, useState } from 'react';
import type { EixoId, Nivel } from '../types';
import type { Medalha } from '../data';
import { ROTULO_NIVEL } from '../data';

/* ---------- Ícones ---------- */
const CAMINHOS: Record<string, React.ReactNode> = {
  voltar: <path d="M15 18l-6-6 6-6" />,
  avancar: <path d="M9 6l6 6-6 6" />,
  cadeado: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  repetir: (<><path d="M4 12a8 8 0 0114-5.3L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 01-14 5.3L4 15" /><path d="M4 20v-5h5" /></>),
  mapa: (<><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>),
  grafico: (<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>),
  trofeu: (<><path d="M8 4h8v5a4 4 0 01-8 0V4z" /><path d="M8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8 20h8" /></>),
  historico: (<><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>),
  sair: (<><path d="M15 4h4v16h-4" /><path d="M10 8l-4 4 4 4M6 12h10" /></>),
  copiar: (<><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" /></>),
  baixar: (<><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></>),
  importar: (<><path d="M12 15V4M7 9l5-5 5 5M5 20h14" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>),
  lupa: (<><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>),
  pessoa: (<><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0116 0" /></>),
  escudo: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />,
  lixo: (<><path d="M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13" /></>),
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
  estrela: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8z" />,
  balao: <path d="M4 5h16v11H9l-5 4V5z" />,
  pegada: (<><path d="M8 14c-2 0-3-2-3-4.5S6 4 8 4s3 2.5 3 5-1 5-3 5zM16 20c-2 0-3-2-3-4.5S14 10 16 10s3 2.5 3 5-1 5-3 5z" /></>),
  sequencia: (<><path d="M4 17l5-5 4 4 7-8" /><path d="M15 8h5v5" /></>),
};

export function Icone({ nome, className = 'w-5 h-5', titulo }: { nome: keyof typeof CAMINHOS | string; className?: string; titulo?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role={titulo ? 'img' : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      {CAMINHOS[nome] ?? CAMINHOS.info}
    </svg>
  );
}

/* ---------- Barra de progresso ---------- */
export function Barra({ valor, cor = 'brand', className = '', altura = 'h-2.5', rotulo }: { valor: number; cor?: string; className?: string; altura?: string; rotulo?: string }) {
  const v = Math.max(0, Math.min(100, valor));
  return (
    <div className={`w-full ${altura} rounded-full bg-surface2 overflow-hidden ${className}`} role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100} aria-label={rotulo}>
      <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${v}%`, background: `rgb(var(--${cor}))` }} />
    </div>
  );
}

/* ---------- Medalha ---------- */
const COR_MEDALHA: Record<Medalha, string> = { ouro: 'gold', prata: 'silver', bronze: 'bronze', participacao: 'ink-2' };

export function MedalhaIcone({ tipo, className = 'w-8 h-8' }: { tipo: Medalha | null; className?: string }) {
  if (!tipo) {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <circle cx="20" cy="22" r="13" fill="none" stroke="rgb(var(--line))" strokeWidth="2.5" strokeDasharray="4 4" />
      </svg>
    );
  }
  const cor = `rgb(var(--${COR_MEDALHA[tipo]}))`;
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M13 2h6l3 10h-6z" fill="rgb(var(--e2) / .8)" />
      <path d="M27 2h-6l-3 10h6z" fill="rgb(var(--e4) / .8)" />
      <circle cx="20" cy="24" r="13" fill={cor} />
      <circle cx="20" cy="24" r="9.5" fill="none" stroke="rgb(var(--surface) / .55)" strokeWidth="1.5" />
      {tipo === 'participacao' ? (
        <path d="M15 24.5l3.5 3.5 7-7" fill="none" stroke="rgb(var(--surface))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M20 17l2 4.2 4.6.6-3.3 3.2.8 4.6-4.1-2.2-4.1 2.2.8-4.6-3.3-3.2 4.6-.6z" fill="rgb(var(--surface) / .9)" />
      )}
    </svg>
  );
}

/* ---------- Rótulos ---------- */
export const COR_NIVEL: Record<Nivel, string> = { adequada: 'ok', parcial: 'mid', pouco: 'low', inadequada: 'bad' };

export function SeloNivel({ nivel, curto = false }: { nivel: Nivel; curto?: boolean }) {
  const cor = COR_NIVEL[nivel];
  const curtos: Record<Nivel, string> = { adequada: 'Mais adequada', parcial: 'Parcialmente adequada', pouco: 'Pouco adequada', inadequada: 'Inadequada' };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: `rgb(var(--${cor}) / .14)`, color: `rgb(var(--${cor}))` }}>
      <span className="w-2 h-2 rounded-full" style={{ background: `rgb(var(--${cor}))` }} />
      {curto ? curtos[nivel] : ROTULO_NIVEL[nivel]}
    </span>
  );
}

export function ChipEixo({ eixo, texto }: { eixo: EixoId; texto: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 label" style={{ background: `rgb(var(--${eixo}) / .13)`, color: `rgb(var(--${eixo}))` }}>
      {texto}
    </span>
  );
}

/* ---------- Avisos rápidos ---------- */
interface Aviso { id: number; texto: string; tipo: 'ok' | 'info' | 'conquista' }
const AvisoCtx = createContext<(texto: string, tipo?: Aviso['tipo']) => void>(() => {});

export function ProvedorAvisos({ children }: { children: React.ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const avisar = useCallback((texto: string, tipo: Aviso['tipo'] = 'ok') => {
    const id = Date.now() + Math.random();
    setAvisos((a) => [...a, { id, texto, tipo }]);
    setTimeout(() => setAvisos((a) => a.filter((x) => x.id !== id)), 3800);
  }, []);
  return (
    <AvisoCtx.Provider value={avisar}>
      {children}
      <div className="fixed z-50 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none gutter" style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }} aria-live="polite">
        {avisos.map((a) => (
          <div key={a.id} className="anim-sobe pointer-events-auto max-w-md w-full card shadow-lg px-4 py-3 flex items-center gap-3">
            <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full" style={{ background: `rgb(var(--${a.tipo === 'conquista' ? 'accent' : a.tipo === 'ok' ? 'ok' : 'mid'}) / .18)`, color: `rgb(var(--${a.tipo === 'conquista' ? 'accent' : a.tipo === 'ok' ? 'ok' : 'mid'}))` }}>
              <Icone nome={a.tipo === 'conquista' ? 'trofeu' : a.tipo === 'ok' ? 'check' : 'info'} className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold">{a.texto}</span>
          </div>
        ))}
      </div>
    </AvisoCtx.Provider>
  );
}

export const useAvisos = () => useContext(AvisoCtx);

/* ---------- Diálogo de confirmação dentro da página ---------- */
export function Confirmacao({ aberto, titulo, texto, confirmar, cancelar = 'Cancelar', perigo = false, onConfirmar, onCancelar }: {
  aberto: boolean; titulo: string; texto: string; confirmar: string; cancelar?: string; perigo?: boolean; onConfirmar: () => void; onCancelar: () => void;
}) {
  if (!aberto) return null;
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-ink/40 gutter" role="dialog" aria-modal="true" aria-labelledby="conf-titulo">
      <div className="card anim-surge w-full max-w-sm p-5 shadow-2xl">
        <h2 id="conf-titulo" className="text-xl font-bold mb-2">{titulo}</h2>
        <p className="text-ink2 mb-5">{texto}</p>
        <div className="flex flex-wrap gap-2 justify-end">
          <button className="btn btn-ghost" onClick={onCancelar} autoFocus>{cancelar}</button>
          <button className={`btn ${perigo ? 'btn-danger' : 'btn-primary'}`} onClick={onConfirmar}>{confirmar}</button>
        </div>
      </div>
    </div>
  );
}
