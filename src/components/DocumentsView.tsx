import { SectionCard } from "@/components/SectionCard";
import { documents, PatientDocument, DocCategory } from "@/lib/patient-data";
import { FileText, Pill, FileSignature, FlaskConical, ClipboardCheck, Stethoscope, Download, Eye, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const categoryMeta: Record<DocCategory, { icon: typeof FileText; tone: string }> = {
  Receita: { icon: Pill, tone: "bg-secondary/15 text-secondary" },
  Atestado: { icon: FileSignature, tone: "bg-primary/10 text-primary" },
  Exame: { icon: FlaskConical, tone: "bg-accent/40 text-foreground" },
  Laudo: { icon: Stethoscope, tone: "bg-destructive/10 text-destructive" },
  Relatório: { icon: ClipboardCheck, tone: "bg-success/15 text-success" },
};

const categories: ("Todos" | DocCategory)[] = ["Todos", "Receita", "Atestado", "Exame", "Laudo", "Relatório"];

export function DocumentsView() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todos");
  const list = filter === "Todos" ? documents : documents.filter((d) => d.category === filter);

  return (
    <div className="space-y-6">
      <SectionCard
        title="Meus documentos"
        eyebrow="Receitas, atestados e exames"
        icon={<FileText className="h-5 w-5" />}
      >
        <p className="text-sm text-muted-foreground -mt-2 mb-4">
          Todos os seus documentos clínicos em um só lugar. Toque para visualizar, baixar ou compartilhar.
        </p>
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-2">
          {categories.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {list.map((d) => (
            <DocCard key={d.id} doc={d} />
          ))}
          {list.length === 0 && (
            <li className="col-span-full text-center text-sm text-muted-foreground py-8">
              Nenhum documento nesta categoria.
            </li>
          )}
        </ul>
      </SectionCard>
    </div>
  );
}

function DocCard({ doc }: { doc: PatientDocument }) {
  const { icon: Icon, tone } = categoryMeta[doc.category];
  return (
    <li className="rounded-2xl border border-border bg-gradient-soft p-4 hover:shadow-card hover:border-secondary/50 transition-smooth">
      <div className="flex items-start gap-3">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{doc.category}</span>
            <span>·</span>
            <span>{doc.date}</span>
          </div>
          <h4 className="font-bold text-foreground mt-1 leading-tight">{doc.title}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.summary}</p>
          <p className="text-[10px] text-muted-foreground mt-2">
            {doc.issuer} · {doc.pages} {doc.pages > 1 ? "páginas" : "página"} · {doc.size}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <DocAction icon={<Eye className="h-3.5 w-3.5" />} label="Ver" onClick={() => toast.success(`Abrindo ${doc.title}`)} />
        <DocAction icon={<Download className="h-3.5 w-3.5" />} label="Baixar" onClick={() => toast.success("Iniciando download…")} />
        <DocAction icon={<Share2 className="h-3.5 w-3.5" />} label="Enviar" onClick={() => toast.success("Compartilhando…")} />
      </div>
    </li>
  );
}

function DocAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground bg-surface border border-border hover:text-foreground hover:border-secondary transition-smooth"
    >
      {icon}
      {label}
    </button>
  );
}
