import Link from "next/link";
import ProductGrid from "@/components/shop/ProductGrid";
import { ArrowRight, Heart, Clock, Truck } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface ProductWithStringPrice {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: { name: string } | null;
  inStock: boolean;
  featured: boolean;
}

function convertProduct(p: any): ProductWithStringPrice {
  return {
    id: p.id,
    name: p.name,
    price: Number(p.price),
    images: p.images,
    category: p.category ? { name: p.category.name } : null,
    inStock: p.inStock,
    featured: p.featured,
  };
}

export default async function HomePage() {
  const featuredProductsRaw = await prisma.product.findMany({
    where: { featured: true, inStock: true },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const latestProductsRaw = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const featuredProducts = featuredProductsRaw.map(convertProduct);
  const latestProducts = latestProductsRaw.map(convertProduct);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                Handmade with Love
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0EB] leading-tight">
                Beautiful Crochet
                <span className="block text-[#D4A574]">Pieces for You</span>
              </h1>
              <p className="mt-6 text-lg text-[#888] leading-relaxed max-w-lg">
                Every piece is carefully handcrafted with premium yarn and lots
                of love. Shop ready-made items or request a custom piece made
                just for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/custom-order"
                  className="inline-flex items-center gap-2 border border-[#333] hover:border-[#D4A574] text-[#F5F0EB] px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Custom Order
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-[#D4A574]/20 mx-auto mb-4" />
                  <p className="text-[#444] text-sm">Your crochet images here</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 shadow-xl">
                <p className="text-[#D4A574] font-bold text-lg">100% Handmade</p>
                <p className="text-[#888] text-xs">Premium Quality Yarn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#111] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D4A574]/10 rounded-lg">
                <Heart className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F0EB]">Handmade</h3>
                <p className="text-sm text-[#888]">Every piece is crafted with care</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D4A574]/10 rounded-lg">
                <Clock className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F0EB]">Custom Orders</h3>
                <p className="text-sm text-[#888]">Made to your specifications</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#D4A574]/10 rounded-lg">
                <Truck className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F0EB]">Delivery</h3>
                <p className="text-sm text-[#888]">Nationwide shipping available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#F5F0EB]">Featured Pieces</h2>
            <Link
              href="/shop"
              className="text-sm text-[#D4A574] hover:text-[#C4956A] font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>
      )}

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#F5F0EB]">Latest Arrivals</h2>
          <Link
            href="/shop"
            className="text-sm text-[#D4A574] hover:text-[#C4956A] font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid products={latestProducts} />
      </section>

      {/* Custom Order CTA */}
      <section className="bg-[#111] border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#F5F0EB] mb-4">
            Want Something Unique?
          </h2>
          <p className="text-[#888] max-w-xl mx-auto mb-8">
            Have a design in mind? Send us your idea and we'll create a custom
            crochet piece just for you. Hermosa will review and set her own
            timeline.
          </p>
          <Link
            href="/custom-order"
            className="inline-flex items-center gap-2 bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-8 py-4 rounded-lg font-semibold transition-all duration-200"
          >
            Request Custom Piece
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}