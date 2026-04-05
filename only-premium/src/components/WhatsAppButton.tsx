"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const defaultText = "Hola, me gustaría más información de Only Premium.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultText
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 group"
    >
      <MessageCircle size={32} />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-[#1a1a1a] text-sm text-white px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}
