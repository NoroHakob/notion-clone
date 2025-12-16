import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/((?!_next|sign-in|sign-up|blocked).*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const session = await auth();
  if (!session.userId) return;

  const publicMetadata = session.sessionClaims?.publicMetadata as {
    status?: string;
  };

  if (publicMetadata?.status === "disabled") {
    return NextResponse.redirect(new URL("/blocked", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
