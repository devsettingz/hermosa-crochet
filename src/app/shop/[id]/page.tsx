import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ShoppingBag, Heart, Check } from "lucide-react";

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#D4A574] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#111] rounded-xl border border-[#1a1a1a] overflow-hidden relative">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#444]">
                <ShoppingBag className="w-20 h-20" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#111] rounded-lg border border-[#1a1a1a] overflow-hidden relative"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <span className="text-xs text-[#D4A574] font-semibold uppercase tracking-wider">
              {product.category.name}
            </span>
          )}
          <h1 className="mt-2 text-3xl font-bold text-[#F5F0EB]">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-[#D4A574]">
            {formatPrice(product.price)}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-[#888]">
              <Check className="w-4 h-4 text-green-500" />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[#F5F0EB] uppercase tracking-wider mb-3">
              Description
            </h3>
            <p className="text-[#888] leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/custom-order?product=${product.id}`}
              className="flex-1 bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] py-4 rounded-lg font-semibold text-center transition-all duration-200"
            >
              Order This Piece
            </Link>
          </div>

          <div className="mt-6 p-4 bg-[#111] border border-[#1a1a1a] rounded-lg">
            <p className="text-sm text-[#888]">
              <span className="text-[#D4A574] font-medium">Note:</span> After
              ordering, Hermosa will confirm availability and payment details
              via WhatsApp/email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}