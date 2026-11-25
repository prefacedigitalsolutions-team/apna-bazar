import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductBannar from "../components/Allproduct/productBannar";
import AllItem from "../components/Allproduct/AllItem";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    await connectDB();
    const docs = await Product.find({}).sort({ createdAt: -1 }).lean();

    // Next.js Server -> Client Component ke liye clean plain objects
    return docs.map((doc) => ({
      _id: String(doc._id),
      sku: doc.sku || "",
      name: doc.name || "",
      category: doc.category || "",
      price: Number(doc.price) || 0,
      image: doc.image || "",
    }));
  } catch (error) {
    console.error("Failed to fetch products for /all-products:", error);
    return [];
  }
}

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <ProductBannar totalProducts={products.length} />
      <AllItem products={products} />
    </main>
  );
}