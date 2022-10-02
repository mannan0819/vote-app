// middleware.ts
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from "nanoid";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest, event: NextFetchEvent) {
  const res = NextResponse.next();
  if (req.cookies.get("user_token")) return res;
  res.cookies.set("user_token", nanoid(), {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    sameSite: "strict",
  });
  return res;
}
