import type { Eixo, Personagem } from '../types';

// Todos os personagens e casos são fictícios.

export const PELES = ['#F6D3B8', '#E9B48F', '#C98A5E', '#A2683F', '#7A4A2A', '#563321'];
export const CORES_CABELO = ['#1F1A17', '#4A2F1E', '#7A4B2A', '#B07A3C', '#D9B26A', '#8E2F2A', '#B9B4AE'];
export const CORES_SCRUB = ['#1F7A78', '#2F5FA7', '#6B4C9A', '#A63E6B', '#2E6B45', '#3A4A5C'];

export const PERSONAGENS: Record<string, Personagem> = {
  helena: {
    id: 'helena',
    nome: 'Profa. Helena',
    papel: 'Docente e supervisora de estágio',
    aparencia: { pele: '#C98A5E', cabelo: 'coque', corCabelo: '#2B1D16', roupa: 'jaleco', corRoupa: '#3A4A5C', oculos: true, estetoscopio: true },
  },
  marcos: {
    id: 'marcos',
    nome: 'Enf. Marcos',
    papel: 'Enfermeiro preceptor da clínica médica',
    aparencia: { pele: '#7A4A2A', cabelo: 'raspado', corCabelo: '#1F1A17', roupa: 'scrub', corRoupa: '#2F5FA7', barba: true, estetoscopio: true },
  },
  tania: {
    id: 'tania',
    nome: 'Enf. Tânia',
    papel: 'Enfermeira da Unidade Básica de Saúde',
    aparencia: { pele: '#E9B48F', cabelo: 'longo', corCabelo: '#4A2F1E', roupa: 'jaleco', corRoupa: '#1F7A78', estetoscopio: true },
  },
  edson: {
    id: 'edson',
    nome: 'Sr. Edson',
    papel: 'Técnico de enfermagem',
    aparencia: { pele: '#A2683F', cabelo: 'grisalho', corCabelo: '#B9B4AE', roupa: 'tecnico', corRoupa: '#2E6B45', barba: true },
  },
  bia: {
    id: 'bia',
    nome: 'Bia',
    papel: 'Colega de turma',
    aparencia: { pele: '#563321', cabelo: 'cacheado', corCabelo: '#1F1A17', roupa: 'scrub', corRoupa: '#1F7A78' },
  },
  rafael: {
    id: 'rafael',
    nome: 'Rafael',
    papel: 'Colega de turma',
    aparencia: { pele: '#F6D3B8', cabelo: 'curto', corCabelo: '#B07A3C', roupa: 'scrub', corRoupa: '#1F7A78', oculos: true },
  },
  julia: {
    id: 'julia',
    nome: 'Júlia',
    papel: 'Colega de turma',
    aparencia: { pele: '#E9B48F', cabelo: 'tranca', corCabelo: '#8E2F2A', roupa: 'scrub', corRoupa: '#1F7A78' },
  },
  caio: {
    id: 'caio',
    nome: 'Caio',
    papel: 'Colega de turma',
    aparencia: { pele: '#C98A5E', cabelo: 'curto', corCabelo: '#1F1A17', roupa: 'scrub', corRoupa: '#1F7A78' },
  },
  lara: {
    id: 'lara',
    nome: 'Lara',
    papel: 'Estudante de Fisioterapia',
    aparencia: { pele: '#7A4A2A', cabelo: 'coque', corCabelo: '#1F1A17', roupa: 'scrub', corRoupa: '#6B4C9A' },
  },
  vitor: {
    id: 'vitor',
    nome: 'Vítor',
    papel: 'Estudante de Nutrição',
    aparencia: { pele: '#E9B48F', cabelo: 'cacheado', corCabelo: '#4A2F1E', roupa: 'scrub', corRoupa: '#2E6B45' },
  },
  cida: {
    id: 'cida',
    nome: 'Dona Cida',
    papel: 'Paciente internada, 74 anos',
    aparencia: { pele: '#C98A5E', cabelo: 'grisalho', corCabelo: '#D8D4CE', roupa: 'paciente', corRoupa: '#9FC3D6', idoso: true, oculos: true },
  },
  joaquim: {
    id: 'joaquim',
    nome: 'Seu Joaquim',
    papel: 'Usuário da UBS, 61 anos',
    aparencia: { pele: '#A2683F', cabelo: 'calvo', corCabelo: '#B9B4AE', roupa: 'casual', corRoupa: '#B5793A', idoso: true },
  },
  renata: {
    id: 'renata',
    nome: 'Renata',
    papel: 'Mãe de paciente pediátrico',
    aparencia: { pele: '#E9B48F', cabelo: 'longo', corCabelo: '#1F1A17', roupa: 'casual', corRoupa: '#7E5A9B' },
  },
  pedro: {
    id: 'pedro',
    nome: 'Pedro',
    papel: 'Adolescente, 16 anos',
    aparencia: { pele: '#563321', cabelo: 'raspado', corCabelo: '#1F1A17', roupa: 'casual', corRoupa: '#3F6E8C' },
  },
  rosa: {
    id: 'rosa',
    nome: 'Dona Rosa',
    papel: 'Paciente internada, 79 anos',
    aparencia: { pele: '#F6D3B8', cabelo: 'grisalho', corCabelo: '#E4E0DA', roupa: 'paciente', corRoupa: '#9FC3D6', idoso: true },
  },
  marta: {
    id: 'marta',
    nome: 'Marta',
    papel: 'Filha de Dona Rosa',
    aparencia: { pele: '#F6D3B8', cabelo: 'curto', corCabelo: '#7A4B2A', roupa: 'casual', corRoupa: '#4F7A5A', oculos: true },
  },
  lauro: {
    id: 'lauro',
    nome: 'Seu Lauro',
    papel: 'Paciente internado, 68 anos',
    aparencia: { pele: '#7A4A2A', cabelo: 'grisalho', corCabelo: '#CFCAC3', roupa: 'paciente', corRoupa: '#9FC3D6', idoso: true, barba: true },
  },
  valdir: {
    id: 'valdir',
    nome: 'Sr. Valdir',
    papel: 'Acompanhante de paciente',
    aparencia: { pele: '#E9B48F', cabelo: 'calvo', corCabelo: '#7A4B2A', roupa: 'casual', corRoupa: '#8C3B3B', barba: true },
  },
  zilda: {
    id: 'zilda',
    nome: 'Dona Zilda',
    papel: 'Usuária em visita domiciliar, 70 anos',
    aparencia: { pele: '#563321', cabelo: 'grisalho', corCabelo: '#D8D4CE', roupa: 'casual', corRoupa: '#C9A227', idoso: true },
  },
  neto: {
    id: 'neto',
    nome: 'Gabriel',
    papel: 'Neto de Dona Zilda',
    aparencia: { pele: '#7A4A2A', cabelo: 'curto', corCabelo: '#1F1A17', roupa: 'casual', corRoupa: '#2F5FA7' },
  },
};

export const EIXOS: Eixo[] = [
  {
    id: 'e1',
    numero: 1,
    nome: 'Comunicação e relações interpessoais',
    modulo: 'Primeiros encontros',
    resumo: 'Acolhimento, comunicação com pacientes, escuta ativa e empatia na UBS e na enfermaria.',
    cena: 'ubs',
  },
  {
    id: 'e2',
    numero: 2,
    nome: 'Liderança e colaboração',
    modulo: 'Equipe em campo',
    resumo: 'Organização de equipes, divisão de responsabilidades, negociação e manejo de conflitos.',
    cena: 'reuniao',
  },
  {
    id: 'e3',
    numero: 3,
    nome: 'Pensamento crítico e decisão',
    modulo: 'Raciocínio no plantão',
    resumo: 'Análise de informações, reflexão sobre a prática, resolução de problemas e tomada de decisão.',
    cena: 'enfermaria',
  },
  {
    id: 'e4',
    numero: 4,
    nome: 'Desenvolvimento pessoal e profissional',
    modulo: 'Caminho profissional',
    resumo: 'Autonomia, iniciativa, adaptação, autorregulação emocional e aprendizagem contínua.',
    cena: 'sala-aula',
  },
];
