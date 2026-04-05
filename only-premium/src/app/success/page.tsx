import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Account from "@/models/Account";
import Product from "@/models/Product";
import { CheckCircle, Copy, AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect("/");
  }

  await connectDB();
  
  // Notice we use checkoutSessionId to find the order
  const order = await Order.findOne({ checkoutSessionId: sessionId })
    .populate("account")
    .populate("product")
    .lean();

  if (!order || order.status !== "completed") {
    // If it's still pending, webhook might be delayed.
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-6" />
        <h1 className="text-3xl font-bold mb-4">Procesando tu orden...</h1>
        <p className="text-white/60 mb-8 max-w-lg">
          Estamos confirmando tu pago y asignando tu cuenta. Si acabas de pagar, refresca esta página en unos segundos.
        </p>
      </div>
    );
  }

  const account = order.account as any;
  const product = order.product as any;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <CheckCircle size={40} />
      </div>
      
      <h1 className="text-4xl font-extrabold mb-4">¡Pago Confirmado!</h1>
      <p className="text-xl text-white/50 mb-12">
        Gracias por tu compra. Aquí tienes las credenciales de tu cuenta para <strong>{product?.name}</strong>.
      </p>

      {account ? (
        <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          
          <div className="mb-6">
            <span className="block text-sm text-white/40 mb-1">Correo Electrónico (Usuario)</span>
            <div className="flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3">
              <span className="font-mono">{account.email}</span>
            </div>
          </div>

          <div className="mb-8">
            <span className="block text-sm text-white/40 mb-1">Contraseña</span>
            <div className="flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3">
              <span className="font-mono tracking-wider">{account.password || account.credentials}</span>
            </div>
          </div>
          
          <div className="text-sm text-indigo-300 bg-indigo-500/10 p-4 rounded-xl flex gap-3">
            <AlertCircle className="shrink-0 w-5 h-5" />
            <p>Guarda estas credenciales en un lugar seguro. No las compartas con nadie.</p>
          </div>
        </div>
      ) : (
        <div className="glass-card border-red-500/30 p-8 text-red-200">
          <h2 className="text-xl font-bold">Inconveniente de Stock</h2>
          <p>Tu pago fue recibido pero nos quedamos sin stock de entrega automática. Por favor contáctanos por WhatsApp para enviarte tu cuenta manualmente.</p>
        </div>
      )}

      <div className="mt-12">
        <Link href="/" className="text-white/50 hover:text-white underline underline-offset-4">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
