export const patient = {
  name: "Maria Aparecida Ferreira",
  shortName: "Maria Aparecida",
  age: 62,
  diagnosis: "Síndrome do Manguito Rotador — Pós-cirúrgico (Artroscopia Direita)",
  cid: "M75.1",
  therapist: "Dr. Felipe Andrade",
  crefito: "CREFITO-3 85.421",
  insurance: "Unimed",
  condition: "Manguito Rotador · Pós-op",
  admission: "14/01/2026",
  current: "04/05/2026",
  discharge: "Junho / 2026",
  sessionsDone: 24,
  sessionsTotal: 30,
  globalAdmission: 28,
  globalCurrent: 72,
};

export const indicators = [
  { key: "pain", label: "Dor (EVA 0–10)", from: 8, to: 2, unit: "", target: 1, lowerIsBetter: true },
  { key: "rom", label: "Mobilidade", from: 45, to: 110, unit: "°", target: 150, lowerIsBetter: false },
  { key: "force", label: "Força Isométrica", from: 12, to: 28, unit: "kg", target: 40, lowerIsBetter: false },
  { key: "edema", label: "Edema Periarticular", from: 3.2, to: 0.8, unit: "cm", target: 0, lowerIsBetter: true },
];

export const conduct = [
  "Fortalecimento excêntrico com elástico grau 3",
  "Treino proprioceptivo com superfície instável",
  "Manter crioterapia pós-sessão",
  "Reavaliação completa em 15 dias com recalibração de metas",
];

export const timeline = [
  {
    date: "14 Jan 2026",
    title: "Admissão",
    text: "Avaliação inicial. Dor EVA 8, mobilidade 45°, força 12kg, edema 3.2cm.",
  },
  {
    date: "Fev / Mar 2026",
    title: "Fase I — Controle de dor e inflamação",
    text: "Crioterapia, mobilização passiva, TENS, protocolo leve de ADM.",
  },
  {
    date: "Abr 2026",
    title: "Fase II — Fortalecimento inicial",
    text: "Isotônicos leves, elástico grau 1-2, início de propriocepção.",
  },
  {
    date: "04 Mai 2026 · ATUAL",
    title: "Reavaliação quinzenal",
    text: "EVA 2, mobilidade 110°, força 28kg, edema 0.8cm. Funcionalidade 72%.",
    current: true,
  },
  {
    date: "Mai / Jun 2026",
    title: "Fase III — Funcionalidade avançada",
    text: "Excêntrico grau 3, propriocepção, retorno às AVDs. Alta prevista: Junho 2026.",
  },
];

export const evolutionSeries = [
  { month: "Jan", funcao: 28, dor: 8 },
  { month: "Fev", funcao: 38, dor: 6 },
  { month: "Mar", funcao: 50, dor: 5 },
  { month: "Abr", funcao: 62, dor: 3 },
  { month: "Mai", funcao: 72, dor: 2 },
];
