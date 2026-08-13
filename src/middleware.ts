import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost?.split(",")[0].trim() ?? request.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();

  if (host === "www.deviatech.com") {
    const url = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      "https://deviatech.com",
    );
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
