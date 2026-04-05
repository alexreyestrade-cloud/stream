import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Account from "@/models/Account";
import { DollarSign, ShoppingCart, Users, Key } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();

  // Metrics
  const totalOrders = await Order.countDocuments({ status: "completed" });
  const revenueData = await Order.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
  
  const availableAccounts = await Account.countDocuments({ status: "available" });
  const soldAccounts = await Account.countDocuments({ status: "sold" });

  const recentOrders = await Order.find({ status: "completed" })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("product")
    .lean();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resumen General</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl"><DollarSign /></div>
            <h3 className="text-white/60">Ingresos Totales</h3>
          </div>
          <span className="text-3xl font-bold">${totalRevenue}</span>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-xl"><ShoppingCart /></div>
            <h3 className="text-white/60">Órdenes</h3>
          </div>
          <span className="text-3xl font-bold">{totalOrders}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Key /></div>
            <h3 className="text-white/60">Cuentas Disp.</h3>
          </div>
          <span className="text-3xl font-bold text-blue-400">{availableAccounts}</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/20 text-red-400 rounded-xl"><Users /></div>
            <h3 className="text-white/60">Cuentas Vendidas</h3>
          </div>
          <span className="text-3xl font-bold">{soldAccounts}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Últimas Ventas</h2>
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-[#131313] border-b border-white/10 text-white/50">
            <tr>
              <th className="p-4 font-medium">Producto</th>
              <th className="p-4 font-medium">Cliente</th>
              <th className="p-4 font-medium">Monto</th>
              <th className="p-4 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <tr key={order._id.toString()} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4">{order.product?.name || "Desconocido"}</td>
                  <td className="p-4 text-white/70">{order.customerEmail}</td>
                  <td className="p-4 font-medium text-green-400">${order.amount}</td>
                  <td className="p-4 text-white/50">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/40">Sin ventas aún</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
