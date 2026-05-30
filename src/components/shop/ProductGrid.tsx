import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: { name: string } | null;
  inStock: boolean;
  featured: boolean;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#888] text-lg">No products available yet.</p>
        <p className="text-[#666] text-sm mt-2">
          Check back soon for new handmade pieces!
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-[#F5F0EB] mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}