import { MousePointerClick, CreditCard, KeyRound } from "lucide-react";

const STEPS = [
  {
    icon: <MousePointerClick className="w-8 h-8 text-violet-400" />,
    title: "1. Elige tu Plan",
    desc: "Selecciona el servicio que necesitas (Netflix, Spotify, etc.) de nuestro catálogo premium.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-fuchsia-400" />,
    title: "2. Pago Seguro",
    desc: "Paga con confianza usando tu tarjeta mediante nuestro procesador Stripe cifrado al 100%.",
  },
  {
    icon: <KeyRound className="w-8 h-8 text-orange-400" />,
    title: "3. Acceso Inmediato",
    desc: "El sistema despliega tu cuenta y contraseña en pantalla en menos de 1 segundo.",
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Cero Fricción. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Cero Esperas.</span></h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Nuestro bot se encarga de todo. Una vez confirmada tu tarjeta, se te asigna stock de manera automática e invisible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Línea conectora de fondo para desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-fuchsia-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-white/50 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
