import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Business from "@/model/business.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { ownerId, businessinfo, supportemail, knowledgebase } = body;

        if (!ownerId) {
            return NextResponse.json({ error: "ownerId is required" }, { status: 400 });
        }

        // Map the frontend fields to the Mongoose Business schema
        const updateData = {
            ownerId,
            businessName: businessinfo,
            supportEmail: supportemail,
            knowledgeBase: knowledgebase
        };

        // Find by ownerId and update, or create a new document if it doesn't exist
        const updatedBusiness = await Business.findOneAndUpdate(
            { ownerId: ownerId },
            updateData,
            { new: true, upsert: true } // upsert: true creates a new doc if no match is found
        );

        return NextResponse.json(updatedBusiness, { status: 200 });

    } catch (error) {
        console.error("Error saving business settings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
