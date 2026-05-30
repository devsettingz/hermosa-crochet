import { prisma } from "@/lib/prisma";
import StatsCard from "@/components/admin/StatsCard";
import { Package, ClipboardList, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [
    totalProducts,
    totalOrders,
    totalCustomOrders,
    pendingCustomOrders,
    pendingOrders,
    recentOrders,
    recentCustomOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.customOrder.count(),
    prisma.customOrder.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    }),
    prisma.customOrder.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      where: { status: "PENDING" },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5F0EB] mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Custom Orders"
          value={totalCustomOrders}
          icon={ClipboardList}
        />
        <StatsCard
          title="Pending"
          value={pendingCustomOrders + pendingOrders}
          icon={TrendingUp}
          trend="Needs attention"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#F5F0EB]">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-sm text-[#D4A574] hover:text-[#C4956A]"
            >
              View All
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-[#666] text-sm">No orders yet</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-[#F5F0EB]">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-[#888]">
                      ₦{Number(order.totalAmount).toLocaleString()} •{" "}
                      {order.items.length} items
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "PENDING"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : order.status === "PAID"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-[#1a1a1a] text-[#888]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Custom Orders */}
        <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#F5F0EB]">
              Pending Custom Orders
            </h2>
            <Link
              href="/admin/custom-orders"
              className="text-sm text-[#D4A574] hover:text-[#C4956A]"
            >
              View All
            </Link>
          </div>
          {recentCustomOrders.length === 0 ? (
            <p className="text-[#666] text-sm">No pending custom orders</p>
          ) : (
            <div className="space-y-4">
              {recentCustomOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-[#F5F0EB]">
                      {order.itemType}
                    </p>
                    <p className="text-xs text-[#888]">
                      {order.customerName} • {order.budgetRange || "No budget"}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}