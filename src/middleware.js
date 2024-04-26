import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

import { auth } from "../auth";

export async function middleware(req) {
  console.log("Middleware check");
  const session = await auth();
  console.log("Session", session);
  if (!session) {
    console.log("No session, redirecting ...");
    const url = new URL("/SignIn", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// export default auth((req) => {
//   if (!req.auth) {
//     return NextResponse.redirect("/SignIn");
//   }
// });

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/About/:path*",
};
