import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: "pantry-essentials" },
    pack: { type: String, required: true, default: "500 g" },
    price: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 95 },
    badge: { type: String, default: "Daily Pick" },
    shortNote: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    usageTip: { type: String, default: "" },
    shelfLife: { type: String, default: "" },
    image: { type: String, required: true },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);