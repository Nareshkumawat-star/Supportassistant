import { NextRequest, NextResponse } from "next/server";

import Business from "@/model/business.model";
import connectDB from "@/lib/db";
export async function POST(req:NextRequest){
    try {
        const {ownerId,businessName,supportEmail,knowledgeBase} = await req.json();
        if(!ownerId){
            return NextResponse.json({error:"Unauthorized"}, {status:401});
        }
        await connectDB();   // upser   means hai toh update kerdo and new ka means 
         const settings = await Business.findOneAndUpdate(
            {ownerId},
            {ownerId,businessName,supportEmail,knowledgeBase},
            {upsert:true,new:true});
         return NextResponse.json({settings}, {status:201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal server error"}, {status:500});
    }
    
}



