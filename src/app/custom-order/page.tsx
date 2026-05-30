"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";
import { Send, CheckCircle } from "lucide-react";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    itemType: "",
    description: "",
    preferredColors: "",
    size: "",
    budgetRange: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referenceImages: images,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-[#F5F0EB] mb-4">
          Request Submitted!
        </h2>
        <p className="text-[#888] mb-8">
          Hermosa will review your request and get back to you with pricing and
          delivery timeline. Check your email for confirmation.
        </p>
        <a
          href="/shop"
          className="inline-block bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-6 py-3 rounded-lg font-semibold"
        >
          Back to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#F5F0EB] mb-2">
        Request Custom Piece
      </h1>
      <p className="text-[#888] mb-8">
        Tell Hermosa what you want. She will review, approve, and set her own
        creation timeline.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleChange}
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="customerPhone"
              required
              value={formData.customerPhone}
              onChange={handleChange}
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="customerEmail"
            required
            value={formData.customerEmail}
            onChange={handleChange}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
            What do you want? (Item Type) *
          </label>
          <input
            type="text"
            name="itemType"
            required
            value={formData.itemType}
            onChange={handleChange}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
            placeholder="e.g., Sweater, Hat, Bag, Blanket..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors resize-none"
            placeholder="Describe the design, pattern, style you want..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
              Preferred Colors
            </label>
            <input
              type="text"
              name="preferredColors"
              value={formData.preferredColors}
              onChange={handleChange}
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
              placeholder="e.g., Pink, White, Beige"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
              Size
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
              placeholder="e.g., Small, Medium, Large, or measurements"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
            Budget Range (Optional)
          </label>
          <select
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="N5,000 - N10,000">N5,000 - N10,000</option>
            <option value="N10,000 - N20,000">N10,000 - N20,000</option>
            <option value="N20,000 - N50,000">N20,000 - N50,000</option>
            <option value="N50,000+">N50,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#F5F0EB] mb-2">
            Reference Images (Optional)
          </label>
          <div className="bg-[#111] border border-[#1a1a1a] border-dashed rounded-lg p-6 text-center">
            <UploadButton<OurFileRouter, "imageUploader">
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res) {
                  setImages((prev) => [...prev, ...res.map((f) => f.url)]);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button:
                  "bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] px-4 py-2 rounded-lg font-medium text-sm",
                allowedContent: "text-[#666] text-xs mt-2",
              }}
            />
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-lg overflow-hidden border border-[#1a1a1a]"
                  >
                    <img
                      src={img}
                      alt={`Reference ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4A574] hover:bg-[#C4956A] disabled:opacity-50 text-[#0a0a0a] py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}