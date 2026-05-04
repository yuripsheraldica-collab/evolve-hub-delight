import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim().toLowerCase() === "teste" && pass === "teste") {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-surface/95 backdrop-blur-xl rounded-3xl shadow-elegant border border-white/40 p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size="xl" />
            <p className="mt-4 text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Centro de Cuidados
            </p>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Área do Paciente</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Entre com suas credenciais de acesso
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Usuário
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="seu usuário"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/30 outline-none transition-smooth text-foreground"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/30 outline-none transition-smooth text-foreground"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                Usuário ou senha incorretos.
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl transition-smooth hover:shadow-glow hover:bg-primary/90"
            >
              Entrar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground">
            Acesso de teste: usuário <span className="font-semibold text-secondary">teste</span> / senha{" "}
            <span className="font-semibold text-secondary">teste</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Instituto Evolução · Fitness · Health
        </p>
      </div>
    </div>
  );
}
