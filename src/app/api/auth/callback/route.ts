import { NextResponse, NextRequest } from "next/server";
import scalekit from "@/lib/scalekit";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
        console.error("Scalekit Error:", error, errorDescription);
        return NextResponse.json({ error, errorDescription }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const redirecturl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
        //sesion mil gya 
        const result = await scalekit.authenticateWithCode(code, redirecturl);

        // For now, let's just return the result to verify it works
        // In a real app, you'd set a session cookie here
        console.log("Authentication successful:", result);

        // Redirect to home or dashboard after successful login
        const response =  NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
         response.cookies.set("scalekit_token", result.accessToken,{
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
         });
         return response
    } catch (err: any) {
        console.error("Authentication failed:", err);
        return NextResponse.json({ error: "Authentication failed", details: err.message }, { status: 500 });
    }
}
