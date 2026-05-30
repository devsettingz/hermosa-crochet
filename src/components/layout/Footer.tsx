import Link from "next/link";
import { Sparkles, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#D4A574]" />
              <span className="text-lg font-bold text-[#F5F0EB]">
                Hermosa<span className="text-[#D4A574]">Crochet</span>
              </span>
            </Link>
            <p className="text-sm text-[#888] leading-relaxed">
              Handmade crochet pieces crafted with love and patience. Every
              stitch tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#F5F0EB] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-[#888] hover:text-[#D4A574] transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-order"
                  className="text-sm text-[#888] hover:text-[#D4A574] transition-colors"
                >
                  Custom Order
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-sm text-[#888] hover:text-[#D4A574] transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#F5F0EB] uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#888]">
                <Mail className="w-4 h-4 text-[#D4A574]" />
                <span>hermosa@hermosacrochet.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#888]">
                <Phone className="w-4 h-4 text-[#D4A574]" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#888]">
                <Instagram className="w-4 h-4 text-[#D4A574]" />
                <span>@hermosa.crochet</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-xs text-[#666]">
            &copy; {new Date().getFullYear()} Hermosa Crochet. All rights
            reserved. Handmade with love.
          </p>
        </div>
      </div>
    </footer>
  );
}