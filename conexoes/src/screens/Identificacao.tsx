import React, { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Icone } from '../components/ui';
import { CORES_CABELO, CORES_SCRUB, PELES } from '../data';
import { useJogo } from '../state/jogo';
import type { Aparencia, EstiloCabelo } from '../types';
import { gerarCodigo, normalizarCodigo } from '../lib/util';
import type { Ir } from '../nav';

const ESTILOS: { id: EstiloCabelo; nome: string }[] = [
  { id: 'curto', nome: 'Curto' },
  { id: 'raspado', nome: 'Raspado' },
  { id: 'longo', nome: 'Longo' },
  { id: 'coque', nome: 'Coque' },
  { id: 'cacheado', nome: 'Cacheado' },
  { id: 'tranca', nome: 'Trança' },
];

export function Identificacao({ ir, editar = false }: { ir: Ir; editar?: boolean }) {
  const { jogador, banco, criarJogador, atualizarPerfil } = useJogo();
  const [etapa, setEtapa] = useState<1 | 2>(editar ? 2 : 1);
  const [codigo, setCodigo] = useState(editar && jogador ? jogador.codigo : '');
  const [apelido, setApelido] = useState(editar && jogador ? jogador.apelido : '');
  const [ap, setAp] = useState<Aparencia>(
    editar && jogador
      ? jogador.aparencia
      : { pele: PELES[2], cabelo: 'curto', corCabelo: CORES_CABELO[0], roupa: 'scrub', corRoupa: CORES_SCRUB[0], estetoscopio: true },
  );
  const [erro, setErro] = useState('');

  const codigoFinal = normalizarCodigo(codigo);
  const existente = codigoFinal ? banco.jogadores[codigoFinal] : undefined;

  function avancar(e: React.FormEvent) {
    e.preventDefault();
    if (!apelido.trim()) return setErro('Escreva um apelido para aparecer no jogo.');
    if (!codigoFinal) return setErro('Informe o código da pesquisa ou gere um código automático.');
    if (existente && existente.origem === 'importado') return setErro('Esse código pertence a resultados importados pelo pesquisador. Use outro código.');
    setErro('');
    if (existente) setAp(existente.aparencia);
    setEtapa(2);
  }

  function concluir() {
    if (editar) {
      atualizarPerfil(apelido.trim(), ap);
      ir({ nome: 'hub', aba: 'jornada' });
      return;
    }
    criarJogador(codigoFinal, apelido.trim(), ap);
    ir({ nome: 'hub', aba: 'jornada' });
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10">
      <button className="btn btn-ghost mb-5" onClick={() => (etapa === 2 && !editar ? setEtapa(1) : ir(editar ? { nome: 'hub', aba: 'jornada' } : { nome: 'inicio' }))}>
        <Icone nome="voltar" className="w-4 h-4" /> Voltar
      </button>

      {etapa === 1 ? (
        <form onSubmit={avancar} className="card p-5 sm:p-8 anim-sobe" noValidate>
          <p className="label text-brand mb-2">Passo 1 de 2 · Identificação</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Quem está jogando?</h1>
          <p className="text-ink2 mb-6 max-w-[60ch]">
            Se você participa da pesquisa, use o código que recebeu da equipe. Assim seus resultados podem ser identificados sem o seu nome.
          </p>

          <label htmlFor="campo-codigo" className="block font-bold mb-1">Código de participante</label>
          <div className="flex flex-wrap gap-2 mb-1">
            <input
              id="campo-codigo"
              className="flex-1 min-w-[12rem] rounded-xl border border-line bg-surface px-4 py-3 font-mono uppercase tracking-wider"
              placeholder="Ex.: ENF-021"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              maxLength={24}
              autoComplete="off"
            />
            <button type="button" className="btn btn-ghost" onClick={() => setCodigo(gerarCodigo())}>Gerar código</button>
          </div>
          <p className="text-sm text-ink2 mb-5">Sem código da pesquisa? Gere um código automático.</p>
          {existente && existente.origem === 'dispositivo' && (
            <p className="text-sm rounded-lg bg-mid/10 text-mid px-3 py-2 mb-5">
              Já existe progresso com esse código neste dispositivo ({existente.apelido}). Ao continuar, você retoma esse progresso.
            </p>
          )}

          <label htmlFor="campo-apelido" className="block font-bold mb-1">Como quer ser chamado no jogo?</label>
          <input
            id="campo-apelido"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3"
            placeholder="Um apelido ou primeiro nome"
            value={apelido}
            onChange={(e) => setApelido(e.target.value.slice(0, 20))}
            autoComplete="off"
          />
          <p className="text-sm text-ink2 mt-1">Não use seu nome completo.</p>

          {erro && <p className="mt-4 text-sm font-bold text-bad" role="alert">{erro}</p>}

          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn btn-primary">Continuar <Icone nome="avancar" className="w-4 h-4" /></button>
          </div>
        </form>
      ) : (
        <div className="card p-5 sm:p-8 anim-sobe">
          <p className="label text-brand mb-2">{editar ? 'Editar personagem' : 'Passo 2 de 2 · Seu personagem'}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Monte seu crachá</h1>
          <div className="grid gap-6 sm:grid-cols-[220px_1fr] items-start">
            <div className="rounded-2xl border border-line overflow-hidden bg-surface2 mx-auto w-full max-w-[220px]">
              <div className="h-3 lanyard" />
              <div className="grid place-items-end h-52 bg-brand-soft">
                <Avatar aparencia={ap} humor="feliz" className="w-44" titulo="Prévia do seu personagem" />
              </div>
              <div className="p-3 bg-surface">
                <p className="label text-ink2">Estudante de Enfermagem</p>
                <p className="font-display font-bold text-lg truncate">{apelido || 'Seu apelido'}</p>
                <p className="font-mono text-sm text-ink2">{codigoFinal || '---'}</p>
              </div>
            </div>
            <div className="space-y-5 min-w-0">
              {editar && (
                <div>
                  <label htmlFor="campo-apelido2" className="block font-bold mb-1">Apelido</label>
                  <input id="campo-apelido2" className="w-full rounded-xl border border-line bg-surface px-4 py-2.5" value={apelido} onChange={(e) => setApelido(e.target.value.slice(0, 20))} />
                </div>
              )}
              <Grupo titulo="Tom de pele">
                {PELES.map((cor) => (
                  <Amostra key={cor} cor={cor} ativo={ap.pele === cor} rotulo={`Tom de pele ${PELES.indexOf(cor) + 1}`} onClick={() => setAp({ ...ap, pele: cor })} />
                ))}
              </Grupo>
              <Grupo titulo="Cabelo">
                {ESTILOS.map((e) => (
                  <button key={e.id} type="button" onClick={() => setAp({ ...ap, cabelo: e.id })} aria-pressed={ap.cabelo === e.id}
                    className={`px-3 py-2 rounded-lg border text-sm font-bold ${ap.cabelo === e.id ? 'border-brand bg-brand-soft text-ink' : 'border-line text-ink2 hover:bg-surface2'}`}>
                    {e.nome}
                  </button>
                ))}
              </Grupo>
              <Grupo titulo="Cor do cabelo">
                {CORES_CABELO.map((cor, i) => (
                  <Amostra key={cor} cor={cor} ativo={ap.corCabelo === cor} rotulo={`Cor de cabelo ${i + 1}`} onClick={() => setAp({ ...ap, corCabelo: cor })} />
                ))}
              </Grupo>
              <Grupo titulo="Cor do uniforme">
                {CORES_SCRUB.map((cor, i) => (
                  <Amostra key={cor} cor={cor} ativo={ap.corRoupa === cor} rotulo={`Cor do uniforme ${i + 1}`} onClick={() => setAp({ ...ap, corRoupa: cor })} />
                ))}
              </Grupo>
              <Grupo titulo="Acessórios">
                <Alternar ativo={!!ap.oculos} onClick={() => setAp({ ...ap, oculos: !ap.oculos })}>Óculos</Alternar>
                <Alternar ativo={!!ap.estetoscopio} onClick={() => setAp({ ...ap, estetoscopio: !ap.estetoscopio })}>Estetoscópio</Alternar>
              </Grupo>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="btn btn-primary text-lg px-6" onClick={concluir} disabled={!apelido.trim()}>
              {editar ? 'Salvar alterações' : 'Entrar no estágio'} <Icone nome="avancar" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="label text-ink2 mb-2">{titulo}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Amostra({ cor, ativo, rotulo, onClick }: { cor: string; ativo: boolean; rotulo: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={ativo} aria-label={rotulo}
      className={`w-10 h-10 rounded-full border-2 transition-transform ${ativo ? 'border-ink scale-110' : 'border-line hover:scale-105'}`}
      style={{ background: cor }} />
  );
}

function Alternar({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={ativo}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold ${ativo ? 'border-brand bg-brand-soft text-ink' : 'border-line text-ink2 hover:bg-surface2'}`}>
      <span className={`w-4 h-4 rounded border grid place-items-center ${ativo ? 'bg-brand border-brand text-brand-ink' : 'border-line'}`}>
        {ativo && <Icone nome="check" className="w-3 h-3" />}
      </span>
      {children}
    </button>
  );
}
