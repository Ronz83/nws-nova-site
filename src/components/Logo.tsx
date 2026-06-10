interface LogoProps {
  variant?: "light" | "dark";
}

export default function Logo({ variant = "dark" }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* NWS Logo — PNG only, CSS filter inverts to white for footer */}
      <img
        src="/nws-logo.png"
        alt="Novelty Web Solutions"
        className="w-10 h-10 object-contain shrink-0"
        style={variant === "light" ? { filter: "brightness(0) invert(1)" } : {}}
      />

      {/* Brand Text */}
      <div className="flex flex-col text-left font-sans">
        <span
          className="text-base font-black tracking-tight leading-none"
          style={{ color: variant === "light" ? "#ffffff" : "#0c1a2e" }}
        >
          NWS
        </span>
        <span
          className="text-[7.5px] font-black tracking-[0.25em] uppercase mt-1 leading-none"
          style={{ color: variant === "light" ? "#94a3b8" : "#475569" }}
        >
          Novelty Web Solutions
        </span>
      </div>
    </div>
  );
}
