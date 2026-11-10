import React from 'react';
import { Avatar } from '../components/Avatar';
import { Cena } from '../components/Cena';
import { Icone } from '../components/ui';
import { PERSONAGENS, nivelDoJogador } from '../data';
import { useJogo } from '../state/jogo';
import type { Ir } from '../nav';

export function Inicio({ ir }: { ir: Ir }) {
  const { banco, entrar, armazenamentoOk } = useJogo();
  const locais = Object.values(banco.jogadores)
    .filter((j) => j.origem === 'dispositivo')
    .sort((a, b) => (ultimaAtividade(b) > ultimaAtividade(a) ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10">
      <section className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface">
        <div className="relative h-56 sm:h-72">
          <Cena cena="enfermaria" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-end gap-0 sm:gap-2 px-4">
            {(['helena', 'bia', 'cida', 'rafael', 'marcos'] as const).map((id, i) => (
              <Avatar
                key={id}
                aparencia={PERSONAGENS[id].aparencia}
                humor={i === 2 ? 'aliviado' : 'feliz'}
                className={`anim-respira ${i === 2 ? 'w-28 sm:w-40' : 'w-20 sm:w-32'} ${i === 0 || i === 4 ? 'hidden min-[420px]:block' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-8 border-t border-line">
          <p className="label text-brand mb-2">Serious game · Graduação em Enfermagem</p>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tight">CONEXÕES</h1>
          <p className="font-display text-xl sm:text-2xl font-semibold text-ink2 mt-2">Desenvolvendo soft skills na Enfermagem</p>
          <p className="mt-4 max-w-[62ch] text-ink2">
            Você é estudante de Enfermagem em estágios supervisionados. Em 18 missões, enfrenta situações com pacientes, familiares,
            colegas e supervisores. Cada decisão tem consequências, e cada consequência vem com uma explicação.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary text-lg px-6" onClick={() => ir({ nome: 'identificacao' })}>
              <Icone nome="play" className="w-4 h-4" /> Começar jornada
            </button>
            <button className="btn btn-ghost" onClick={() => ir({ nome: 'admin' })}>
              <Icone nome="escudo" className="w-4 h-4" /> Área do pesquisador
            </button>
          </div>
          {!armazenamentoOk && (
            <p className="mt-4 text-sm rounded-lg bg-low/10 text-low px-3 py-2">
              Este navegador não permite salvar o progresso. Você pode jogar, mas o progresso será perdido ao fechar a página.
            </p>
          )}
        </div>
      </section>

      {locais.length > 0 && (
        <section className="mt-8">
          <h2 className="label text-ink2 mb-3">Continuar neste dispositivo</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {locais.map((j) => {
              const nv = nivelDoJogador(j.xp);
              const feitas = new Set(j.tentativas.map((t) => t.missaoId)).size;
              return (
                <button key={j.codigo} className="card p-3 flex items-center gap-3 text-left hover:border-brand transition-colors" onClick={() => { entrar(j.codigo); ir({ nome: 'hub', aba: 'jornada' }); }}>
                  <span className="shrink-0 w-14 h-14 rounded-full bg-brand-soft overflow-hidden grid place-items-end">
                    <Avatar aparencia={j.aparencia} humor="feliz" className="w-14" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold truncate">{j.apelido}</span>
                    <span className="block text-sm text-ink2 truncate">{j.codigo} · Nível {nv.numero} · {feitas}/18 missões</span>
                  </span>
                  <Icone nome="avancar" className="w-5 h-5 text-ink2" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      <p className="mt-10 text-sm text-ink2 max-w-[70ch]">
        Tecnologia educacional do projeto de pesquisa "Desenvolvimento de serious game para aprendizagem de soft skills em alunos da
        enfermagem". Todos os personagens e casos são fictícios. O progresso fica salvo apenas neste navegador.
      </p>
    </div>
  );
}

function ultimaAtividade(j: { tentativas: { fim: string }[]; criadoEm: string }) {
  return j.tentativas.length ? j.tentativas[j.tentativas.length - 1].fim : j.criadoEm;
}
