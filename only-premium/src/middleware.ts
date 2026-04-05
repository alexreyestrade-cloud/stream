import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  
  if (!basicAuth) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  const authValue = basicAuth.split(" ")[1];
  const [user, pwd] = atob(authValue).split(":");

  const validUser = "admin";
  const validPass = process.env.ADMIN_PASSWORD || "onlypremiumsecret";

  if (user === validUser && pwd === validPass) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication failed", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
