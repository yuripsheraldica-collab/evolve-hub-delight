import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Login } from "@/components/Login";
import { Dashboard } from "@/components/Dashboard";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Instituto Evolução · Área do Paciente" },
      {
        name: "description",
        content:
          "Acompanhe sua evolução clínica, conduta terapêutica e relatórios no Instituto Evolução — Centro de Cuidados.",
      },
      { name: "theme-color", content: "#0f1c2e" },
    ],
  }),
});

function Index() {
  const [logged, setLogged] = useState(false);
  return (
    <>
      {logged ? <Dashboard onLogout={() => setLogged(false)} /> : <Login onLogin={() => setLogged(true)} />}
      <Toaster position="top-center" richColors />
    </>
  );
}
