import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Account from "@/models/Account";
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
    revalidatePath("/admin/accounts");
  }
}

async function editProduct(formData: FormData) {
  "use server";
  await connectDB();
  const id = formData.get("id")?.toString();
  const price = Number(formData.get("price"));
  const description = formData.get("description")?.toString();
  
  if (id && price > 0 && description) {
    await Product.findByIdAndUpdate(id, { price, description });
    revalidatePath("/admin/products");
    revalidatePath("/");
  }
}

async function addAccounts(formData: FormData) {
  "use server";
  await connectDB();
  const productId = formData.get("productId")?.toString();
  const rawText = formData.get("rawText")?.toString();

  if (productId && rawText) {
    const lines = rawText.split('\n').map((l: string) => l.trim()).filter((l: string) => l !== "");
    const accountsToInsert = [];

    for (const line of lines) {
      let email = line;
      let password = "";
      if (line.includes(':')) {
        [email, password] = line.split(':');
      } else if (line.includes('|')) {
        [email, password] = line.split('|');
      }

      accountsToInsert.push({
        email: email.trim(),
        password: password ? password.trim() : "",
        credentials: line,
        product: productId,
        status: "available",
      });
    }

    if (accountsToInsert.length > 0) {
      await Account.insertMany(accountsToInsert);
      revalidatePath("/admin/products");
      revalidatePath("/admin");
    }
  }
}

export default async function ProductsAdminPage() {
  await connectDB();
  const categories = await Category.find({}).lean();
  const products = await Product.find({}).populate("category").lean();
  
  const availableCountsInfo = await Account.aggregate([
    { $match: { status: "available" } },
    { $group: { _id: "$product", count: { $sum: 1 } } }
  ]);
  const countsMap = availableCountsInfo.reduce((acc: any, curr: any) => ({ ...acc, [curr._id.toString()]: curr.count }), {});

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Gestión de Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            <button type="submit" className="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 w-full">
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
            <button type="submit" disabled={categories.length === 0} className="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 w-full disabled:opacity-50 disabled:cursor-not-allowed">
              Guardar Producto
            </button>
          </form>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/10 mt-12">
        <h2 className="text-xl font-bold mb-6">Productos Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p: any) => {
             const stock = countsMap[p._id.toString()] || 0;
             return (
               <div key={p._id.toString()} className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col justify-between">
                 <form action={editProduct} className="flex flex-col gap-3 mb-4">
                   <input type="hidden" name="id" value={p._id.toString()} />
                   <div>
                     <h3 className="font-bold text-lg text-white">{p.name}</h3>
                     <p className="text-xs text-white/40 mb-2">{p.brand}</p>
                   </div>
                   
                   <div>
                     <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1 block">Precio (MXN)</label>
                     <input name="price" defaultValue={p.price} type="number" required className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-1.5 text-sm text-slate-300 font-bold focus:border-slate-500 outline-none" />
                   </div>

                   <div>
                     <label className="text-[10px] text-white/40 uppercase tracking-wider mb-1 block">Descripción breve</label>
                     <input name="description" defaultValue={p.description} required className="w-full bg-[#111] border border-white/10 rounded-md px-3 py-1.5 text-xs text-white focus:border-slate-500 outline-none" />
                   </div>

                   <button type="submit" className="mt-2 bg-white/5 hover:bg-slate-500 text-white/70 hover:text-white border border-white/10 rounded-md py-1.5 text-xs font-bold transition-all w-full">
                     Actualizar
                   </button>
                 </form>

                 <div className="flex bg-[#111] border border-white/10 rounded-lg p-3 text-sm items-center justify-between">
                   <span className="text-white/60">Stock Disponible:</span>
                   <span className="font-bold text-white">{stock}</span>
                 </div>
               </div>
             );
          })}
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-2">Paso 3: Cargar Cuentas (Stock)</h2>
        <p className="text-white/60 mb-6">Pega aquí los correos y contraseñas que compraste. Cuando un cliente pague, el sistema le entregará automáticamente una de aquí y la descontará.</p>
        
        <form action={addAccounts} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-medium">1. Elige a qué producto vas a subirle stock</label>
            <select required name="productId" className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white">
              <option value="">Seleccionar Producto...</option>
              {products.map((p: any) => (
                <option key={p._id.toString()} value={p._id.toString()}>{p.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-slate-300 mb-2 font-medium">2. Pega la lista de correos (Formato: correo:contraseña) 1 por línea</label>
            <textarea 
              required 
              name="rawText" 
              rows={6}
              className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder:text-white/20"
              placeholder="netflix1@gmail.com:mipassword123&#10;netflix2@gmail.com:otrapassword456"
            />
          </div>
          <button type="submit" disabled={products.length === 0} className="bg-slate-700 text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-600 w-full transition-all disabled:opacity-50">
            Añadir Stock al Inventario Automático
          </button>
        </form>
      </div>

    </div>
  );
}
