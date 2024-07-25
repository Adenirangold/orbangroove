import { jwtVerify } from "jose";

import { NextRequest, NextResponse } from "next/server";

export async function CustomTokenMiddleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
