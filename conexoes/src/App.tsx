import React, { useCallback, useEffect, useState } from 'react';
import { ProvedorAvisos } from './components/ui';
import { ProvedorJogo, useJogo } from './state/jogo';
import type { Tela } from './nav';
import { Inicio } from './screens/Inicio';
import { Identificacao } from './screens/Identificacao';
import { Hub } from './screens/Hub';
import { Briefing, Modulo } from './screens/Modulo';
import { Missao } from './screens/Missao';
import { Resultado } from './screens/Resultado';
import { Admin } from './screens/Admin';

export function App() {
  return (
    <ProvedorJogo>
      <ProvedorAvisos>
        <Navegador />
      </ProvedorAvisos>
    </ProvedorJogo>
  );
}

const PRECISA_JOGADOR = new Set<Tela['nome']>(['hub', 'modulo', 'briefing', 'missao', 'resultado']);

function Navegador() {
  const { jogador } = useJogo();
  const [tela, setTela] = useState<Tela>(() => (jogador ? { nome: 'hub', aba: 'jornada' } : { nome: 'inicio' }));
  const [chave, setChave] = useState(0);

  const ir = useCallback((t: Tela) => {
    setTela(t);
    setChave((k) => k + 1);
    try { window.scrollTo({ top: 0 }); } catch { /* ignora */ }
  }, []);

  // Sem participante ativo, telas do jogo voltam para o início.
  const atual: Tela = PRECISA_JOGADOR.has(tela.nome) && !jogador ? { nome: 'inicio' } : tela;

  useEffect(() => {
    const nomes: Record<Tela['nome'], string> = {
      inicio: 'CONEXÕES', identificacao: 'Identificação · CONEXÕES', hub: 'Jornada · CONEXÕES', modulo: 'Módulo · CONEXÕES',
      briefing: 'Ficha da missão · CONEXÕES', missao: 'Missão · CONEXÕES', resultado: 'Resultado · CONEXÕES', admin: 'Pesquisador · CONEXÕES',
    };
    try { document.title = nomes[atual.nome]; } catch { /* ignora */ }
  }, [atual.nome]);

  return (
    <main className="gutter min-h-full pb-16">
      <div key={chave} className="anim-sobe">
        {atual.nome === 'inicio' && <Inicio ir={ir} />}
        {atual.nome === 'identificacao' && <Identificacao ir={ir} editar={atual.editar} />}
        {atual.nome === 'hub' && <Hub ir={ir} aba={atual.aba} />}
        {atual.nome === 'modulo' && <Modulo ir={ir} eixo={atual.eixo} />}
        {atual.nome === 'briefing' && <Briefing ir={ir} missaoId={atual.missaoId} />}
        {atual.nome === 'missao' && <Missao ir={ir} missaoId={atual.missaoId} />}
        {atual.nome === 'resultado' && <Resultado ir={ir} tentativa={atual.tentativa} registro={atual.registro} />}
        {atual.nome === 'admin' && <Admin ir={ir} />}
      </div>
    </main>
  );
}
