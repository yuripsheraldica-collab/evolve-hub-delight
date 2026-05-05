import { useEffect, useState } from "react";
import { Bell, BellRing, FileText, TrendingUp, AlertTriangle, Clock, Check, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { notifications as seed, AppNotification, NotificationType } from "@/lib/patient-data";

const typeIcon: Record<NotificationType, typeof Bell> = {
  lembrete: Clock,
  documento: FileText,
  evolucao: TrendingUp,
  alerta: AlertTriangle,
};

const typeColor: Record<NotificationType, string> = {
  lembrete: "bg-secondary/15 text-secondary",
  documento: "bg-primary/10 text-primary",
  evolucao: "bg-success/15 text-success",
  alerta: "bg-destructive/10 text-destructive",
};

export function useNotifications() {
  const [items, setItems] = useState<AppNotification[]>(seed);
  const unread = items.filter((n) => !n.read).length;
  const markAll = () => setItems((arr) => arr.map((n) => ({ ...n, read: true })));
  const toggle = (id: string) =>
    setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));
  return { items, unread, markAll, toggle };
}

export function NotificationBell({ count, onClick }: { count: number; onClick: () => void }) {
  const Icon = count > 0 ? BellRing : Bell;
  return (
    <button
      onClick={onClick}
      aria-label="Notificações"
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
    >
      <Icon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center shadow">
          {count}
        </span>
      )}
    </button>
  );
}

export function NotificationsPanel({
  open,
  onClose,
  items,
  onMarkAll,
  onRead,
}: {
  open: boolean;
  onClose: () => void;
  items: AppNotification[];
  onMarkAll: () => void;
  onRead: (id: string) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-surface shadow-elegant border-l border-border flex flex-col animate-in slide-in-from-right duration-300">
        <header className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">Notificações</h3>
            <p className="text-xs text-muted-foreground">
              {items.filter((i) => !i.read).length} não lidas
            </p>
          </div>
          <button
            onClick={onMarkAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80"
          >
            <CheckCheck className="h-4 w-4" /> Marcar todas
          </button>
        </header>
        <ul className="flex-1 overflow-y-auto divide-y divide-border">
          {items.map((n) => {
            const Icon = typeIcon[n.type];
            return (
              <li key={n.id}>
                <button
                  onClick={() => onRead(n.id)}
                  className={`w-full text-left px-5 py-4 flex gap-3 hover:bg-muted/50 transition-smooth ${
                    n.read ? "" : "bg-secondary/5"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center ${typeColor[n.type]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm ${n.read ? "font-medium text-foreground/80" : "font-bold text-foreground"}`}>
                        {n.title}
                      </p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 font-semibold uppercase tracking-wide">
                      {n.time}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <footer className="p-4 border-t border-border">
          <button
            onClick={async () => {
              if (!("Notification" in window)) {
                toast.error("Este navegador não suporta notificações.");
                return;
              }
              const perm = await Notification.requestPermission();
              if (perm === "granted") {
                new Notification("Instituto Evolução", {
                  body: "Notificações ativadas! Você receberá lembretes das suas sessões.",
                  icon: "/icon-192.png",
                });
                toast.success("Notificações push ativadas");
              } else {
                toast.error("Permissão negada nas configurações do navegador.");
              }
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-smooth"
          >
            <Check className="h-4 w-4" />
            Ativar notificações push
          </button>
        </footer>
      </aside>
    </div>
  );
}
