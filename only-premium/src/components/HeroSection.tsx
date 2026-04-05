"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Plataforma Premium de Cuentas
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 glow-text text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 leading-tight">
          ONLY PREMIUM
        </h1>
        
        <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto">
          Cuentas premium al mejor precio, entrega <span className="text-white">inmediata</span> y automática.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="group relative flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            onClick={() => {
              window.scrollTo({ top: 800, behavior: 'smooth' });
            }}
          >
            Comprar ahora
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
            Ver Catálogo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
