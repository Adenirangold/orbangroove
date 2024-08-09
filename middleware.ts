import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // return NextResponse.redirect(new URL("/login", request.url));
    const originalUrl = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(originalUrl)}`, request.url)
    );
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/account/:path*"],
};
