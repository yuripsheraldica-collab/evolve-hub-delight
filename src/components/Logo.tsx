import logo from "@/assets/logo-evolucao.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "h-8",
  md: "h-12",
  lg: "h-20",
  xl: "h-28",
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Instituto Evolução — Fitness · Health"
      className={`${sizeMap[size]} w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
