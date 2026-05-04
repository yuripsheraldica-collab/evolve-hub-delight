import { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  icon?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, icon, eyebrow, children, className = "" }: SectionCardProps) {
  return (
    <section
      className={`bg-surface rounded-2xl shadow-card border border-border/60 p-5 sm:p-6 ${className}`}
    >
      {(title || eyebrow) && (
        <header className="flex items-center gap-3 mb-5">
          {icon && (
            <div className="h-10 w-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div>
            {eyebrow && (
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}
