import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.customOrder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch custom orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await prisma.customOrder.create({
      data: {
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        itemType: body.itemType,
        description: body.description,
        preferredColors: body.preferredColors,
        size: body.size,
        budgetRange: body.budgetRange,
        referenceImages: body.referenceImages || [],
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create custom order" },
      { status: 500 }
    );
  }
}