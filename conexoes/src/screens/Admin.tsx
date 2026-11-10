import React, { useMemo, useState } from 'react';
import { Confirmacao, Icone, COR_NIVEL, useAvisos } from '../components/ui';
import { EIXOS, MISSOES, ROTULO_NIVEL } from '../data';
import { CODIGO_PESQUISADOR } from '../lib/config';
import { gerarCSV } from '../lib/csv';
import { lerCodigoEnvio } from '../lib/codigo';
import { primeiraTentativa, melhorTentativa } from '../lib/progresso';
import { copiar, dataCurta, pct } from '../lib/util';
import { useJogo } from '../state/jogo';
import type { JogadorSalvo } from '../lib/storage';
import type { EixoId, Nivel } from '../types';
import type { Ir } from '../nav';

const NIVEIS: Nivel[] = ['adequada', 'parcial', 'pouco', 'inadequada'];

export function Admin({ ir }: { ir: Ir }) {
  const [liberado, setLiberado] = useState(false);
  const [pin, setPin] = useState('');
  const [erro, setErro] = useState('');

  if (!liberado) {
    return (
      <div className="max-w-md mx-auto py-10">
        <button className="btn btn-ghost mb-5" onClick={() => ir({ nome: 'inicio' })}><Icone nome="voltar" className="w-4 h-4" /> Início</button>
        <form className="card p-6 anim-sobe" onSubmit={(e) => {
          e.preventDefault();
          if (pin.trim().toUpperCase() === CODIGO_PESQUISADOR) { setLiberado(true); setErro(''); } else setErro('Código de acesso incorreto.');
        }}>
          <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-soft text-brand mb-4"><Icone nome="escudo" className="w-6 h-6" /></span>
          <h1 className="text-2xl font-bold">Área do pesquisador</h1>
          <p className="text-ink2 mt-1 mb-5">Resultados das missões e desempenho por eixo dos participantes.</p>
          <label htmlFor="campo-pin" className="block font-bold mb-1">Código de acesso</label>
          <input id="campo-pin" type="password" className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-mono" value={pin} onChange={(e) => setPin(e.target.value)} autoComplete="off" />
          {erro && <p className="text-sm font-bold text-bad mt-2" role="alert">{erro}</p>}
          <button type="submit" className="btn btn-primary w-full mt-5">Entrar</button>
        </form>
      </div>
    );
  }
  return <Painel ir={ir} />;
}

