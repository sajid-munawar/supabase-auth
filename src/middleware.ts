import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";
  const loggedInRestrictedPaths = path === "/signin" || path === "/signup";

  if (token && loggedInRestrictedPaths) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !loggedInRestrictedPaths) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/", "/signup"],
};
