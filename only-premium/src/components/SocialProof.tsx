"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Alejandro G.",
    role: "Cliente Verificado",
    text: "Increíble. Pagué e inmediatamente me apareció la cuenta de Netflix en la pantalla. 10/10.",
  },
  {
    name: "María F.",
    role: "Cliente Verificada",
    text: "Llevaba meses batallando con cuentas que se caían. Aquí tengo garantía y soporte rápido. Recomendadísimo.",
  },
  {
    name: "Carlos T.",
    role: "Cliente Verificado",
    text: "El proceso de compra es literal de 10 segundos con tarjeta. Todo automatizado y perfecto.",
  }
];

export default function SocialProof() {
  return (
    <section className="w-full py-16 mb-12 border-b border-t border-white/5 bg-gradient-to-b from-transparent via-[#111]/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-white/40 font-medium tracking-widest text-sm uppercase mb-4">La comunidad habla</p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-fuchsia-500 text-fuchsia-500" />
            ))}
          </div>
          <p className="text-lg text-white/80 font-medium">Calificación perfecta basada en más de <span className="text-fuchsia-400 font-bold">1,000+ compras</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-violet-500 text-violet-500" />
                ))}
              </div>
              <p className="text-white/70 tracking-wide leading-relaxed mb-6">"{test.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center font-bold text-white">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-white">{test.name}</h4>
                  <p className="text-xs text-white/40">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LOGOS */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <Image src="/netflix.png" alt="Netflix" width={120} height={40} className="object-contain h-8 w-auto mix-blend-screen" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" width={100} height={40} className="object-contain h-8 w-auto" />
          <Image src="/canva.png" alt="Canva" width={100} height={40} className="object-contain h-8 w-auto" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney" width={120} height={40} className="object-contain h-10 w-auto brightness-0 invert" />
        </div>
      </div>
    </section>
  );
}
