import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import HeroSection from "@/components/HeroSection";
import HeroCarousel from "@/components/HeroCarousel";
import ScarcityBanner from "@/components/ScarcityBanner";
import FeaturesAndTrust from "@/components/FeaturesAndTrust";
import Footer from "@/components/Footer";
import CatalogClient from "@/components/CatalogClient";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable ISR cache to ensure stock is always fresh

export default async function Home() {
  let categories: any[] = [];
  let products: any[] = [];
  let dbError = null;

  try {
    await connectDB();
    categories = await Category.find({}).sort({ name: 1 }).lean();
    products = await Product.find({}).populate("category").sort({ price: 1 }).lean();
  } catch (error: any) {
    console.error("Database connection failed:", error);
    dbError = error.message;
  }

  // If no DB products yet, show placeholders so the UI isn't broken
  const displayProducts = products.length > 0 ? products : [
    { _id: "1", name: "Netflix Premium", description: "1 Pantalla UHD. No caídas.", price: 69, brand: "Netflix", durationDays: 30, logo: "/netflix.png" },
    { _id: "2", name: "Spotify Premium", description: "Cuenta Individual, 1 mes.", price: 45, brand: "Spotify", durationDays: 30, logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { _id: "3", name: "Disney+", description: "1 Pantalla, Perfil Privado", price: 59, brand: "Disney", durationDays: 30, logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
    { _id: "4", name: "Canva Pro", description: "Enlace de invitación directo", price: 35, brand: "Canva", durationDays: 365, logo: "/canva.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <ScarcityBanner />
      
      <main className="flex-grow flex flex-col items-center">
        <HeroSection />
        <HeroCarousel />

        {dbError && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-xl max-w-4xl mx-auto my-8">
            <strong>Backend Error:</strong> {dbError}
          </div>
        )}

        {/* CATÁLOGO DE PRODUCTOS */}
        <CatalogClient 
          categories={categories.map(c => ({...c, _id: c._id.toString()}))} 
          products={displayProducts.map(p => ({
            ...p, 
            _id: p._id.toString(),
            category: p.category ? {...p.category, _id: p.category._id.toString()} : null 
          }))} 
        />

        <FeaturesAndTrust />

      </main>

      <Footer />
    </div>
  );
}
