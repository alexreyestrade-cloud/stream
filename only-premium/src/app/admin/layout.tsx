import Link from "next/link";
import { LayoutDashboard, Package, KeyRound, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#131313] p-6 flex flex-col hidden lg:flex">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-indigo-500 font-bold flex items-center justify-center">A</div>
          <span className="font-bold tracking-widest text-white/50">ADMIN</span>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-white/70 hover:text-white">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-white/70 hover:text-white">
            <Package size={20} /> Productos
          </Link>
          <Link href="/admin/accounts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-white/70 hover:text-white">
            <KeyRound size={20} /> Cuentas
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-white/70 hover:text-white">
            <ShoppingCart size={20} /> Órdenes
          </Link>
        </nav>

        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition text-white/50 mt-auto">
          <LogOut size={20} /> Volver a Tienda
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
