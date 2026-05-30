"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CustomOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  itemType: string;
  description: string;
  preferredColors: string | null;
  size: string | null;
  budgetRange: string | null;
  referenceImages: string[];
  status: string;
  approved: boolean;
  price: number | null;
  deliveryDays: number | null;
  deliveryDate: string | null;
  adminNotes: string | null;
  createdAt: string;
}

interface ActionData {
  price: string;
  deliveryDays: string;
  adminNotes: string;
}

export default function CustomOrdersPage() {
  const [orders, setOrders] = useState<CustomOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionData, setActionData] = useState<ActionData>({ price: "", deliveryDays: "", adminNotes: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/custom-orders");
    const data = await res.json();
    const converted: CustomOrder[] = data.map((o: any) => ({
      ...o,
      price: o.price ? Number(o.price) : null,
      deliveryDays: o.deliveryDays,
      deliveryDate: o.deliveryDate,
      createdAt: o.createdAt,
    }));
    setOrders(converted);
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    await fetch(`/api/custom-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "APPROVED",
        approved: true,
        price: actionData.price ? parseFloat(actionData.price) : null,
        deliveryDays: actionData.deliveryDays
          ? parseInt(actionData.deliveryDays)
          : null,
        adminNotes: actionData.adminNotes,
      }),
    });
    setActionData({ price: "", deliveryDays: "", adminNotes: "" });
    setExpandedId(null);
    fetchOrders();
  };

  const handleReject = async (id: string) => {
    await fetch(`/api/custom-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "REJECTED",
        approved: false,
        adminNotes: actionData.adminNotes,
      }),
    });
    setActionData({ price: "", deliveryDays: "", adminNotes: "" });
    setExpandedId(null);
    fetchOrders();
  };

  const handleComplete = async (id: string) => {
    await fetch(`/api/custom-orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "COMPLETED",
      }),
    });
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-500";
      case "APPROVED":
        return "bg-green-500/10 text-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-500";
      case "COMPLETED":
        return "bg-[#D4A574]/10 text-[#D4A574]";
      case "REJECTED":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-[#1a1a1a] text-[#888]";
    }
  };

  if (loading) return <div className="text-[#888]">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F5F0EB] mb-8">Custom Orders</h1>

      <div className="space-y-4">
        {orders.map((order: CustomOrder) => (
          <div
            key={order.id}
            className="bg-[#111] border border-[#1a1a1a] rounded-xl overflow-hidden"
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#0a0a0a]/50 transition-colors"
              onClick={() =>
                setExpandedId(expandedId === order.id ? null : order.id)
              }
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-[#F5F0EB]">{order.itemType}</p>
                  <p className="text-sm text-[#888]">
                    {order.customerName} &bull; {order.customerPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.replace("_", " ")}
                </span>
                {expandedId === order.id ? (
                  <ChevronUp className="w-5 h-5 text-[#888]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#888]" />
                )}
              </div>
            </div>

            {expandedId === order.id && (
              <div className="px-4 pb-4 border-t border-[#1a1a1a]">
                <div className="py-4 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[#666]">Email</p>
                      <p className="text-[#F5F0EB]">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-[#666]">Budget</p>
                      <p className="text-[#F5F0EB]">
                        {order.budgetRange || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#666]">Submitted</p>
                      <p className="text-[#F5F0EB]">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#666] text-sm mb-1">Description</p>
                    <p className="text-[#e5e5e5] text-sm bg-[#0a0a0a] p-3 rounded-lg">
                      {order.description}
                    </p>
                  </div>

                  <div className="flex gap-6 text-sm">
                    {order.preferredColors && (
                      <div>
                        <p className="text-[#666]">Colors</p>
                        <p className="text-[#F5F0EB]">{order.preferredColors}</p>
                      </div>
                    )}
                    {order.size && (
                      <div>
                        <p className="text-[#666]">Size</p>
                        <p className="text-[#F5F0EB]">{order.size}</p>
                      </div>
                    )}
                  </div>

                  {order.referenceImages.length > 0 && (
                    <div>
                      <p className="text-[#666] text-sm mb-2">Reference Images</p>
                      <div className="flex flex-wrap gap-2">
                        {order.referenceImages.map((img: string, i: number) => (
                          <a
                            key={i}
                            href={img}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={img}
                              alt={`Reference ${i + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-[#1a1a1a] hover:border-[#D4A574] transition-colors"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {order.approved && (
                    <div className="bg-[#0a0a0a] p-4 rounded-lg space-y-2">
                      <p className="text-sm font-semibold text-[#D4A574]">
                        Approved Details
                      </p>
                      {order.price !== null && (
                        <p className="text-sm text-[#F5F0EB]">
                          Price: &#8358;{order.price.toLocaleString()}
                        </p>
                      )}
                      {order.deliveryDays && (
                        <p className="text-sm text-[#F5F0EB]">
                          Delivery: {order.deliveryDays} days
                        </p>
                      )}
                      {order.deliveryDate && (
                        <p className="text-sm text-[#F5F0EB]">
                          Expected by: {formatDate(order.deliveryDate)}
                        </p>
                      )}
                      {order.adminNotes && (
                        <p className="text-sm text-[#888]">
                          Notes: {order.adminNotes}
                        </p>
                      )}
                    </div>
                  )}

                  {order.status === "PENDING" && (
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-[#888] mb-1">
                            Set Price (&#8358;)
                          </label>
                          <input
                            type="number"
                            value={actionData.price}
                            onChange={(e) =>
                              setActionData((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            placeholder="Enter price"
                            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#888] mb-1">
                            Delivery Days
                          </label>
                          <input
                            type="number"
                            value={actionData.deliveryDays}
                            onChange={(e) =>
                              setActionData((prev) => ({
                                ...prev,
                                deliveryDays: e.target.value,
                              }))
                            }
                            placeholder="e.g., 7"
                            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#888] mb-1">
                            Notes to Customer
                          </label>
                          <input
                            type="text"
                            value={actionData.adminNotes}
                            onChange={(e) =>
                              setActionData((prev) => ({
                                ...prev,
                                adminNotes: e.target.value,
                              }))
                            }
                            placeholder="Optional message"
                            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#F5F0EB] focus:border-[#D4A574] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(order.id)}
                          className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve & Set Price
                        </button>
                        <button
                          onClick={() => handleReject(order.id)}
                          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {order.status === "APPROVED" && (
                    <button
                      onClick={() => handleComplete(order.id)}
                      className="flex items-center gap-2 bg-[#D4A574]/10 hover:bg-[#D4A574]/20 text-[#D4A574] px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}