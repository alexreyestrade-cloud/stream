import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { productId, email, paymentMethod } = await req.json();

    if (!productId || !email || !paymentMethod) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Create pending order
    const order = await Order.create({
      product: product._id,
      amount: product.price,
      paymentMethod,
      status: "pending",
      customerEmail: email,
    });

    // Strategy based on Payment Method
    if (paymentMethod === "stripe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "mxn", // Or usd depending on preference
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price * 100, // Stripe expects cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${productId}`,
        client_reference_id: order._id.toString(),
        customer_email: email,
      });

      order.checkoutSessionId = session.id;
      await order.save();

      return NextResponse.json({ url: session.url });
    } else if (paymentMethod === "paypal") {
      // Return a URL to a custom local paypal flow or use MP, etc.
      // For this MVP, we return a mock url since we don't have PayPal SDK setup with credentials yet
      return NextResponse.json({ url: `/api/debug-pay?orderId=${order._id}` }); 
    } else if (paymentMethod === "mercadopago") {
      // MercadoPago integration
      return NextResponse.json({ url: `/api/debug-pay?orderId=${order._id}` });
    }

    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
