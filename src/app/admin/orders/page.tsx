"use client";

import { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  paymentNote: string | null;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      images: string[];
    };
  }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [paymentNote, setPaymentNote] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  const handleUpdateStatus = async (
    id: string,
    status: string,
    paymentStatus?: string
  ) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        paymentStatus,
        paymentNote: paymentNote || undefined,
      }),
    });
    setPaymentNote("");
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-500";
      case "CONFIRMED":
        return "bg-blue-500/10 text-blue-500";
      case "PROCESSING":
        return "bg-purple-500/10 text-purple-400";
      case "SHIPPED":
        return "bg-orange-500/10 text-orange-400";
      case "DELIVERED":
        return "bg-green-500/10 text-green-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-[#1a1a1a] text-[#888]";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500/10 text-green-500";
      case "PARTIAL":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-red-500/10 text-red-400";
    }
  };

  if (loading) return <div className="text-[#888]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5F0EB] mb-8">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#111] border border-[#1a1a1a] rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() =>
                setExpandedId(expandedId === order.id ? null : order.id)
              }
            >
              <div>
                <p className="font-semibold text-[#F5F0EB]">
                  {order.customerName}
                </p>
                <p className="text-sm text-[#888]">
                  {formatPrice(order.totalAmount)} • {order.items.length} items
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </span>
                {expandedId === order.id ? (
                  <ChevronUp className="w-5 h-5 text-[#888]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#888]" />
                )}
              </div>
            </div>

            {/* Expanded */}
            {expandedId === order.id && (
              <div className="px-4 pb-4 border-t border-[#1a1a1a]">
                <div className="py-4 space-y-4">
                  {/* Customer & Shipping */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-[#666] font-medium">Customer</p>
                      <p className="text-[#F5F0EB]">{order.customerEmail}</p>
                      <p className="text-[#F5F0EB]">{order.customerPhone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#666] font-medium">Shipping Address</p>
                      <p className="text-[#F5F0EB]">
                        {order.address}, {order.city}, {order.state}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-[#666] text-sm font-medium mb-2">Items</p>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-[#0a0a0a] p-3 rounded-lg"
                        >
                          <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg overflow-hidden">
                            {item.product.images[0] ? (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#444] text-xs">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-[#F5F0EB]">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-[#888]">
                              Qty: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-[#0a0a0a] p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4A574]" />
                      <p className="text-sm font-medium text-[#F5F0EB]">
                        Payment Management
                      </p>
                    </div>

                    {order.paymentNote && (
                      <p className="text-sm text-[#888]">
                        Note: {order.paymentNote}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={paymentNote}
                        onChange={(e) => setPaymentNote(e.target.value)}
                        placeholder="Payment note (e.g., Bank transfer ref)"
                        className="flex-1 bg-[#111] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] placeholder-[#444] focus:border-[#D4A574] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, order.status, "PAID")
                        }
                        className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark Paid
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, order.status, "PARTIAL")
                        }
                        className="flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        Mark Partial
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, "CONFIRMED")
                        }
                        className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        Confirm Order
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, "PROCESSING")
                        }
                        className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        Processing
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, "SHIPPED")}
                        className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        Shipped
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, "DELIVERED")
                        }
                        className="flex items-center gap-2 bg-[#D4A574]/10 hover:bg-[#D4A574]/20 text-[#D4A574] px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        Delivered
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, "CANCELLED")
                        }
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        <XCircle className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#666]">
                    Ordered on {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}