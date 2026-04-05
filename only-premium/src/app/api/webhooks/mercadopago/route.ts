import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Account from "@/models/Account";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id"); // Este es el payment id

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Missing MP Token" }, { status: 400 });
    }

    if (topic === "payment" && id) {
      const client = new MercadoPagoConfig({ accessToken });
      const payment = new Payment(client);
      
      const paymentData = await payment.get({ id });
      
      // La referencia externa la mandamos al crear el link de pago (external_reference) que es nuestro Order ID.
      const orderId = paymentData.external_reference;

      if (paymentData.status === "approved" && orderId) {
        await connectDB();
        const order = await Order.findById(orderId);

        if (order && order.status === "pending") {
          // Lógica Atómica
          const account = await Account.findOneAndUpdate(
            { product: order.product, status: "available" },
            { $set: { status: "sold" } },
            { new: true, sort: { createdAt: 1 } }
          );

          if (account) {
            order.account = account._id;
            order.status = "completed";
            await order.save();
          } else {
            order.status = "failed";
            await order.save();
            console.error(`Falta Stock. Order MP: ${order._id}`);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MP Webhook Error:", error);
    return NextResponse.json({ error: "MP webhook failure" }, { status: 500 });
  }
}
