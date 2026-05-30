import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/shop/ProductGrid";

interface ProductWithNumberPrice {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: { name: string } | null;
  inStock: boolean;
  featured: boolean;
}

interface CategoryType {
  id: string;
  name: string;
}

export default async function ShopPage() {
  const productsRaw = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const products: ProductWithNumberPrice[] = productsRaw.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    images: p.images,
    category: p.category ? { name: p.category.name } : null,
    inStock: p.inStock,
    featured: p.featured,
  }));

  const categoriesRaw = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const categories: CategoryType[] = categoriesRaw.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F5F0EB]">Shop</h1>
        <p className="mt-2 text-[#888]">
          Browse our collection of handmade crochet pieces
        </p>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-4 py-2 bg-[#D4A574] text-[#0a0a0a] rounded-full text-sm font-medium">
            All
          </span>
          {categories.map((cat: CategoryType) => (
            <span
              key={cat.id}
              className="px-4 py-2 bg-[#111] border border-[#1a1a1a] text-[#888] rounded-full text-sm font-medium hover:border-[#D4A574]/30 transition-colors cursor-pointer"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}