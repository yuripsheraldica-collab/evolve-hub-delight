export const patient = {
  name: "Maria Aparecida Ferreira",
  shortName: "Maria Aparecida",
  age: 62,
  birth: "12/03/1963",
  gender: "Feminino",
  blood: "O+",
  weight: "68 kg",
  height: "1,62 m",
  imc: "25.9",
  diagnosis: "Síndrome do Manguito Rotador — Pós-cirúrgico (Artroscopia Direita)",
  cid: "M75.1",
  therapist: "Dr. Felipe Andrade",
  crefito: "CREFITO-3 85.421",
  doctor: "Dra. Helena Castro — Ortopedia (CRM-SP 142.880)",
  insurance: "Unimed",
  insuranceCard: "0 123 456789012345 6",
  condition: "Manguito Rotador · Pós-op",
  admission: "14/01/2026",
  current: "04/05/2026",
  discharge: "Junho / 2026",
  sessionsDone: 24,
  sessionsTotal: 30,
  globalAdmission: 28,
  globalCurrent: 72,
  nextSession: "Quinta · 07/05/2026 · 14h30",
  unit: "Instituto Evolução — Unidade Pinheiros",
  emergencyContact: "João Ferreira (filho) · (11) 99876-5432",
};

export const indicators = [
  { key: "pain", label: "Dor (EVA 0–10)", from: 8, to: 2, unit: "", target: 1, lowerIsBetter: true },
  { key: "rom", label: "Mobilidade", from: 45, to: 110, unit: "°", target: 150, lowerIsBetter: false },
  { key: "force", label: "Força Isométrica", from: 12, to: 28, unit: "kg", target: 40, lowerIsBetter: false },
  { key: "edema", label: "Edema Periarticular", from: 3.2, to: 0.8, unit: "cm", target: 0, lowerIsBetter: true },
];

export const vitals = [
  { label: "Pressão Arterial", value: "128/82", unit: "mmHg", status: "normal" },
  { label: "Frequência Cardíaca", value: "76", unit: "bpm", status: "normal" },
  { label: "Saturação O₂", value: "98", unit: "%", status: "normal" },
  { label: "Glicemia capilar", value: "104", unit: "mg/dL", status: "normal" },
];

export const medications = [
  { name: "Dipirona 500mg", dose: "1 cp", schedule: "8/8h se dor", duration: "Até reavaliação" },
  { name: "Ibuprofeno 600mg", dose: "1 cp", schedule: "12/12h após refeição", duration: "5 dias" },
  { name: "Ômega 3 1000mg", dose: "1 cápsula", schedule: "1x ao dia", duration: "Contínuo" },
];

export const allergies = ["Dipirona (leve rash cutâneo)", "Penicilina"];

export const exercises = [
  { name: "Pendular de Codman", sets: "3 séries", reps: "10x cada direção", note: "Aquecimento" },
  { name: "Elevação assistida com bastão", sets: "3 séries", reps: "12 reps", note: "Sem dor" },
  { name: "Rotação externa com elástico", sets: "3 séries", reps: "15 reps", note: "Elástico verde" },
  { name: "Remada baixa periscapular", sets: "3 séries", reps: "12 reps", note: "Postura ereta" },
];

export const conduct = [
  "Fortalecimento excêntrico com elástico grau 3",
  "Treino proprioceptivo com superfície instável",
  "Manter crioterapia pós-sessão (15 min)",
  "Reavaliação completa em 15 dias com recalibração de metas",
];

export const timeline = [
  { date: "14 Jan 2026", title: "Admissão", text: "Avaliação inicial. Dor EVA 8, mobilidade 45°, força 12kg, edema 3.2cm." },
  { date: "Fev / Mar 2026", title: "Fase I — Controle de dor e inflamação", text: "Crioterapia, mobilização passiva, TENS, protocolo leve de ADM." },
  { date: "Abr 2026", title: "Fase II — Fortalecimento inicial", text: "Isotônicos leves, elástico grau 1-2, início de propriocepção." },
  { date: "04 Mai 2026 · ATUAL", title: "Reavaliação quinzenal", text: "EVA 2, mobilidade 110°, força 28kg, edema 0.8cm. Funcionalidade 72%.", current: true },
  { date: "Mai / Jun 2026", title: "Fase III — Funcionalidade avançada", text: "Excêntrico grau 3, propriocepção, retorno às AVDs. Alta prevista: Junho 2026." },
];

