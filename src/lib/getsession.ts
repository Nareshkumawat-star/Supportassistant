import { cookies } from "next/headers";
import scalekit from "./scalekit";

import { NextResponse } from "next/server";
export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("scalekit_token");
    if (!token) {
        return null;
    }

    try {
        // validateToken returns the decoded payload if valid, or throws an error
        const result: any = await scalekit.validateToken(token!.value);

        // getUser is under the user sub-client and returns a response object
        const response = await scalekit.user.getUser(result.sub);
        return response.user;
    } catch (error: any) {
        if (error.message?.includes('exp')) {
            console.warn("Session expired: User needs to log in again.");
        } else {
            console.error("Session retrieval error:", error);
        }
        return null;
    }
    // gte user details 

}