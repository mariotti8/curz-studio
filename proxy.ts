import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}
export const config = { matcher: ["/((?!.*\\..*).*)", "/favicon.svg", "/images/:path*", "/api/:path*"] };
