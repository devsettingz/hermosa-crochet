"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category?: { name: string } | null;
    inStock: boolean;
    featured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-[#111] rounded-xl overflow-hidden border border-[#1a1a1a] hover:border-[#D4A574]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A574]/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#444]">
            <ShoppingBag className="w-12 h-12" />
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-[#1a1a1a] text-[#F5F0EB] px-3 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <div className="absolute top-3 left-3">
            <span className="bg-[#D4A574] text-[#0a0a0a] px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {product.category && (
          <span className="text-xs text-[#D4A574] font-medium uppercase tracking-wider">
            {product.category.name}
          </span>
        )}
        <h3 className="mt-1 text-sm font-semibold text-[#F5F0EB] line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-[#D4A574]">
          {formatPrice(product.price)}
        </p>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/shop/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#D4A574] text-[#F5F0EB] hover:text-[#0a0a0a] py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}