export const evolutionSeries = [
  { month: "Jan", funcao: 28, dor: 8 },
  { month: "Fev", funcao: 38, dor: 6 },
  { month: "Mar", funcao: 50, dor: 5 },
  { month: "Abr", funcao: 62, dor: 3 },
  { month: "Mai", funcao: 72, dor: 2 },
];

export type DocCategory = "Receita" | "Atestado" | "Exame" | "Laudo" | "Relatório";

export interface PatientDocument {
  id: string;
  title: string;
  category: DocCategory;
  date: string;
  issuer: string;
  size: string;
  pages: number;
  summary: string;
}

export const documents: PatientDocument[] = [
  {
    id: "doc-001",
    title: "Receita — Dipirona / Ibuprofeno",
    category: "Receita",
    date: "02/05/2026",
    issuer: "Dra. Helena Castro · CRM-SP 142.880",
    size: "182 KB",
    pages: 1,
    summary: "Analgesia para controle de dor pós-sessão. Validade 30 dias.",
  },
  {
    id: "doc-002",
    title: "Atestado de comparecimento",
    category: "Atestado",
    date: "29/04/2026",
    issuer: "Instituto Evolução — Recepção",
    size: "96 KB",
    pages: 1,
    summary: "Atestado de comparecimento à sessão de fisioterapia das 14h30 às 15h30.",
  },
  {
    id: "doc-003",
    title: "Ressonância Magnética — Ombro D",
    category: "Exame",
    date: "08/01/2026",
    issuer: "CDB Diagnósticos",
    size: "4.2 MB",
    pages: 6,
    summary: "Lesão completa do supraespinhal, tendinopatia infraespinhal. Bursite subacromial.",
  },
  {
    id: "doc-004",
    title: "Laudo cirúrgico — Artroscopia",
    category: "Laudo",
    date: "12/01/2026",
    issuer: "Hospital São Camilo · Dra. Helena Castro",
    size: "320 KB",
    pages: 3,
    summary: "Reparo artroscópico do manguito rotador com âncoras duplas. Sem intercorrências.",
  },
  {
    id: "doc-005",
    title: "Relatório quinzenal — Abril/2026",
    category: "Relatório",
    date: "20/04/2026",
    issuer: "Dr. Felipe Andrade · CREFITO-3 85.421",
    size: "240 KB",
    pages: 2,
    summary: "Evolução positiva. Funcionalidade 62%. Dor EVA 3. Programar fase III.",
  },
  {
    id: "doc-006",
    title: "Pedido de exame — RX controle",
    category: "Receita",
    date: "20/04/2026",
    issuer: "Dra. Helena Castro · CRM-SP 142.880",
    size: "112 KB",
    pages: 1,
    summary: "Solicitação de RX em AP e perfil do ombro D para controle pós-operatório.",
  },
];

export type NotificationType = "lembrete" | "documento" | "evolucao" | "alerta";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const notifications: AppNotification[] = [
  {
    id: "n-001",
    type: "lembrete",
    title: "Próxima sessão amanhã",
    body: "Quinta-feira, 07/05 às 14h30 — Unidade Pinheiros. Não esqueça da camiseta sem manga.",
    time: "Há 2h",
    read: false,
  },
  {
    id: "n-002",
    type: "documento",
    title: "Nova receita disponível",
    body: "Dra. Helena Castro emitiu uma nova receita. Toque para visualizar.",
    time: "Hoje, 09:12",
    read: false,
  },
  {
    id: "n-003",
    type: "evolucao",
    title: "Você atingiu 72% de funcionalidade",
    body: "Parabéns! Sua evolução está acima da média esperada para esta fase.",
    time: "Ontem",
    read: true,
  },
  {
    id: "n-004",
    type: "alerta",
    title: "Lembrete de exercícios domiciliares",
    body: "Não esqueça das 3 séries de pendular de Codman hoje.",
    time: "2 dias atrás",
    read: true,
  },
];
