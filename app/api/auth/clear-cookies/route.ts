import { NextRequest, NextResponse } from "next/server";
import { deleteSessionCookie } from "@/lib/auth";

// Helper endpoint to clear malformed cookies during development
export async function POST(request: NextRequest) {
  try {
    await deleteSessionCookie();
    
    return NextResponse.json(
      { message: "Cookies cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Clear cookies error:", error);
    return NextResponse.json(
      { error: "Failed to clear cookies" },
      { status: 500 }
    );
  }
}