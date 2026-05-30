import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Calculate delivery date if deliveryDays is provided
    let deliveryDate = body.deliveryDate;
    if (body.deliveryDays && !deliveryDate) {
      const date = new Date();
      date.setDate(date.getDate() + parseInt(body.deliveryDays));
      deliveryDate = date.toISOString();
    }

    const order = await prisma.customOrder.update({
      where: { id: params.id },
      data: {
        status: body.status,
        approved: body.approved,
        price: body.price,
        deliveryDays: body.deliveryDays,
        deliveryDate: deliveryDate,
        adminNotes: body.adminNotes,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update custom order" },
      { status: 500 }
    );
  }
}