interface LogoProps {
  variant?: "light" | "dark";
}

export default function Logo({ variant = "dark" }: LogoProps) {
  return (
    <div className="flex items-center gap-3.5 select-none">
      {/* NWS Logo — PNG only */}
      <img
        src="/nws-logo.png"
        alt="Novelty Web Solutions"
        className="w-14 h-14 object-contain shrink-0"
        style={variant === "light" ? { filter: "brightness(0) invert(1)" } : {}}
      />

      {/* Brand Text */}
      <div className="flex flex-col text-left font-sans">
        <span
          className="text-2xl font-black tracking-tight leading-none"
          style={{ color: variant === "light" ? "#ffffff" : "#0c1a2e" }}
        >
          NWS
        </span>
        <span
          className="text-[9.5px] font-bold tracking-[0.22em] uppercase mt-1 leading-none"
          style={{ color: variant === "light" ? "#94a3b8" : "#475569" }}
        >
          Novelty Web Solutions
        </span>
      </div>
    </div>
  );
}
