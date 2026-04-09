import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export default async function OrdersAdminPage() {
  await connectDB();
  
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("product")
    .lean();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Listado de Órdenes</h1>
      
      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#131313] border-b border-white/10 text-white/50">
            <tr>
              <th className="p-4 font-medium">ID de Orden</th>
              <th className="p-4 font-medium">Producto</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Monto</th>
              <th className="p-4 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr key={order._id.toString()} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 font-mono text-xs">{order._id.toString()}</td>
                  <td className="p-4">{order.product?.name || "Desconocido"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === "completed" ? "bg-green-500/20 text-green-400" :
                      order.status === "failed" ? "bg-red-500/20 text-red-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">${order.amount}</td>
                  <td className="p-4 text-white/50">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/40">Sin órdenes en el sistema</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
