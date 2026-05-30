"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag, Heart, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/custom-order", label: "Custom Order" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-[#D4A574] group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-[#F5F0EB]">
              Hermosa<span className="text-[#D4A574]">Crochet</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#e5e5e5] hover:text-[#D4A574] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-xs text-[#888] hover:text-[#D4A574] transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#F5F0EB]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111] border-t border-[#1a1a1a]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#e5e5e5] hover:text-[#D4A574] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="block text-xs text-[#888] hover:text-[#D4A574] transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}