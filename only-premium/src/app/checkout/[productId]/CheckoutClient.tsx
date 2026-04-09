"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CheckoutClient({ productId, product }: { productId: string, product: any }) {
  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "529612794095"; // Fallback to provided number that seems to be in use.
    const text = `Hola, me gustaría comprar la cuenta de ${product?.name || "Premium"} por $${product?.price || 0} MXN.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
      {/* Columna Izquierda: Formulario */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-white/50 mb-8">Continúa tu compra a través de WhatsApp para recibir tu cuenta inmediatamente.</p>

        <form onSubmit={handleWhatsAppRedirect} className="space-y-8">
          <button
            type="submit"
            className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20b858] transition"
          >
            Comprar mediante WhatsApp
            <ArrowRight size={20} />
          </button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 mt-4">
            <ShieldCheck size={16} /> Compra rápida y segura
          </div>
        </form>
      </div>

      {/* Columna Derecha: Order Summary */}
      <div className="w-full md:w-80">
        <div className="glass-card rounded-2xl p-6 sticky top-24 border border-white/10 bg-[#111]">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          <div className="border-t border-white/10 py-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60">Producto</span>
              <span className="font-medium text-right">{product?.name || "Cargando..."}</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span className="text-emerald-400">${product?.price || 0} MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
