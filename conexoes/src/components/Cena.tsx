import React from 'react';
import type { CenaId } from '../types';

const c = (n: string, a?: number) => (a === undefined ? `rgb(var(--sc-${n}))` : `rgb(var(--sc-${n}) / ${a})`);

interface Props {
  cena: CenaId;
  className?: string;
}

/** Cenários ilustrados (vetoriais), coloridos pelos tokens de tema para funcionar no claro e no escuro. */
export function Cena({ cena, className }: Props) {
  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      {CENAS[cena]()}
    </svg>
  );
}

export const NOME_CENA: Record<CenaId, string> = {
  enfermaria: 'Enfermaria',
  posto: 'Posto de enfermagem',
  ubs: 'Unidade Básica de Saúde',
  'sala-aula': 'Sala de aula',
  laboratorio: 'Laboratório de simulação',
  reuniao: 'Sala de reuniões',
  domicilio: 'Visita domiciliar',
  corredor: 'Corredor do hospital',
};

function Base({ parede = 'wall', piso = 'floor', linha = 300 }: { parede?: string; piso?: string; linha?: number }) {
  return (
    <g>
      <rect width="800" height={linha} fill={c(parede)} />
      <rect y={linha} width="800" height={400 - linha} fill={c(piso)} />
      <rect y={linha - 10} width="800" height="10" fill={c('trim')} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={i * 110 - 40} y1={linha} x2={i * 130 - 120} y2={400} stroke={c('floor2')} strokeWidth="2" />
      ))}
    </g>
  );
}

function Janela({ x, y, w, h, persiana = false }: { x: number; y: number; w: number; h: number; persiana?: boolean }) {
  return (
    <g>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx="4" fill={c('trim')} />
      <rect x={x} y={y} width={w} height={h} fill={c('sky')} />
      <path d={`M${x} ${y + h * 0.72} q${w * 0.25} -${h * 0.16} ${w * 0.5} -${h * 0.04} t${w * 0.5} -${h * 0.1} V${y + h} H${x} Z`} fill={c('glass')} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={c('trim')} strokeWidth="5" />
      {persiana && Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={x} y={y + i * 9} width={w} height="5" fill={c('paper', 0.75)} />
      ))}
    </g>
  );
}

const Placa = ({ x, y, texto, w = 170 }: { x: number; y: number; texto: string; w?: number }) => (
  <g>
    <rect x={x} y={y} width={w} height="28" rx="5" fill={c('detail')} />
    <text x={x + w / 2} y={y + 19} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="600" fill={c('paper')} letterSpacing="1">{texto}</text>
  </g>
);

