import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  const comingSoonHost =
    host === "curzstudio.com" ||
    host === "www.curzstudio.com" ||
    host === "mariotti-triade.mariotti93.chatgpt.site";
  const path = request.nextUrl.pathname;
  const excluded = path.startsWith("/_next/") || path.startsWith("/images/") || path.startsWith("/api/") || path === "/favicon.svg" || path === "/favicon.png";
  if (comingSoonHost && !excluded && path !== "/coming-soon") return NextResponse.rewrite(new URL("/coming-soon", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/((?!.*\\..*).*)", "/favicon.svg", "/images/:path*", "/api/:path*"] };
