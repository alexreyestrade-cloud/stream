"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Tv, MonitorPlay, Palette } from "lucide-react";
import { motion } from "framer-motion";

const getBrandLogo = (brand: string = "", name: string = "") => {
  const text = `${brand} ${name}`.toLowerCase();
  if (text.includes("netflix")) return "https://cdn.simpleicons.org/netflix/E50914";
  if (text.includes("disney")) return "https://cdn.simpleicons.org/disneyplus/FFFFFF";
  if (text.includes("hbo") || text.includes("max")) return "https://cdn.simpleicons.org/hbo/FFFFFF";
  if (text.includes("spotify")) return "https://cdn.simpleicons.org/spotify/1DB954";
  if (text.includes("paramount")) return "https://cdn.simpleicons.org/paramountplus/0064FF";
  if (text.includes("youtube")) return "https://cdn.simpleicons.org/youtube/FF0000";
  if (text.includes("apple")) return "https://cdn.simpleicons.org/apple/FFFFFF";
  return null;
};

export default function CatalogClient({ categories, products }: { categories: any[], products: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category?._id === activeCategory);

  return (
    <section id="catalogo" className="w-full max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold mb-4"
        >
          Catálogo <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">Premium VIP</span>
        </motion.h2>
        <p className="text-white/50 text-lg">Selecciona tu servicio y obtén acceso instantáneo.</p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full border font-medium transition-all ${
              activeCategory === "all" 
                ? "border-amber-500/50 bg-amber-500/20 text-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                : "border-white/10 bg-[#111] text-white/50 hover:bg-white/5 hover:text-white"
            }`}
          >
            Todos
          </button>
          {categories.map((cat: any) => (
            <button 
              key={cat._id.toString()} 
              onClick={() => setActiveCategory(cat._id)}
              className={`px-6 py-2 rounded-full border font-medium transition-all ${
                activeCategory === cat._id 
                  ? "border-amber-500/50 bg-amber-500/20 text-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                  : "border-white/10 bg-[#111] text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-white/40">No hay productos en esta categoría.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod: any, idx: number) => {
          return (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               key={prod._id.toString()} 
               className="relative group rounded-3xl p-6 flex flex-col bg-[#050505] shadow-[0_4px_20px_-10px_rgba(245,158,11,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)] border border-amber-500/30 hover:border-amber-500/60"
            >

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] p-2 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                    {(() => {
                      const finalLogo = prod.logo || getBrandLogo(prod.brand, prod.name);
                      if (finalLogo) {
                        return (
                          <img 
                            src={finalLogo} 
                            alt={prod.brand} 
                            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)] transition-all" 
                          />
                        );
                      }
                      
                      const t = `${prod.brand} ${prod.name}`.toLowerCase();
                      const fallbackStyle = "w-8 h-8 text-amber-500/80 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]";
                      
                      if (t.includes("iptv")) return <Tv className={fallbackStyle} />;
                      if (t.includes("prime") || t.includes("amazon")) return <MonitorPlay className={fallbackStyle} />;
                      if (t.includes("canva")) return <Palette className={fallbackStyle} />;
                      
                      return <span className="font-bold text-2xl text-amber-500/80 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">{prod.name.charAt(0)}</span>;
                    })()}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">${prod.price}</span>
                    <span className="block text-xs text-white/40 font-medium tracking-widest uppercase">MXN</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{prod.name}</h3>
                <p className="text-sm text-white/50 leading-relaxed min-h-[40px] mb-6">
                  {prod.description}
                </p>
              </div>

              <Link href={`/checkout/${prod._id}`} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-300 hover:to-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                Adquirir Cuenta <ArrowRight className="w-4 h-4" />
              </Link>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
