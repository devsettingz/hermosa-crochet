import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const isValid = await verifyAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}