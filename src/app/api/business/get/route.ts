import { NextRequest, NextResponse } from "next/server";

import Business from "@/model/business.model";
import connectDB from "@/lib/db";
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get("ownerId");

        if (!ownerId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB();   // upser   means hai toh update kerdo and new ka means 
        const settings = await Business.findOne(
            { ownerId },
        )
        return NextResponse.json({ settings }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Get setting error" }, { status: 500 });
    }

}