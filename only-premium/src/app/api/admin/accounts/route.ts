import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Account from "@/models/Account";
import Product from "@/models/Product";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { productId, rawText } = await req.json();

    if (!productId || !rawText) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const lines = rawText.split('\n').map((l: string) => l.trim()).filter((l: string) => l !== "");
    const accountsToInsert = [];

    for (const line of lines) {
      // Split by common dividers: ':', '|', ','
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
        credentials: line, // Store full line just in case
        product: product._id,
        status: "available",
      });
    }

    if (accountsToInsert.length === 0) {
      return NextResponse.json({ error: "No valid accounts found in text" }, { status: 400 });
    }

    const inserted = await Account.insertMany(accountsToInsert);

    return NextResponse.json({ success: true, count: inserted.length });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
