"use client";

import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage({ params }: { params: { productId: string } }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"stripe" | "paypal" | "mercadopago">("stripe");
  
  // Since this is a client component, we'd normally fetch product details from an API via SWR or pass it from a parent.
  // For the sake of this UI we use placeholders or assume the user knows what they are buying.
  
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: params.productId,
          email,
          paymentMethod: method,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al iniciar checkout: " + data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
      {/* Columna Izquierda: Formulario */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-white/50 mb-8">Completa tus datos para recibir tu cuenta inmediatamente.</p>

        <form onSubmit={handleCheckout} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Correo Electrónico (Dónde recibirás tu cuenta)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#131313] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-4">
              Método de Pago
            </label>
            <div className="space-y-3">
              {/* Stripe */}
              <label className={`block flex items-center p-4 border rounded-xl cursor-pointer transition ${method === 'stripe' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#131313] border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" value="stripe" checked={method==='stripe'} onChange={() => setMethod('stripe')} className="hidden" />
                <CreditCard className={`w-6 h-6 mr-3 ${method === 'stripe' ? 'text-indigo-400' : 'text-white/50'}`} />
                <span className="flex-1 font-medium">Tarjeta de Crédito / Débito (Stripe)</span>
                {method === 'stripe' && <div className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-[#131313]" />}
              </label>

              {/* PayPal */}
              <label className={`block flex items-center p-4 border rounded-xl cursor-pointer transition ${method === 'paypal' ? 'bg-blue-500/10 border-blue-500' : 'bg-[#131313] border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" value="paypal" checked={method==='paypal'} onChange={() => setMethod('paypal')} className="hidden" />
                <div className="w-6 h-6 mr-3 flex items-center justify-center font-bold text-blue-400 text-xl">P</div>
                <span className="flex-1 font-medium">PayPal</span>
                {method === 'paypal' && <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-[#131313]" />}
              </label>

              {/* MercadoPago */}
              <label className={`block flex items-center p-4 border rounded-xl cursor-pointer transition ${method === 'mercadopago' ? 'bg-sky-500/10 border-sky-500' : 'bg-[#131313] border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" value="mercadopago" checked={method==='mercadopago'} onChange={() => setMethod('mercadopago')} className="hidden" />
                <div className="w-6 h-6 mr-3 flex items-center justify-center font-bold text-sky-400">MP</div>
                <span className="flex-1 font-medium">Mercado Pago</span>
                {method === 'mercadopago' && <div className="w-4 h-4 rounded-full bg-sky-500 border-2 border-[#131313]" />}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-400 hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Completar Pago"}
            {!loading && <ArrowRight size={20} />}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-white/40 mt-4">
            <ShieldCheck size={16} /> Pago 100% Seguro y Encriptado
          </div>
        </form>
      </div>

      {/* Columna Derecha: Order Summary */}
      <div className="w-full md:w-80">
        <div className="glass-card rounded-2xl p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          <div className="border-t border-white/10 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Producto</span>
              <span className="font-medium">Producto #{params.productId.substring(0,4)}...</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-indigo-400">Pagar ahora</span>
          </div>
        </div>
      </div>
    </div>
  );
}
