"use client";

import { Zap, ShieldCheck, MessageCircleHeart, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesAndTrust() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-slate-300" />,
      title: "Entrega Ultrarrápida",
      desc: "Segundos después de que Stripes da luz verde, la tarjeta con tus accesos aparece mágicamente en tu pantalla."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-zinc-300" />,
      title: "Garantía Antisuspensiones",
      desc: "Nuestras membresías son 100% legales y facturadas. Adiós a cuentas de origen dudoso que se caen a los 3 días."
    },
    {
      icon: <MessageCircleHeart className="w-6 h-6 text-gray-300" />,
      title: "Soporte VIP Humano",
      desc: "Nada de bots molestos. Te atendemos por WhatsApp de lunes a domingo para resolverte cualquier inconveniente de inmediato."
    },
    {
      icon: <LockKeyhole className="w-6 h-6 text-slate-400" />,
      title: "Privacidad Absoluta",
      desc: "No almacenamos los datos de tus tarjetas de crédito y no necesitas crear pesadas cuentas de usuario en nuestra plataforma para comprar."
    }
  ];

  return (
    <section className="w-full py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={i} 
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-amber-500/10 hover:border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.02)] hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-amber-500/20 shadow-[__0_10px_rgba(245,158,11,0.1)] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-300 mb-2">{f.title}</h4>
              <p className="text-xs text-amber-500/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