const CENAS: Record<CenaId, () => React.ReactElement> = {
  enfermaria: () => (
    <g>
      <Base />
      <Janela x={70} y={70} w={170} h={130} persiana />
      {/* trilho e cortina */}
      <rect x="560" y="40" width="240" height="5" fill={c('metal')} />
      <path d="M720 45 q10 120 0 250 h80 V45 Z" fill={c('detail', 0.35)} />
      {/* monitor */}
      <rect x="560" y="80" width="110" height="74" rx="8" fill={c('furn2')} />
      <rect x="568" y="88" width="94" height="58" rx="4" fill="#0E2326" />
      <polyline points="572,122 590,122 596,108 602,134 608,122 630,122 636,112 642,128 648,122 658,122" fill="none" stroke="#5FE0B0" strokeWidth="2" />
      <rect x="610" y="154" width="10" height="60" fill={c('metal')} />
      {/* cama */}
      <rect x="400" y="236" width="300" height="34" rx="10" fill={c('paper')} />
      <rect x="400" y="262" width="300" height="20" rx="6" fill={c('furn')} />
      <rect x="402" y="200" width="70" height="44" rx="12" fill={c('paper')} />
      <rect x="420" y="282" width="8" height="40" fill={c('metal')} />
      <rect x="670" y="282" width="8" height="40" fill={c('metal')} />
      <path d="M480 236 h190 v-16 h-190 Z" fill={c('furn', 0.5)} />
      <rect x="480" y="214" width="190" height="6" rx="3" fill={c('metal')} />
      {/* suporte de soro */}
      <rect x="745" y="120" width="5" height="210" fill={c('metal')} />
      <rect x="732" y="112" width="30" height="5" fill={c('metal')} />
      <rect x="735" y="118" width="16" height="30" rx="5" fill={c('glass')} stroke={c('metal')} />
    </g>
  ),
  posto: () => (
    <g>
      <Base />
      <Placa x={130} y={36} texto="POSTO DE ENFERMAGEM" w={210} />
      {/* prateleira de prontuários */}
      <rect x="480" y="70" width="270" height="10" fill={c('furn2')} />
      {['e1', 'e2', 'e3', 'e4', 'e1', 'e2', 'e3', 'e4', 'e1', 'e2', 'e3'].map((e, i) => (
        <rect key={i} x={488 + i * 23} y={20 + (i % 3) * 4} width="18" height={50 - (i % 3) * 4} rx="2" fill={`rgb(var(--${e}) / 0.75)`} />
      ))}
      <rect x="480" y="150" width="270" height="10" fill={c('furn2')} />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={490 + i * 28} y={110} width="22" height="40" rx="2" fill={c('paper')} stroke={c('furn')} />
      ))}
      {/* relógio */}
      <circle cx="410" cy="100" r="30" fill={c('paper')} stroke={c('furn2')} strokeWidth="5" />
      <path d="M410 100 V80 M410 100 L424 108" stroke={c('furn2')} strokeWidth="4" strokeLinecap="round" />
      {/* balcão */}
      <rect x="0" y="232" width="800" height="78" fill={c('furn')} />
      <rect x="0" y="222" width="800" height="14" rx="3" fill={c('trim')} />
      <rect x="120" y="160" width="110" height="66" rx="6" fill={c('furn2')} />
      <rect x="128" y="168" width="94" height="50" rx="3" fill={c('glass')} />
      <rect x="168" y="226" width="30" height="6" fill={c('furn2')} />
      <rect x="290" y="196" width="60" height="26" rx="3" fill={c('paper')} />
      <rect x="296" y="202" width="40" height="3" fill={c('furn')} />
      <rect x="296" y="209" width="30" height="3" fill={c('furn')} />
    </g>
  ),
  ubs: () => (
    <g>
      <Base parede="warm" />
      <Placa x={120} y={168} texto="ACOLHIMENTO" w={140} />
      {/* mural */}
      <rect x="260" y="60" width="230" height="140" rx="6" fill={c('wood')} />
      <rect x="270" y="70" width="210" height="120" rx="3" fill={c('paper')} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={282 + (i % 6) * 32} y={86 + Math.floor(i / 6) * 34} width="24" height="24" rx="3" fill={i % 4 === 0 ? c('detail', 0.6) : c('furn', 0.5)} />
      ))}
      <rect x="282" y="160" width="120" height="6" rx="2" fill={c('furn')} />
      {/* porta */}
      <rect x="660" y="80" width="110" height="220" rx="4" fill={c('furn2')} />
      <rect x="672" y="94" width="40" height="70" rx="3" fill={c('glass')} />
      <circle cx="752" cy="200" r="5" fill={c('trim')} />
      {/* cadeiras */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={430 + i * 70} y={238} width="56" height="52" rx="10" fill={c('detail', 0.55)} />
          <rect x={430 + i * 70} y={280} width="56" height="12" rx="4" fill={c('detail', 0.75)} />
          <rect x={438 + i * 70} y={292} width="5" height="34" fill={c('metal')} />
          <rect x={473 + i * 70} y={292} width="5" height="34" fill={c('metal')} />
        </g>
      ))}
      {/* balcão de recepção */}
      <rect x="20" y="220" width="210" height="100" rx="6" fill={c('furn')} />
      <rect x="10" y="212" width="230" height="14" rx="4" fill={c('trim')} />
      {/* planta */}
      <rect x="616" y="268" width="30" height="40" rx="5" fill={c('wood')} />
      <path d="M631 268 C610 240 612 214 628 200 C632 224 634 246 631 268 Z M631 268 C650 242 660 226 650 206 C640 226 634 246 631 268 Z" fill={c('detail', 0.7)} />
    </g>
  ),
  'sala-aula': () => (
    <g>
      <Base />
      {/* quadro */}
      <rect x="120" y="50" width="420" height="170" rx="6" fill={c('trim')} />
      <rect x="132" y="62" width="396" height="146" rx="3" fill={c('paper')} />
      <path d="M156 92 h150 M156 114 h210 M156 136 h120" stroke={c('detail', 0.75)} strokeWidth="5" strokeLinecap="round" />
      <path d="M400 150 l30 -40 l30 20 l34 -44" stroke={c('furn2')} strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="140" y="208" width="380" height="8" fill={c('furn2')} />
      <Janela x={620} y={60} w={130} h={140} />
      {/* carteiras */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M${30 + i * 200} 290 h150 l-14 -26 h-122 Z`} fill={c('wood')} />
          <rect x={44 + i * 200} y={290} width="6" height="40" fill={c('metal')} />
          <rect x={160 + i * 200} y={290} width="6" height="40" fill={c('metal')} />
        </g>
      ))}
    </g>
  ),
  laboratorio: () => (
    <g>
      <Base />
      <Placa x={130} y={40} texto="LAB. DE SIMULAÇÃO" w={190} />
      {/* armários */}
      <rect x="520" y="60" width="240" height="110" rx="4" fill={c('furn')} />
      <line x1="600" y1="60" x2="600" y2="170" stroke={c('furn2')} strokeWidth="3" />
      <line x1="680" y1="60" x2="680" y2="170" stroke={c('furn2')} strokeWidth="3" />
      {[0, 1, 2].map((i) => <rect key={i} x={548 + i * 80} y={104} width="24" height="5" rx="2" fill={c('furn2')} />)}
      {/* pia */}
      <rect x="520" y="230" width="240" height="70" fill={c('furn')} />
      <rect x="510" y="222" width="260" height="12" rx="3" fill={c('trim')} />
      <path d="M620 222 v-30 q0 -10 14 -10 h10" fill="none" stroke={c('metal')} strokeWidth="6" strokeLinecap="round" />
      <rect x="704" y="196" width="20" height="26" rx="4" fill={c('detail', 0.7)} />
      {/* maca com manequim */}
      <rect x="120" y="250" width="300" height="20" rx="8" fill={c('paper')} />
      <rect x="130" y="270" width="280" height="10" fill={c('metal')} />
      <rect x="140" y="280" width="8" height="40" fill={c('metal')} />
      <rect x="392" y="280" width="8" height="40" fill={c('metal')} />
      <circle cx="160" cy="236" r="18" fill={c('furn', 0.9)} />
      <rect x="180" y="226" width="200" height="26" rx="12" fill={c('glass')} />
      <rect x="250" y="160" width="90" height="60" rx="6" fill={c('furn2')} />
      <rect x="257" y="167" width="76" height="46" rx="3" fill="#0E2326" />
      <polyline points="261,192 274,192 279,180 284,202 289,192 305,192 310,184 315,198 320,192 329,192" fill="none" stroke="#5FE0B0" strokeWidth="2" />
    </g>
  ),
  reuniao: () => (
    <g>
      <Base />
      <Janela x={60} y={60} w={190} h={140} />
      {/* quadro de notas */}
      <rect x="330" y="56" width="300" height="160" rx="6" fill={c('paper')} stroke={c('furn')} strokeWidth="4" />
      {[['e1', 350, 76], ['e2', 420, 90], ['e3', 490, 74], ['e4', 560, 88], ['e2', 360, 146], ['e4', 440, 152], ['e1', 520, 140]].map(([e, x, y], i) => (
        <rect key={i} x={x as number} y={y as number} width="54" height="48" rx="2" fill={`rgb(var(--${e}) / 0.45)`} transform={`rotate(${(i % 3) - 1} ${x} ${y})`} />
      ))}
      {/* mesa */}
      <path d="M90 300 L170 250 H630 L710 300 Z" fill={c('wood')} />
      <rect x="90" y="300" width="620" height="14" fill={c('furn2')} />
      <rect x="250" y="262" width="60" height="16" rx="2" fill={c('paper')} transform="rotate(-6 280 270)" />
      <rect x="450" y="258" width="50" height="34" rx="3" fill={c('furn2')} />
      <circle cx="560" cy="270" r="12" fill={c('paper')} />
    </g>
  ),
  domicilio: () => (
    <g>
      <Base parede="warm" piso="wood" />
      <Janela x={300} y={70} w={150} h={110} />
      <rect x="300" y="180" width="150" height="12" fill={c('trim')} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={312 + i * 46} y={164} width="22" height="18" rx="4" fill={c('furn2')} />
          <circle cx={323 + i * 46} cy={156} r="12" fill={c('detail', 0.6)} />
        </g>
      ))}
      {/* quadro com foto */}
      <rect x="110" y="80" width="90" height="70" rx="3" fill={c('wood')} />
      <rect x="118" y="88" width="74" height="54" fill={c('sky')} />
      <circle cx="140" cy="108" r="8" fill={c('furn2')} />
      <circle cx="166" cy="110" r="8" fill={c('furn2')} />
      {/* sofá */}
      <rect x="40" y="230" width="260" height="70" rx="18" fill={c('detail', 0.45)} />
      <rect x="40" y="200" width="260" height="50" rx="18" fill={c('detail', 0.6)} />
      {/* geladeira e bancada */}
      <rect x="560" y="80" width="110" height="220" rx="10" fill={c('paper')} stroke={c('furn')} strokeWidth="3" />
      <line x1="560" y1="160" x2="670" y2="160" stroke={c('furn')} strokeWidth="3" />
      <rect x="652" y="110" width="6" height="30" rx="3" fill={c('furn2')} />
      <rect x="652" y="178" width="6" height="40" rx="3" fill={c('furn2')} />
      <rect x="590" y="190" width="50" height="28" rx="3" fill={c('warm')} stroke={c('furn')} />
      <text x="615" y="209" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill={c('furn2')}>N/F</text>
      <rect x="680" y="200" width="120" height="100" fill={c('furn')} />
      <rect x="674" y="192" width="126" height="12" rx="3" fill={c('trim')} />
      {/* mesa com remédio */}
      <rect x="360" y="262" width="150" height="10" rx="3" fill={c('wood')} />
      <rect x="374" y="272" width="6" height="50" fill={c('furn2')} />
      <rect x="490" y="272" width="6" height="50" fill={c('furn2')} />
      <rect x="420" y="240" width="26" height="22" rx="3" fill={c('paper')} />
      <rect x="420" y="246" width="26" height="5" fill={c('detail', 0.7)} />
    </g>
  ),
  corredor: () => (
    <g>
      <rect width="800" height="400" fill={c('wall')} />
      <path d="M0 0 L300 140 H500 L800 0 Z" fill={c('trim')} />
      <path d="M0 400 L300 250 H500 L800 400 Z" fill={c('floor')} />
      <path d="M0 0 L300 140 V250 L0 400 Z" fill={c('wall2')} />
      <path d="M800 0 L500 140 V250 L800 400 Z" fill={c('wall2')} />
      <rect x="300" y="140" width="200" height="110" fill={c('wall')} />
      <rect x="370" y="170" width="60" height="80" fill={c('furn2')} />
      {/* portas laterais */}
      <path d="M70 70 L170 116 V300 L70 352 Z" fill={c('furn')} />
      <path d="M200 130 L250 153 V266 L200 290 Z" fill={c('furn')} />
      <path d="M730 70 L630 116 V300 L730 352 Z" fill={c('furn')} />
      <path d="M600 130 L550 153 V266 L600 290 Z" fill={c('furn')} />
      {/* corrimão */}
      <path d="M0 250 L300 205" stroke={c('detail', 0.6)} strokeWidth="6" />
      <path d="M800 250 L500 205" stroke={c('detail', 0.6)} strokeWidth="6" />
      {/* luzes */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={360 - i * 50} y={40 + i * 30} width={80 + i * 100} height={8 - i * 2} rx="3" fill={c('paper', 0.9)} transform={`translate(${i * -0} 0)`} />
      ))}
      <rect x="330" y="180" width="140" height="22" rx="4" fill={c('detail')} />
      <text x="400" y="195" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fontWeight="600" fill={c('paper')} letterSpacing="1">INTERNAÇÃO</text>
    </g>
  ),
};
