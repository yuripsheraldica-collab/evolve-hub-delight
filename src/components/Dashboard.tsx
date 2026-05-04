import { useState } from "react";
import { Logo } from "@/components/Logo";
import { SectionCard } from "@/components/SectionCard";
import { patient, indicators, conduct, timeline, evolutionSeries } from "@/lib/patient-data";
import {
  LogOut,
  LayoutDashboard,
  TrendingUp,
  ClipboardList,
  Share2,
  Activity,
  Target,
  Calendar,
  User2,
  Stethoscope,
  ShieldCheck,
  FileText,
  Printer,
  Download,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  HeartPulse,
  Dumbbell,
  Move3d,
  Droplet,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { toast } from "sonner";

interface DashboardProps {
  onLogout: () => void;
}

type Tab = "resumo" | "evolucao" | "conduta" | "exportar";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "resumo", label: "Resumo", icon: LayoutDashboard },
  { id: "evolucao", label: "Evolução", icon: TrendingUp },
  { id: "conduta", label: "Conduta", icon: ClipboardList },
  { id: "exportar", label: "Exportar", icon: Share2 },
];

const indicatorIcons = {
  pain: HeartPulse,
  rom: Move3d,
  force: Dumbbell,
  edema: Droplet,
} as const;

export function Dashboard({ onLogout }: DashboardProps) {
  const [tab, setTab] = useState<Tab>("resumo");

  const progress = Math.round((patient.sessionsDone / patient.sessionsTotal) * 100);
  const delta = patient.globalCurrent - patient.globalAdmission;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface/85 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Logo size="md" />
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-6 sm:p-8 shadow-elegant">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm/6 opacity-80 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-secondary" />
              Olá, bem-vinda
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">{patient.shortName}</h1>
            <p className="mt-1 text-sm opacity-80">
              {patient.condition} · {patient.insurance}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 sm:justify-center">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-smooth border ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-card"
                    : "bg-surface text-muted-foreground border-border hover:text-foreground hover:border-secondary/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {tab === "resumo" && (
          <div className="space-y-6">
            <SectionCard title="Situação atual" eyebrow="Funcionalidade Global · DASH adaptada" icon={<Activity className="h-5 w-5" />}>
              <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
                <ProgressRing value={patient.globalCurrent} delta={delta} />
                <div className="space-y-3 text-sm">
                  <Row label="Admissão" value={`${patient.globalAdmission}% de capacidade`} />
                  <Row label="Atual" value={`${patient.globalCurrent}% de capacidade`} highlight />
                  <Row label="Alta prevista" value={patient.discharge} />
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Sessões realizadas</span>
                      <span className="font-semibold">
                        {patient.sessionsDone} / {patient.sessionsTotal}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-brand rounded-full transition-smooth"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Período: {patient.admission} → {patient.current}
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Identificação" eyebrow="Dados clínicos" icon={<User2 className="h-5 w-5" />}>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <Field icon={<User2 className="h-4 w-4" />} label="Paciente" value={patient.name} />
                <Field icon={<Calendar className="h-4 w-4" />} label="Idade" value={`${patient.age} anos`} />
                <Field icon={<Stethoscope className="h-4 w-4" />} label="Diagnóstico" value={patient.diagnosis} />
                <Field icon={<FileText className="h-4 w-4" />} label="CID-10" value={patient.cid} />
                <Field icon={<ShieldCheck className="h-4 w-4" />} label="Fisioterapeuta" value={`${patient.therapist} — ${patient.crefito}`} />
                <Field icon={<ShieldCheck className="h-4 w-4" />} label="Convênio" value={patient.insurance} />
              </dl>
            </SectionCard>

            <SectionCard title="Indicadores clínicos" eyebrow="Comparativo desde a admissão" icon={<TrendingUp className="h-5 w-5" />}>
              <div className="grid sm:grid-cols-2 gap-3">
                {indicators.map((i) => {
                  const Icon = indicatorIcons[i.key as keyof typeof indicatorIcons];
                  const improved = i.lowerIsBetter ? i.to < i.from : i.to > i.from;
                  const pct = i.lowerIsBetter
                    ? Math.round(((i.from - i.to) / i.from) * 100)
                    : Math.round(((i.to - i.from) / i.from) * 100);
                  return (
                    <div key={i.key} className="rounded-xl border border-border p-4 bg-gradient-soft">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                          <Icon className="h-4 w-4 text-secondary" />
                          {i.label}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-2 py-0.5 ${
                            improved
                              ? "bg-success/15 text-success"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {improved ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {improved ? "+" : "-"}
                          {Math.abs(pct)}%
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          {i.to}
                          <span className="text-sm font-medium text-muted-foreground">{i.unit}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          de {i.from}
                          {i.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="Metas terapêuticas" eyebrow="Progresso até a meta" icon={<Target className="h-5 w-5" />}>
              <div className="space-y-4">
                {indicators.map((i) => {
                  const span = Math.abs(i.target - i.from) || 1;
                  const done = Math.abs(i.to - i.from);
                  const pct = Math.min(100, Math.round((done / span) * 100));
                  return (
                    <div key={i.key}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-medium text-foreground">{i.label}</span>
                        <span className="text-muted-foreground">
                          {i.to}{i.unit} <span className="opacity-50">/ {i.target}{i.unit}</span>
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="Observações clínicas" eyebrow="Avaliação do profissional" icon={<FileText className="h-5 w-5" />}>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Paciente apresenta evolução clínica satisfatória, dentro do esperado para a fase
                cirúrgica atual. Relata dor residual leve (EVA 2) apenas em rotação externa
                forçada no limite da amplitude. Ganho expressivo de arco de movimento e força
                muscular periscapular. Ausência de sinais inflamatórios ativos. Boa adesão ao
                protocolo domiciliar de alongamentos.
              </p>
              <p className="mt-4 text-xs text-muted-foreground border-t border-border pt-3">
                {patient.therapist} · {patient.crefito} · Relatório emitido em {patient.current}
              </p>
            </SectionCard>
          </div>
        )}

        {tab === "evolucao" && (
          <div className="space-y-6">
            <SectionCard title="Funcionalidade global" eyebrow="Evolução mensal" icon={<TrendingUp className="h-5 w-5" />}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evolutionSeries}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.78 0.13 145)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="oklch(0.78 0.13 145)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 240)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.9 0.01 240)",
                        borderRadius: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="funcao"
                      stroke="oklch(0.65 0.14 160)"
                      strokeWidth={3}
                      fill="url(#grad)"
                      name="Funcionalidade %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Dor (EVA)" eyebrow="Tendência" icon={<HeartPulse className="h-5 w-5" />}>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 240)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(1 0 0)",
                        border: "1px solid oklch(0.9 0.01 240)",
                        borderRadius: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="dor"
                      stroke="oklch(0.6 0.22 25)"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "oklch(0.6 0.22 25)" }}
                      name="Dor EVA"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>

            <SectionCard title="Linha do tempo" eyebrow="Histórico do tratamento" icon={<Clock className="h-5 w-5" />}>
              <ol className="relative border-l-2 border-border ml-3 space-y-6">
                {timeline.map((t, idx) => (
                  <li key={idx} className="pl-6 relative">
                    <span
                      className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 ${
                        t.current
                          ? "bg-secondary border-secondary/30 shadow-glow"
                          : "bg-surface border-border"
                      }`}
                    />
                    <p className="text-xs font-semibold tracking-wide uppercase text-secondary">
                      {t.date}
                    </p>
                    <h4 className="font-bold text-foreground mt-1">{t.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{t.text}</p>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </div>
        )}

        {tab === "conduta" && (
          <div className="space-y-6">
            <SectionCard title="Conduta terapêutica" eyebrow="Próxima quinzena" icon={<ClipboardList className="h-5 w-5" />}>
              <ul className="space-y-3">
                {conduct.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-3 p-3 rounded-xl bg-gradient-soft border border-border/60"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm text-foreground/90 self-center">{c}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-destructive mb-1">Atenção domiciliar</h4>
                <p className="text-sm text-foreground/80">
                  Continue com o protocolo de alongamentos prescrito. Em caso de piora da dor (EVA
                  acima de 4) ou edema, contate a clínica antes da próxima sessão.
                </p>
              </div>
            </div>

            <SectionCard title="Adesão" eyebrow="Auto-avaliação" icon={<CheckCircle2 className="h-5 w-5" />}>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Exercícios", value: "92%" },
                  { label: "Crioterapia", value: "85%" },
                  { label: "Repouso", value: "100%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-gradient-soft border border-border p-4">
                    <p className="text-2xl font-bold text-secondary">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {tab === "exportar" && (
          <div className="space-y-6">
            <SectionCard
              title="Relatório Quinzenal — Maio / 2026"
              eyebrow={`${patient.therapist} · ${patient.crefito}`}
              icon={<FileText className="h-5 w-5" />}
            >
              <div className="grid sm:grid-cols-3 gap-3">
                <ExportAction
                  icon={<Download className="h-5 w-5" />}
                  title="Salvar como PDF"
                  desc="Gera o relatório completo em PDF"
                  onClick={() => toast.success("Gerando PDF do relatório...")}
                />
                <ExportAction
                  icon={<Share2 className="h-5 w-5" />}
                  title="Compartilhar"
                  desc="Envie via WhatsApp ou e-mail"
                  onClick={() => toast.success("Abrindo opções de compartilhamento...")}
                />
                <ExportAction
                  icon={<Printer className="h-5 w-5" />}
                  title="Imprimir"
                  desc="Abre a janela de impressão"
                  onClick={() => window.print()}
                />
              </div>
            </SectionCard>

            <SectionCard title="Sobre este relatório" icon={<FileText className="h-5 w-5" />}>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <Field label="Tipo" value="Relatório Quinzenal" />
                <Field label="Emitido em" value={patient.current} />
                <Field label="Período coberto" value={`${patient.admission} → ${patient.current}`} />
                <Field label="Responsável" value={patient.therapist} />
                <Field label="Convênio" value={patient.insurance} />
              </dl>
            </SectionCard>
          </div>
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-surface/95 backdrop-blur-xl border-t border-border">
        <div className="grid grid-cols-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex flex-col items-center justify-center gap-1 py-3 transition-smooth ${
                  active ? "text-secondary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {label}
      </span>
      <span className={`font-semibold ${highlight ? "text-secondary" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

function Field({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground inline-flex items-center gap-1.5">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ProgressRing({ value, delta }: { value: number; delta: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-32 w-32 mx-auto sm:mx-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} stroke="oklch(0.94 0.008 240)" strokeWidth="10" fill="none" />
        <circle
          cx="60"
          cy="60"
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.13 145)" />
            <stop offset="100%" stopColor="oklch(0.55 0.14 200)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
        <span className="text-xs font-semibold text-success inline-flex items-center gap-0.5">
          <ArrowUpRight className="h-3 w-3" />+{delta}%
        </span>
      </div>
    </div>
  );
}

function ExportAction({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-xl border border-border p-4 bg-gradient-soft hover:border-secondary hover:shadow-card transition-smooth"
    >
      <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:text-secondary-foreground transition-smooth">
        {icon}
      </div>
      <h4 className="font-bold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </button>
  );
}
