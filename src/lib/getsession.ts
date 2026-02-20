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
        const result: any = await scalekit.validateAccessToken(token!.value);
        const user = await scalekit.getUser(result.sub);
        return user



    } catch (error) {
        console.log(error);
        return null;
    }
    // gte user details 

}