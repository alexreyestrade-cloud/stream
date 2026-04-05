import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function addCategory(formData: FormData) {
  "use server";
  await connectDB();
  const name = formData.get("name")?.toString();
  const slug = formData.get("slug")?.toString();
  if (name && slug) {
    await Category.create({ name, slug });
    revalidatePath("/admin/products");
  }
}

async function addProduct(formData: FormData) {
  "use server";
  await connectDB();
  const name = formData.get("name")?.toString();
  const desc = formData.get("description")?.toString();
  const price = Number(formData.get("price"));
  const categoryId = formData.get("category")?.toString();
  const brand = formData.get("brand")?.toString();

  if (name && desc && categoryId && price > 0) {
    await Product.create({
      name,
      description: desc,
      price,
      category: categoryId,
      brand,
    });
    revalidatePath("/admin/products");
    revalidatePath("/");
  }
}

export default async function ProductsAdminPage() {
  await connectDB();
  const categories = await Category.find({}).lean();
  const products = await Product.find({}).populate("category").lean();

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Gestión de Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* CATEGORIES FORM */}
        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6">Crear Categoría</h2>
          <form action={addCategory} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Nombre (ej. Streaming)</label>
              <input required name="name" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Slug (ej. streaming)</label>
              <input required name="slug" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 w-full">
              Guardar Categoría
            </button>
          </form>
          
          <div className="mt-8 border-t border-white/10 pt-4">
            <h3 className="font-medium text-white/60 mb-2">Categorías Actuales</h3>
            <ul className="space-y-2">
              {categories.map((c: any) => (
                <li key={c._id.toString()} className="text-sm bg-white/5 p-2 rounded">{c.name} - /{c.slug}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* PRODUCTS FORM */}
        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6">Crear Producto</h2>
          <form action={addProduct} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Nombre (ej. Netflix 1 Pantalla)</label>
              <input required name="name" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Descripción</label>
              <input required name="description" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-1">Precio (USD/MXN)</label>
                <input required type="number" name="price" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-white/60 mb-1">Marca (Netflix, Spotify...)</label>
                <input required name="brand" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Selecciona la Categoría</label>
              <select required name="category" className="w-full bg-[#131313] border border-white/10 rounded-lg px-4 py-2 text-white/80">
                <option value="">Seleccionar...</option>
                {categories.map((c: any) => (
                  <option key={c._id.toString()} value={c._id.toString()}>{c.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" disabled={categories.length === 0} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Guardar Producto
            </button>
          </form>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/10 mt-12">
        <h2 className="text-xl font-bold mb-6">Productos Disponibles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p: any) => (
             <div key={p._id.toString()} className="bg-white/5 p-4 rounded-xl">
               <h3 className="font-bold">{p.name}</h3>
               <p className="text-sm text-white/50">${p.price} • {p.brand}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
