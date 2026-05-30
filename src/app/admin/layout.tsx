"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Lock } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-[#D4A574] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#F5F0EB]">
              Hermosa Admin
            </h1>
            <p className="text-[#888] mt-2">Enter your password to continue</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 space-y-4"
          >
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none transition-colors"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#D4A574] hover:bg-[#C4956A] text-[#0a0a0a] py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}