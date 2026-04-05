import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import HeroSection from "@/components/HeroSection";

export const revalidate = 60; // ISR cache

export default async function Home() {
  await connectDB();
  
  // Fetch lists
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const products = await Product.find({}).populate("category").sort({ price: 1 }).lean();

  // If no DB products yet, show placeholders so the UI isn't broken
  const mockProducts = products.length > 0 ? products : [
    { _id: "1", name: "Netflix Premium", description: "1 Pantalla UHD. No caídas.", price: 69, brand: "Netflix", durationDays: 30 },
    { _id: "2", name: "Spotify Premium", description: "Cuenta Individual, 1 mes.", price: 45, brand: "Spotify", durationDays: 30 },
    { _id: "3", name: "Disney+", description: "1 Pantalla, Perfil Privado", price: 59, brand: "Disney", durationDays: 30 },
    { _id: "4", name: "Canva Pro", description: "Enlace de invitación directo", price: 35, brand: "Canva", durationDays: 365 },
  ];

  return (
    <div className="flex flex-col items-center">
      <HeroSection />

      {/* Seccion de Categorías Dinámicas (Opcional visual) */}
      <section className="w-full max-w-7xl px-6 py-12 flex space-x-4 overflow-x-auto no-scrollbar">
        <button className="px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-medium whitespace-nowrap hover:bg-indigo-500/20 transition">
          Todos los Productos
        </button>
        {categories.map((cat: any) => (
          <button key={cat._id.toString()} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 font-medium whitespace-nowrap hover:bg-white/10 transition">
            {cat.name}
          </button>
        ))}
      </section>

      {/* Grid de Productos */}
      <section className="w-full max-w-7xl px-6 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockProducts.map((prod: any) => (
          <div key={prod._id.toString()} className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative group overflow-hidden transition-all duration-300">
            {/* Glow background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center font-bold text-2xl mb-2 shadow-inner border border-white/5">
              {prod.brand ? prod.brand.substring(0,1) : "P"}
            </div>
            
            <div className="z-10">
              <h3 className="text-xl font-bold mb-1">{prod.name}</h3>
              <p className="text-sm text-white/50 mb-4 h-10">{prod.description}</p>
            </div>
            
            <div className="mt-auto flex items-center justify-between z-10 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-sm text-white/40">{prod.durationDays} días</span>
                <span className="text-2xl font-bold">${prod.price}</span>
              </div>
              <Link 
                href={`/checkout/${prod._id}`}
                className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:bg-indigo-400 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
              >
                Comprar
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
