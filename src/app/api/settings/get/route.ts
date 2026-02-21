import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Business from "@/model/business.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { ownerId } = body;

        if (!ownerId) {
            return NextResponse.json({ error: "ownerId is required" }, { status: 400 });
        }

        // Find business logic
        const businessInfo = await Business.findOne({ ownerId });

        if (!businessInfo) {
            // No info found, but not strictly an error, just return empty data so frontend doesn't crash
            return NextResponse.json({
                ownerId,
                businessinfo: '',
                supportemail: '',
                knowledgebase: ''
            }, { status: 200 });
        }

        // Map back to frontend variable names
        const responseData = {
            ownerId: businessInfo.ownerId,
            businessinfo: businessInfo.businessName || '',
            supportemail: businessInfo.supportEmail || '',
            knowledgebase: businessInfo.knowledgeBase || ''
        };

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Error retrieving business settings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
