"use client";

import { useState, useEffect } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";
import { formatPrice } from "@/lib/utils";
import { Plus, Trash2, Edit, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  inStock: boolean;
  featured: boolean;
  category: { id: string; name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    inStock: true,
    featured: false,
    images: [] as string[],
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    const cats = [...new Set(data.map((p: Product) => p.category?.name).filter(Boolean))];
    setCategories(cats.map((name, i) => ({ id: String(i), name: name as string })));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      inStock: true,
      featured: false,
      images: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });

    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const startEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      categoryId: product.category?.id || "",
      inStock: product.inStock,
      featured: product.featured,
      images: product.images,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  if (loading) return <div className="text-[#888]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#F5F0EB]">Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-4 py-2 rounded-lg font-medium transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 mb-8 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#888] mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Price (₦) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#888] mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-[#888]">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                }
                className="rounded border-[#1a1a1a] bg-[#0a0a0a] text-[#D4A574]"
              />
              In Stock
            </label>
            <label className="flex items-center gap-2 text-sm text-[#888]">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="rounded border-[#1a1a1a] bg-[#0a0a0a] text-[#D4A574]"
              />
              Featured
            </label>
          </div>

          <div>
            <label className="block text-sm text-[#888] mb-2">Images</label>
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...res.map((f) => f.url)],
                  }));
                }
              }}
              appearance={{
                button:
                  "bg-[#1a1a1a] hover:bg-[#D4A574] text-[#F5F0EB] hover:text-[#0a0a0a] px-4 py-2 rounded-lg text-sm font-medium transition-all",
              }}
            />
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg overflow-hidden border border-[#1a1a1a] relative group"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, idx) => idx !== i),
                        }))
                      }
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-6 py-2 rounded-lg font-semibold transition-all"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#D4A574]/20 transition-all"
          >
            <div className="aspect-square bg-[#1a1a1a] relative">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#444]">
                  No Image
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#F5F0EB]">{product.name}</h3>
                  <p className="text-[#D4A574] font-bold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(product)}
                    className="p-2 bg-[#1a1a1a] hover:bg-[#D4A574]/10 rounded-lg text-[#888] hover:text-[#D4A574] transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-[#1a1a1a] hover:bg-red-500/10 rounded-lg text-[#888] hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                {product.inStock && (
                  <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs">
                    In Stock
                  </span>
                )}
                {product.featured && (
                  <span className="px-2 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded text-xs">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}