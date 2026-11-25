import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const updates = {};

    if (body.sku !== undefined) updates.sku = String(body.sku).trim();
    if (body.name !== undefined) updates.name = String(body.name).trim();
    if (body.image !== undefined) updates.image = String(body.image).trim();
    if (body.price !== undefined) {
      const priceNum = Number(body.price);
      if (Number.isNaN(priceNum) || priceNum < 0) {
        return NextResponse.json(
          { success: false, message: "Price sahi number hona chahiye." },
          { status: 400 }
        );
      }
      updates.price = priceNum;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Product update nahi ho paaya.", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID." },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product nahi mila." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product delete ho gaya." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Product delete nahi ho paaya.", error: error.message },
      { status: 500 }
    );
  }
}