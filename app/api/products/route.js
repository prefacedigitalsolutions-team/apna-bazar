import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { DEFAULT_CATEGORY } from "@/lib/categories";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Products load nahi ho paaye.", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const sku = String(body.sku || "").trim();
    const name = String(body.name || "").trim();
    const image = String(body.image || "").trim();
    const price = Number(body.price);

    if (!sku || !name || !image || Number.isNaN(price)) {
      return NextResponse.json(
        { success: false, message: "SKU, Name, Price aur Image zaroori hain." },
        { status: 400 }
      );
    }

    const category =
      String(body.category || "").trim() || DEFAULT_CATEGORY;

    const product = await Product.create({
      sku,
      name,
      image,
      price,
      category,
      pack: String(body.pack || "500 g").trim(),
      discountPercent: Number(body.discountPercent ?? 0),
      badge: String(body.badge || "Daily Pick").trim(),
      shortNote: String(body.shortNote || "").trim(),
      ingredients: String(body.ingredients || "").trim(),
      usageTip: String(body.usageTip || "").trim(),
      shelfLife: String(body.shelfLife || "").trim(),
      isFeatured: Boolean(body.isFeatured ?? true),
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Product save nahi ho paaya.", error: error.message },
      { status: 500 }
    );
  }
}