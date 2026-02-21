import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);

    // Clear the scalekit_token cookie
    response.cookies.delete("scalekit_token");

    return response;
}
