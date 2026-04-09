"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden">
      {/* Background ambient glows (Gold / Amber) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
          Acceso instantáneo 24/7
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 text-white leading-tight">
          Accede a cuentas <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500">premium en minutos</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
          Soporte 24/7 y entrega inmediata.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-black text-lg hover:from-amber-300 hover:to-yellow-400 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById('catalogo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Catálogo
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
