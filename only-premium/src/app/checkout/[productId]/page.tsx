import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import CheckoutClient from "./CheckoutClient";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export default async function CheckoutServerPage({ params }: { params: { productId: string } }) {
  // Await the params due to Next.js 15
  const resolvedParams = await params;
  const productId = resolvedParams.productId;

  await connectDB();

  let product = null;

  // Manejar el caso de productos demo / mock
  if (productId.length < 24) {
    product = {
      _id: productId,
      name: `Suscripción Premium Demo (${productId})`,
      price: 69,
      brand: "Demo"
    };
  } else {
    try {
      const dbProduct = await Product.findById(productId).lean();
      if (dbProduct) {
        // Serializamos para pasar al cliente
        product = {
          _id: dbProduct._id.toString(),
          name: dbProduct.name,
          price: dbProduct.price,
          brand: dbProduct.brand
        };
      }
    } catch(e) {}
  }

  return <CheckoutClient productId={productId} product={product} />;
}
