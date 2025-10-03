import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Temporarily disable all middleware logic to debug infinite loop
  // Let client-side handle all authentication and redirects
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
