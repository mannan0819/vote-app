// middleware.ts
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from "nanoid";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, event: NextFetchEvent) {
  // if (req.nextUrl.pathname.startsWith("/")) {
  //   console.log("IN MIDDLEWARE");
  //   console.log(req.cookies);
  // }
  const res = NextResponse.next();
  if (req.cookies.get("user_token")) return res;
  res.cookies.set("user_token", nanoid());
  return res;
}
