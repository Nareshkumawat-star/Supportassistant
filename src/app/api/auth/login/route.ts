import { NextResponse, NextRequest } from "next/server";
import scalekit from "@/lib/scalekit";

export async function GET(req: NextRequest) {
  const redirecturl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
  const url = scalekit.getAuthorizationUrl(redirecturl);
  console.log("Redirecting to Scalekit:", url);
  return NextResponse.redirect(url);
}