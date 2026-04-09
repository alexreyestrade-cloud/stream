"use client";

import React from "react";

export default function HeroCarousel() {
  const images = [
    "https://i.pinimg.com/1200x/3a/8f/16/3a8f1622b57b85ba5dd852c5b43a13de.jpg",
    "https://i.pinimg.com/1200x/67/e8/9d/67e89dd772d73cb7a859dab501f75bed.jpg",
    "https://i.pinimg.com/1200x/c2/a4/33/c2a4332d3ae6fe4d624c96be4713fce5.jpg",
    "https://i.pinimg.com/1200x/43/c9/1a/43c91a6d9a150992a64dcdfa1ffebb38.jpg",
    "https://i.pinimg.com/1200x/32/c8/4b/32c84ba9513b1e07fc0fd6905814e900.jpg",
    "https://i.pinimg.com/1200x/b5/d1/df/b5d1dfe7ff83d8c53187320d8ca84b1e.jpg",
  ];

  return (
    <div className="w-full overflow-hidden bg-[#050505] border-y border-white/5 py-8 mt-12 animate-marquee-hover relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
      
      <div className="flex w-max animate-marquee gap-8 items-center px-4">
        {[...images, ...images, ...images].map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] md:w-[400px] h-[160px] md:h-[220px] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(245,158,11,0.15)] border border-amber-500/10 relative group">
            <img 
              src={img} 
              alt={`Servicio Premium ${i}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
