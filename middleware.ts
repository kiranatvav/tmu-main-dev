import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow these paths
  const allowedPaths = [
    "/",
    "/movie",
    "/test",
    "/book",
    "/thankyou",
    "/thank-you",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/api/geo",
    "/api/leads",
  ];

  // Check if the current path is allowed
  const isAllowed = allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Also allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // If path is not allowed, redirect to home
  if (!isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
