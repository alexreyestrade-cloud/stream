import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function deleteAccount(formData: FormData) {
  "use server";
  await connectDB();
  const id = formData.get("id")?.toString();
  if (id) {
    await Account.findByIdAndDelete(id);
    revalidatePath("/admin/accounts");
    revalidatePath("/admin/products");
  }
}

export default async function AccountsAdminPage() {
  await connectDB();
  // Fetch all accounts and populate product mapping
  // We can also sort by mostly recent
  const accounts = await Account.find({}).populate("product").sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gestión de Cuentas Individuales</h1>
      <p className="text-white/60">Aquí puedes ver y eliminar las cuentas individuales que has subido. Para subir nuevas cuentas masivamente, ve a la sección de Productos.</p>

      <div className="glass-card p-8 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-6">Inventario de Cuentas</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/60 text-sm">
                <th className="py-3 px-4">Producto</th>
                <th className="py-3 px-4">Correo / Credencial</th>
                <th className="py-3 px-4">Contraseña</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {accounts.map((acc: any) => (
                <tr key={acc._id.toString()} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-sm font-medium text-white">
                    {acc.product?.name || "Producto Desconocido"}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-300">
                    {acc.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-300 font-mono">
                    {acc.password || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${acc.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {acc.status === 'available' ? 'Disponible' : 'Vendida'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <form action={deleteAccount}>
                      <input type="hidden" name="id" value={acc._id.toString()} />
                      <button 
                        type="submit"
                        className="text-red-400 hover:text-red-300 text-sm font-medium px-3 py-1 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition"
                      >
                        Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white/40">
                    No hay cuentas registradas en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
