import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/courses/:path*",
    "/exercises/:path*",
    "/library/:path*",
    "/progress/:path*",
    "/billing/:path*",
    "/admin/:path*",
    "/auth/callback",
  ],
};
