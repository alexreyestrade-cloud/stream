import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] pt-16 pb-8 px-6 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <span className="font-bold text-xl tracking-tight text-white">Only Premium</span>
          </div>
          <p className="text-white/40 mb-6 max-w-sm leading-relaxed">
            Plataforma de rápido acceso a servicios premium. Evita complicaciones y disfruta tus series y música al instante.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Lock className="w-3 h-3" /> Pagos cifrados de extremo a extremo
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Plataforma</h4>
          <ul className="space-y-3 text-white/50">
            <li><Link href="/#catalogo" className="hover:text-white transition">Catálogo</Link></li>
            <li><Link href="/" className="hover:text-white transition">Reseñas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Soporte</h4>
          <ul className="space-y-3 text-white/50">
            <li>
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-amber-400 transition"
              >
                Atención por WhatsApp
              </a>
            </li>
            <li><a href="#" className="hover:text-white transition">Política de Reembolsos</a></li>
            <li><a href="#" className="hover:text-white transition">Términos del Servicio</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 pb-16 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30">
        <p className="text-center md:text-left">© {new Date().getFullYear()} Only Premium. Todos los derechos reservados.</p>
        <div className="flex flex-wrap justify-center gap-4">
           <img src="https://i.pinimg.com/1200x/0f/86/07/0f86075d899c9069b235c23b792d70ef.jpg" alt="Visa" className="h-10 sm:h-12 rounded-xl border border-white/10 object-contain" />
           <img src="https://i.pinimg.com/1200x/cf/01/7c/cf017c3df4b4b6ce716a19b6d146a93c.jpg" alt="Mastercard" className="h-10 sm:h-12 rounded-xl border border-white/10 object-contain" />
           <img src="https://i.pinimg.com/1200x/90/18/7b/90187bfdca2c574b5f15b1aee774e020.jpg" alt="Mercado Pago" className="h-10 sm:h-12 rounded-xl border border-white/10 bg-white object-contain" />
           <img src="https://i.pinimg.com/1200x/48/d1/13/48d113ba4c6086e300afd2bb35a96e90.jpg" alt="OXXO" className="h-10 sm:h-12 rounded-xl border border-white/10 bg-white object-contain" />
        </div>
      </div>
    </footer>
  );
}
