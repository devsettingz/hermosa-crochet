"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingCart,
  LogOut,
  Sparkles,
} from "lucide-react";
import { setAdminAuth } from "@/lib/auth";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/custom-orders",
    label: "Custom Orders",
    icon: ClipboardList,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    setAdminAuth(false);
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4A574]" />
          <span className="text-lg font-bold text-[#F5F0EB]">
            Hermosa<span className="text-[#D4A574]">Admin</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#D4A574]/10 text-[#D4A574] border border-[#D4A574]/20"
                  : "text-[#888] hover:text-[#F5F0EB] hover:bg-[#1a1a1a]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#1a1a1a]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#888] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}