function Painel({ ir }: { ir: Ir }) {
  const { banco, definirConfig, importar, removerJogador, apagarTudo } = useJogo();
  const avisar = useAvisos();
  const [codigoImport, setCodigoImport] = useState('');
  const [erroImport, setErroImport] = useState('');
  const [confirmarApagar, setConfirmarApagar] = useState(false);
  const [remover, setRemover] = useState<string | null>(null);
  const jogadores = useMemo(() => Object.values(banco.jogadores), [banco]);
  const comDados = jogadores.filter((j) => j.tentativas.length > 0);

  const porMissao = useMemo(() => MISSOES.map((m) => {
    const prim = comDados.map((j) => primeiraTentativa(j, m.id)).filter(Boolean);
    const dist: Record<Nivel, number> = { adequada: 0, parcial: 0, pouco: 0, inadequada: 0 };
    prim.forEach((t) => t!.escolhas.forEach((e) => { dist[e.nivel]++; }));
    const totalDec = NIVEIS.reduce((s, n) => s + dist[n], 0);
    const tentativas = comDados.reduce((s, j) => s + j.tentativas.filter((t) => t.missaoId === m.id).length, 0);
    const media1 = prim.length ? prim.reduce((s, t) => s + t!.aproveitamento, 0) / prim.length : null;
    return { m, concluiram: prim.length, tentativas, dist, totalDec, media1 };
  }), [comDados]);

  const porEixo = useMemo(() => EIXOS.map((e) => {
    const linhas = porMissao.filter((x) => x.m.eixo === e.id);
    const dist: Record<Nivel, number> = { adequada: 0, parcial: 0, pouco: 0, inadequada: 0 };
    linhas.forEach((l) => NIVEIS.forEach((n) => { dist[n] += l.dist[n]; }));
    const totalDec = NIVEIS.reduce((s, n) => s + dist[n], 0);
    const medias = (base: 'primeira' | 'melhor') => {
      const vals = comDados.map((j) => mediaEixo(j, e.id, base)).filter((v): v is number => v !== null);
      return vals.length ? { v: vals.reduce((s, x) => s + x, 0) / vals.length, n: vals.length } : null;
    };
    return { e, dist, totalDec, primeira: medias('primeira'), melhor: medias('melhor') };
  }), [porMissao, comDados]);

  async function exportar() {
    const csv = gerarCSV(comDados);
    const nome = `conexoes-resultados-${new Date().toISOString().slice(0, 10)}.csv`;
    try {
      const dl = await (window as any).claude?.use?.('downloads');
      if (dl) {
        await dl.save({ filename: nome, data: csv });
        avisar('Arquivo CSV salvo');
        return;
      }
    } catch (e: any) {
      if (e?.code === 'declined') return;
    }
    // Fora do Claude (ou sem permissão de download): usa download do navegador ou copia.
    try {
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = nome; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch { /* ignora */ }
    const ok = await copiar(csv);
    avisar(ok ? 'CSV copiado. Cole em uma planilha se o download não começar.' : 'Não foi possível copiar o CSV neste navegador.', ok ? 'ok' : 'info');
  }

  function fazerImport() {
    try {
      const imp = lerCodigoEnvio(codigoImport);
      const r = importar(imp);
      setErroImport('');
      setCodigoImport('');
      avisar(r === 'novo' ? `Resultados de ${imp.codigo} importados` : `Resultados de ${imp.codigo} atualizados`);
    } catch (e: any) {
      setErroImport(e?.message || 'Não foi possível ler o código.');
    }
  }

  const nDisp = jogadores.filter((j) => j.origem === 'dispositivo').length;
  const nImp = jogadores.length - nDisp;
  const totalTent = comDados.reduce((s, j) => s + j.tentativas.length, 0);
  const totalConcl = comDados.reduce((s, j) => s + new Set(j.tentativas.map((t) => t.missaoId)).size, 0);

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-8">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button className="btn btn-ghost" onClick={() => ir({ nome: 'inicio' })}><Icone nome="voltar" className="w-4 h-4" /> Início</button>
        <h1 className="text-3xl sm:text-4xl font-extrabold mr-auto">Área do pesquisador</h1>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-mid/50 bg-mid/5 p-4 sm:p-5 flex gap-3">
        <Icone nome="info" className="w-5 h-5 text-mid shrink-0 mt-0.5" />
        <div className="text-sm max-w-[90ch]">
          <p className="font-bold">Indicadores do jogo, separados do instrumento da pesquisa.</p>
          <p className="text-ink2 mt-1">
            Os dados abaixo usam a escala interna do jogo (XP e aproveitamento em %). Eles não equivalem ao escore do instrumento pré e pós-teste
            (18 questões, 0 a 54 pontos) e não o substituem. As questões e o gabarito do instrumento não fazem parte do jogo. A classificação das
            condutas nas missões é uma proposta pedagógica e, assim como a matriz do instrumento, precisa de validação.
          </p>
          <p className="text-ink2 mt-1">
            Fonte: participantes que jogaram <strong>neste navegador</strong> ({nDisp}) e resultados <strong>importados</strong> por código de envio ({nImp}).
          </p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ['Participantes com dados', comDados.length],
          ['Missões concluídas', totalConcl],
          ['Tentativas registradas', totalTent],
          ['Decisões registradas', comDados.reduce((s, j) => s + j.tentativas.reduce((a, t) => a + t.escolhas.length, 0), 0)],
        ].map(([r, v]) => (
          <div key={r as string} className="card p-4">
            <dt className="label text-ink2">{r}</dt>
            <dd className="font-display text-3xl font-bold tnum mt-1">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-1">Desempenho por eixo</h2>
        <p className="text-sm text-ink2 mb-3">Média, entre participantes, do aproveitamento nas missões concluídas do eixo. A 1ª tentativa reflete a decisão antes do feedback.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {porEixo.map(({ e, dist, totalDec, primeira, melhor }) => (
            <div key={e.id} className="card p-4">
              <p className="font-bold">Eixo {e.numero} · {e.nome}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Indicador rotulo="1ª tentativa" valor={primeira ? pct(primeira.v) : 'sem dados'} n={primeira?.n} cor={e.id} />
                <Indicador rotulo="Melhor tentativa" valor={melhor ? pct(melhor.v) : 'sem dados'} n={melhor?.n} cor={e.id} />
              </div>
              <p className="label text-ink2 mt-4 mb-1">Condutas escolhidas na 1ª tentativa</p>
              <Distribuicao dist={dist} total={totalDec} />
            </div>
          ))}
        </div>
        <Legenda />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Resultados por missão</h2>
        <div className="card scroll-x">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left border-b border-line">
                <th className="p-3 label text-ink2">Habilidade</th>
                <th className="p-3 label text-ink2 text-right">Concluíram</th>
                <th className="p-3 label text-ink2 text-right">Tentativas</th>
                <th className="p-3 label text-ink2 text-right">Média 1ª tent.</th>
                <th className="p-3 label text-ink2 w-[38%]">Condutas na 1ª tentativa</th>
              </tr>
            </thead>
            <tbody>
              {porMissao.map(({ m, concluiram, tentativas, dist, totalDec, media1 }) => (
                <tr key={m.id} className="border-b border-line last:border-0">
                  <td className="p-3">
                    <span className="font-mono font-bold mr-2" style={{ color: `rgb(var(--${m.eixo}))` }}>{String(m.numero).padStart(2, '0')}</span>
                    <span className="font-bold">{m.habilidade}</span>
                    <span className="block text-xs text-ink2">{m.titulo}</span>
                  </td>
                  <td className="p-3 text-right tnum">{concluiram}</td>
                  <td className="p-3 text-right tnum">{tentativas}</td>
                  <td className="p-3 text-right tnum">{media1 === null ? '-' : pct(media1)}</td>
                  <td className="p-3"><Distribuicao dist={dist} total={totalDec} compacto /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Participantes</h2>
        {jogadores.length === 0 ? (
          <div className="card p-6 text-center text-ink2">
            Nenhum participante ainda. Os dados aparecem aqui quando alguém joga neste navegador ou quando você importa um código de envio.
          </div>
        ) : (
          <div className="card scroll-x">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="text-left border-b border-line">
                  <th className="p-3 label text-ink2">Código</th>
                  <th className="p-3 label text-ink2">Apelido</th>
                  <th className="p-3 label text-ink2">Origem</th>
                  <th className="p-3 label text-ink2 text-right">Missões</th>
                  {EIXOS.map((e) => <th key={e.id} className="p-3 label text-right" style={{ color: `rgb(var(--${e.id}))` }}>Eixo {e.numero}</th>)}
                  <th className="p-3 label text-ink2">Última atividade</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {jogadores.map((j) => {
                  const ult = j.tentativas.length ? j.tentativas[j.tentativas.length - 1].fim : j.criadoEm;
                  return (
                    <tr key={j.codigo} className="border-b border-line last:border-0">
                      <td className="p-3 font-mono font-bold">{j.codigo}</td>
                      <td className="p-3">{j.apelido}</td>
                      <td className="p-3 text-ink2">{j.origem === 'dispositivo' ? 'Este navegador' : 'Importado'}</td>
                      <td className="p-3 text-right tnum">{new Set(j.tentativas.map((t) => t.missaoId)).size}/18</td>
                      {EIXOS.map((e) => {
                        const v = mediaEixo(j, e.id, 'primeira');
                        return <td key={e.id} className="p-3 text-right tnum">{v === null ? '-' : pct(v)}</td>;
                      })}
                      <td className="p-3 text-ink2 tnum">{dataCurta(ult)}</td>
                      <td className="p-3 text-right">
                        <button className="text-ink2 hover:text-bad" aria-label={`Remover ${j.codigo}`} onClick={() => setRemover(j.codigo)}><Icone nome="lixo" className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-ink2 px-3 pb-3">Percentuais por eixo: média da 1ª tentativa nas missões concluídas do eixo.</p>
          </div>
        )}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-bold">Exportar dados</h2>
          <p className="text-sm text-ink2 mt-1 mb-4">Arquivo CSV com uma linha por decisão (participante, missão, etapa, conduta, datas), separado por ponto e vírgula.</p>
          <button className="btn btn-primary" onClick={exportar} disabled={comDados.length === 0}><Icone nome="baixar" className="w-4 h-4" /> Exportar CSV</button>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-bold">Importar resultados de um participante</h2>
          <p className="text-sm text-ink2 mt-1 mb-3">Cole o código que o participante gerou em Progresso, começando por CNX1.</p>
          <label htmlFor="campo-import" className="sr-only">Código de envio</label>
          <textarea id="campo-import" className="w-full h-24 rounded-xl border border-line bg-surface p-3 font-mono text-xs" value={codigoImport} onChange={(e) => setCodigoImport(e.target.value)} placeholder="CNX1.eyJjIjoi..." />
          {erroImport && <p className="text-sm font-bold text-bad mt-1" role="alert">{erroImport}</p>}
          <button className="btn btn-ghost mt-3" onClick={fazerImport} disabled={!codigoImport.trim()}><Icone nome="importar" className="w-4 h-4" /> Importar</button>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-bold">Acesso às missões neste dispositivo</h2>
          <p className="text-sm text-ink2 mt-1 mb-4">Por padrão, as missões são liberadas em sequência. Libere todas para demonstrações ou para aplicar missões específicas.</p>
          <label className="inline-flex items-center gap-3 font-bold cursor-pointer">
            <input id="campo-liberar" type="checkbox" className="w-5 h-5 accent-[rgb(var(--brand))]" checked={banco.config.liberarTudo} onChange={(e) => definirConfig({ liberarTudo: e.target.checked })} />
            Liberar todas as missões
          </label>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-bold">Apagar dados deste dispositivo</h2>
          <p className="text-sm text-ink2 mt-1 mb-4">Remove participantes, progresso e resultados importados deste navegador. Exporte o CSV antes, se precisar dos dados.</p>
          <button className="btn btn-danger" onClick={() => setConfirmarApagar(true)} disabled={jogadores.length === 0}><Icone nome="lixo" className="w-4 h-4" /> Apagar tudo</button>
        </div>
      </section>

      <Confirmacao aberto={confirmarApagar} perigo titulo="Apagar todos os dados?" texto="Esta ação remove todos os participantes e resultados deste navegador e não pode ser desfeita." confirmar="Apagar tudo"
        onConfirmar={() => { apagarTudo(); setConfirmarApagar(false); avisar('Dados apagados'); }} onCancelar={() => setConfirmarApagar(false)} />
      <Confirmacao aberto={!!remover} perigo titulo={`Remover ${remover ?? ''}?`} texto="O progresso e os resultados deste participante serão removidos deste navegador." confirmar="Remover"
        onConfirmar={() => { if (remover) removerJogador(remover); setRemover(null); avisar('Participante removido'); }} onCancelar={() => setRemover(null)} />
    </div>
  );
}

function mediaEixo(j: JogadorSalvo, eixo: EixoId, base: 'primeira' | 'melhor'): number | null {
  const vals = MISSOES.filter((m) => m.eixo === eixo)
    .map((m) => (base === 'primeira' ? primeiraTentativa(j, m.id) : melhorTentativa(j, m.id)))
    .filter(Boolean)
    .map((t) => t!.aproveitamento);
  return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : null;
}

function Indicador({ rotulo, valor, n, cor }: { rotulo: string; valor: string; n?: number; cor: string }) {
  return (
    <div className="rounded-xl bg-surface2 p-3">
      <p className="label text-ink2">{rotulo}</p>
      <p className="font-display text-2xl font-bold tnum" style={{ color: `rgb(var(--${cor}))` }}>{valor}</p>
      {n !== undefined && <p className="text-xs text-ink2 tnum">n = {n}</p>}
    </div>
  );
}

function Distribuicao({ dist, total, compacto = false }: { dist: Record<Nivel, number>; total: number; compacto?: boolean }) {
  if (!total) return <p className="text-xs text-ink2">sem dados</p>;
  return (
    <div>
      <div className={`flex w-full overflow-hidden rounded-full bg-surface2 ${compacto ? 'h-2.5' : 'h-3.5'}`} role="img"
        aria-label={NIVEIS.map((n) => `${ROTULO_NIVEL[n]}: ${pct((dist[n] / total) * 100)}`).join('; ')}>
        {NIVEIS.map((n) => dist[n] > 0 && <span key={n} style={{ width: `${(dist[n] / total) * 100}%`, background: `rgb(var(--${COR_NIVEL[n]}))` }} />)}
      </div>
      <p className="text-xs text-ink2 mt-1 tnum">
        {pct((dist.adequada / total) * 100)} mais adequadas · {total} {total === 1 ? 'decisão' : 'decisões'}
      </p>
    </div>
  );
}

function Legenda() {
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink2">
      {NIVEIS.map((n) => (
        <span key={n} className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: `rgb(var(--${COR_NIVEL[n]}))` }} />{ROTULO_NIVEL[n]}</span>
      ))}
    </div>
  );
}
