import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Check if the pathname is /users/new
  if (pathname === "/users/new") {
    // Allow the request to continue
    return NextResponse.next()
  }

  // Continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ["/users/:path*"],
}
