import React from 'react';
import type { Aparencia, Humor } from '../types';
import { ajustarCor } from '../lib/util';

interface Props {
  aparencia: Aparencia;
  humor?: Humor;
  className?: string;
  titulo?: string;
}

// Retrato ilustrado em busto, montado por camadas. Usado para personagens e para o avatar do jogador.
export function Avatar({ aparencia: a, humor = 'neutro', className, titulo }: Props) {
  const pele = a.pele;
  const sombra = ajustarCor(pele, -0.16);
  const cab = a.corCabelo;
  const cabEsc = ajustarCor(cab, -0.18);
  const roupa = a.corRoupa;
  const roupaEsc = ajustarCor(roupa, -0.2);
  const tinta = '#2A211C';

  return (
    <svg viewBox="0 0 120 150" className={className} role={titulo ? 'img' : undefined} aria-label={titulo} aria-hidden={titulo ? undefined : true}>
      {/* Cabelo atrás da cabeça */}
      {a.cabelo === 'longo' && <path d="M30 60 C28 30 44 22 60 22 C78 22 92 32 90 60 L94 118 C82 124 38 124 26 118 Z" fill={cabEsc} />}
      {a.cabelo === 'tranca' && (
        <g fill={cabEsc}>
          {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={90 - i * 0.6} cy={80 + i * 11} rx={7 - i * 0.4} ry={7} />)}
        </g>
      )}
      {a.cabelo === 'coque' && <circle cx="60" cy="24" r="12" fill={cabEsc} />}
      {a.cabelo === 'cacheado' && (
        <g fill={cabEsc}>
          {[[34, 50], [86, 50], [32, 66], [88, 66], [36, 80], [84, 80]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" />)}
        </g>
      )}

      {/* Pescoço */}
      <path d="M50 84 L50 106 C54 110 66 110 70 106 L70 84 Z" fill={sombra} />

      {/* Tronco e roupa */}
      <Roupa a={a} roupa={roupa} roupaEsc={roupaEsc} pele={pele} />

      {/* Orelhas e cabeça */}
      <ellipse cx="34" cy="64" rx="5" ry="7" fill={sombra} />
      <ellipse cx="86" cy="64" rx="5" ry="7" fill={sombra} />
      <path d="M34 58 C34 34 46 26 60 26 C74 26 86 34 86 58 C86 80 76 94 60 94 C44 94 34 80 34 58 Z" fill={pele} />

      {/* Barba */}
      {a.barba && <path d="M38 70 C40 86 50 95 60 95 C70 95 80 86 82 70 C78 82 70 86 60 86 C50 86 42 82 38 70 Z" fill={cab} opacity={0.85} />}

      {/* Cabelo à frente */}
      <CabeloFrente estilo={a.cabelo} cor={cab} />

      {/* Rugas discretas */}
      {a.idoso && (
        <g stroke={sombra} strokeWidth="1.2" fill="none" strokeLinecap="round">
          <path d="M40 66 l-3 2" />
          <path d="M80 66 l3 2" />
          <path d="M48 44 q12 -3 24 0" />
        </g>
      )}

      {/* Rosto */}
      <Rosto humor={humor} tinta={tinta} pele={pele} />

      {/* Óculos */}
      {a.oculos && (
        <g fill="none" stroke="#33302C" strokeWidth="2">
          <rect x="41" y="57" width="15" height="12" rx="5" />
          <rect x="64" y="57" width="15" height="12" rx="5" />
          <path d="M56 62 h8" />
        </g>
      )}
    </svg>
  );
}

function Roupa({ a, roupa, roupaEsc, pele }: { a: Aparencia; roupa: string; roupaEsc: string; pele: string }) {
  const corpo = 'M12 150 C12 120 30 104 60 104 C90 104 108 120 108 150 Z';
  const cracha = (
    <g>
      <rect x="74" y="122" width="16" height="20" rx="2" fill="#FBFBF8" stroke="#00000022" />
      <rect x="74" y="122" width="16" height="5" rx="2" fill="#E8A33D" />
      <rect x="77" y="131" width="10" height="2" fill="#9AA" />
      <rect x="77" y="135" width="7" height="2" fill="#9AA" />
    </g>
  );
  const esteto = a.estetoscopio && (
    <g fill="none" stroke="#3B4247" strokeWidth="3" strokeLinecap="round">
      <path d="M44 106 C38 122 40 134 50 138" />
      <path d="M76 106 C82 122 80 130 72 134" />
      <circle cx="52" cy="139" r="4" fill="#9AA4AB" stroke="#3B4247" strokeWidth="2" />
    </g>
  );
  switch (a.roupa) {
    case 'jaleco':
      return (
        <g>
          <path d={corpo} fill="#F3F5F5" />
          <path d="M46 104 L60 132 L74 104 Z" fill={roupa} />
          <path d="M46 104 L56 140 M74 104 L64 140" stroke="#C9D2D4" strokeWidth="2" />
          <path d="M60 132 L60 150" stroke="#C9D2D4" strokeWidth="1.5" />
          {esteto}
          {cracha}
        </g>
      );
    case 'paciente':
      return (
        <g>
          <path d={corpo} fill={roupa} />
          <path d="M44 104 C48 114 72 114 76 104 Z" fill={pele} />
          <g fill={roupaEsc} opacity="0.55">
            {[[30, 128], [46, 138], [62, 126], [78, 138], [94, 128], [40, 118], [84, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" />)}
          </g>
        </g>
      );
    case 'casual':
      return (
        <g>
          <path d={corpo} fill={roupa} />
          <path d="M46 104 C50 113 70 113 74 104 Z" fill={pele} />
          <path d="M46 104 C50 113 70 113 74 104" fill="none" stroke={roupaEsc} strokeWidth="3" />
        </g>
      );
    case 'tecnico':
      return (
        <g>
          <path d={corpo} fill={roupa} />
          <path d="M48 104 L60 120 L72 104 Z" fill={pele} />
          <path d="M42 106 L60 124 L78 106" fill="none" stroke={roupaEsc} strokeWidth="4" />
          <rect x="28" y="126" width="16" height="12" rx="2" fill={roupaEsc} opacity="0.6" />
          {esteto}
          {cracha}
        </g>
      );
    case 'scrub':
    default:
      return (
        <g>
          <path d={corpo} fill={roupa} />
          <path d="M48 104 L60 124 L72 104 Z" fill={pele} />
          <path d="M46 104 L60 126 L74 104" fill="none" stroke={roupaEsc} strokeWidth="3" />
          <rect x="28" y="126" width="16" height="12" rx="2" fill={roupaEsc} opacity="0.6" />
          {esteto}
          {cracha}
        </g>
      );
  }
}

function CabeloFrente({ estilo, cor }: { estilo: Aparencia['cabelo']; cor: string }) {
  switch (estilo) {
    case 'curto':
      return <path d="M33 58 C31 32 46 22 62 22 C80 22 90 36 87 58 C84 46 76 38 64 37 C56 42 44 44 33 58 Z" fill={cor} />;
    case 'raspado':
      return <path d="M34 54 C34 32 46 24 60 24 C76 24 86 32 86 54 C80 40 72 34 60 34 C48 34 40 40 34 54 Z" fill={cor} opacity={0.9} />;
    case 'longo':
      return <path d="M32 62 C30 32 46 22 62 22 C80 22 90 34 88 62 C86 48 80 40 70 36 C62 46 46 50 36 52 C34 56 33 60 32 62 Z" fill={cor} />;
    case 'coque':
      return <path d="M34 56 C33 32 46 24 60 24 C74 24 87 32 86 56 C82 42 72 34 60 34 C48 34 38 42 34 56 Z" fill={cor} />;
    case 'cacheado':
      return (
        <g fill={cor}>
          {[[40, 38], [50, 30], [62, 27], [74, 31], [83, 40], [36, 50], [86, 52], [56, 36], [68, 36]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="10" />
          ))}
        </g>
      );
    case 'grisalho':
      return <path d="M33 58 C32 36 44 26 60 26 C76 26 88 36 87 58 C84 48 80 44 74 42 C66 40 54 40 46 42 C40 44 36 50 33 58 Z" fill={cor} />;
    case 'calvo':
      return (
        <g fill={cor}>
          <path d="M33 66 C32 54 34 48 38 44 C38 52 38 60 37 68 Z" />
          <path d="M87 66 C88 54 86 48 82 44 C82 52 82 60 83 68 Z" />
        </g>
      );
    case 'tranca':
      return <path d="M33 58 C31 32 46 22 62 22 C80 22 90 34 87 60 C84 46 74 38 60 36 C50 38 40 44 33 58 Z" fill={cor} />;
    default:
      return null;
  }
}

function Rosto({ humor, tinta, pele }: { humor: Humor; tinta: string; pele: string }) {
  const sobrancelhas: Record<Humor, [string, string]> = {
    neutro: ['M43 52 q6 -2 12 0', 'M65 52 q6 -2 12 0'],
    feliz: ['M43 52 q6 -4 12 -1', 'M65 51 q6 -3 12 1'],
    aliviado: ['M43 51 q6 -3 12 0', 'M65 51 q6 -3 12 0'],
    preocupado: ['M43 53 q6 -1 12 -4', 'M65 49 q6 1 12 4'],
    tenso: ['M43 49 q6 1 12 5', 'M65 54 q6 -1 12 -5'],
    triste: ['M43 54 q6 -2 12 -5', 'M65 49 q6 3 12 5'],
  };
  const bocas: Record<Humor, string> = {
    neutro: 'M53 80 q7 2 14 0',
    feliz: 'M50 78 q10 10 20 0',
    aliviado: 'M52 79 q8 5 16 0',
    preocupado: 'M53 81 q4 -2 7 0 q4 2 7 0',
    tenso: 'M52 82 q8 -3 16 0',
    triste: 'M52 83 q8 -6 16 0',
  };
  const [s1, s2] = sobrancelhas[humor];
  return (
    <g>
      <g stroke={tinta} strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d={s1} />
        <path d={s2} />
      </g>
      {humor === 'feliz' || humor === 'aliviado' ? (
        <g stroke={tinta} strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M45 64 q4 -3 8 0" />
          <path d="M67 64 q4 -3 8 0" />
        </g>
      ) : (
        <g fill={tinta}>
          <ellipse cx="49" cy="63" rx="2.8" ry="3.2" />
          <ellipse cx="71" cy="63" rx="2.8" ry="3.2" />
        </g>
      )}
      <path d="M60 66 q-3 6 0 8" stroke={ajustarCor(pele, -0.25)} strokeWidth="2" fill="none" strokeLinecap="round" />
      {humor === 'feliz' && (
        <g fill="#E46F6F" opacity="0.22">
          <circle cx="44" cy="74" r="5" />
          <circle cx="76" cy="74" r="5" />
        </g>
      )}
      <path d={bocas[humor]} stroke={tinta} strokeWidth="2.4" fill={humor === 'feliz' ? '#7A2E2E' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
