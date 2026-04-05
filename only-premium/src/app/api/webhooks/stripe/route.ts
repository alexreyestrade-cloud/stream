import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Account from "@/models/Account";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "No signature or secret." }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const orderId = session.client_reference_id;

    if (orderId) {
      await connectDB();
      const order = await Order.findById(orderId);

      if (order && order.status === "pending") {
        // [CRITICAL ATOMIC OPERATION] - Find an available account for this product and lock it immediately
        const account = await Account.findOneAndUpdate(
          { product: order.product, status: "available" },
          { $set: { status: "sold" } },
          { new: true, sort: { createdAt: 1 } } // Get oldest available
        );

        if (account) {
          order.account = account._id;
          order.status = "completed";
          await order.save();
        } else {
          // Uh oh, out of stock but paid!
          order.status = "failed"; // Or "paid_no_stock" to manually dispatch
          await order.save();
          console.error(`CRITICAL: Out of stock for product ${order.product}. Order ${order._id} paid but not fulfilled.`);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
