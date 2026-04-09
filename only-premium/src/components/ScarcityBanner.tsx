import { ClockAlert } from "lucide-react";

export default function ScarcityBanner() {
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 text-center py-2 px-4 flex items-center justify-center gap-2 text-sm backdrop-blur-sm sticky top-0 z-50 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
      <ClockAlert className="w-4 h-4 text-amber-400 animate-pulse" />
      <span className="text-amber-100 font-medium">
        <strong className="text-amber-400 font-black">Alta demanda hoy:</strong> Nos quedan pocas cuentas disponibles para entrega inmediata.
      </span>
    </div>
  );
}
