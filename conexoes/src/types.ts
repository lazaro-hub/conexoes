// Tipos centrais do jogo CONEXÕES.
// Toda a estrutura pedagógica (eixos, habilidades, missões) é descrita como dados,
// para que novas missões possam ser adicionadas sem alterar os componentes.

export type EixoId = 'e1' | 'e2' | 'e3' | 'e4';

/** Classificação da conduta escolhida dentro do jogo. */
export type Nivel = 'adequada' | 'parcial' | 'pouco' | 'inadequada';

export type Humor = 'neutro' | 'feliz' | 'preocupado' | 'tenso' | 'triste' | 'aliviado';

export type CenaId =
  | 'enfermaria'
  | 'posto'
  | 'ubs'
  | 'sala-aula'
  | 'laboratorio'
  | 'reuniao'
  | 'domicilio'
  | 'corredor';

export type PersonagemId = string;

/** Uma fala dentro de uma cena. `quem` pode ser um personagem, o narrador ou o jogador. */
export interface Fala {
  quem: PersonagemId | 'narrador' | 'jogador';
  texto: string;
  humor?: Humor;
}

export interface Opcao {
  id: string;
  texto: string;
  nivel: Nivel;
  /** O que acontece na cena depois da escolha. */
  consequencia: Fala[];
  /** Por que esta conduta é mais ou menos adequada. */
  feedback: string;
}

export interface Etapa {
  id: string;
  /** Cenário desta etapa, quando diferente do cenário da missão. */
  cena?: CenaId;
  /** Falas que levam até o momento de decisão. */
  situacao: Fala[];
  /** O desafio desta etapa, formulado como pergunta ao jogador. */
  desafio: string;
  opcoes: Opcao[];
}

export interface Missao {
  id: string;
  eixo: EixoId;
  /** Número da habilidade (1 a 18), igual à numeração da estrutura pedagógica. */
  numero: number;
  habilidade: string;
  titulo: string;
  objetivo: string;
  contexto: string;
  situacaoProblema: string;
  /** Comportamentos observáveis que a missão trabalha. */
  comportamentos: string[];
  local: string;
  cena: CenaId;
  personagens: PersonagemId[];
  medidor: string;
  etapas: Etapa[];
  justificativa: string;
  paraRefletir: string;
}

export interface Eixo {
  id: EixoId;
  numero: number;
  nome: string;
  modulo: string;
  resumo: string;
  cena: CenaId;
}

export interface Personagem {
  id: PersonagemId;
  nome: string;
  papel: string;
  aparencia: Aparencia;
}

export type EstiloCabelo = 'curto' | 'longo' | 'coque' | 'cacheado' | 'raspado' | 'grisalho' | 'calvo' | 'tranca';
export type Roupa = 'scrub' | 'jaleco' | 'paciente' | 'casual' | 'tecnico';

export interface Aparencia {
  pele: string;
  cabelo: EstiloCabelo;
  corCabelo: string;
  roupa: Roupa;
  corRoupa: string;
  oculos?: boolean;
  estetoscopio?: boolean;
  barba?: boolean;
  idoso?: boolean;
}

/* ---------- Estado do jogador ---------- */

export interface EscolhaRegistrada {
  etapaId: string;
  opcaoId: string;
  nivel: Nivel;
}

export interface Tentativa {
  missaoId: string;
  inicio: string;
  fim: string;
  escolhas: EscolhaRegistrada[];
  xp: number;
  /** Percentual de aproveitamento da missão no jogo (0 a 100). */
  aproveitamento: number;
  medidorFinal: number;
}

export interface Jogador {
  codigo: string;
  apelido: string;
  aparencia: Aparencia;
  criadoEm: string;
  xp: number;
  tentativas: Tentativa[];
  conquistas: string[];
  comparacoesAbertas: number;
  melhorSequencia: number;
  sequenciaAtual: number;
}

export interface Configuracao {
  liberarTudo: boolean;
}
