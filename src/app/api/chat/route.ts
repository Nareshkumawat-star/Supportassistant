import { NextRequest, NextResponse } from "next/server";
import Business from "@/model/business.model";
import { GoogleGenAI } from "@google/genai";
import connectDB from "@/lib/db";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();
        console.log(message, ownerId);
        if (!message || !ownerId) {
            return NextResponse.json({ error: "Missing message or ownerId" }, { status: 400, headers: corsHeaders });
        }
        await connectDB();
        const settings = await Business.findOne({ ownerId });
        if (!settings) {
            return NextResponse.json({
                response: "The chatbot is not yet configured. Please save your settings in the dashboard first."
            }, { status: 200, headers: corsHeaders });
        }
        const KNOWLEDGE = `business name: ${settings.businessName || "not provided"}
    support email: ${settings.supportEmail || "not provided"}
    knowledge base: ${settings.knowledgeBase || "not provided"}`;
        const Prompt = `You are a professional and friendly customer service representative for this company.

LANGUAGE & TONE:
- LANGUAGE MATCHING: Respond in the EXACT same language the user uses. 
  - If the user types in English, you MUST reply in English.
  - If the user types in Hinglish (Hindi-English mix), you MUST reply in Hinglish.
- Be extremely tolerant of spelling mistakes and typos (e.g., "hloo", "maens", "rela", "hondi"). Understand the intent regardless of errors.
- Maintain a warm, helpful, and professional tone.

INSTRUCTIONS:
1. If the user says a greeting (like "hi", "hello", "hloo", "namaste", etc.) or engages in small talk, respond warmly and ask how you can help them today.
2. For specific questions about the business, use ONLY the information provided in the BUSINESS DETAILS section below.
3. If the user's question is NOT a greeting and cannot be answered using the provided BUSINESS DETAILS, respond by apologizing and providing the support email: "${settings.supportEmail || "support@company.com"}".
4. Do not create or assume any new policies, pricing, or guarantees.

BUSINESS DETAILS:
${KNOWLEDGE}
-------------------
CUSTOMER QUERY:
${message}
---------------
ANSWER:
---------------
    `

        const ai = new GoogleGenAI({ apiKey: (process.env.GEMINI_API_KEY || "").trim() });
        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: Prompt
        })
        const response = NextResponse.json({ response: res.text }, { status: 201 });
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");
        return response;
    } catch (error: any) {
        console.error("Chat API Error:", error);

        let errorMessage = "I'm sorry, I encountered an unexpected error. Please try again later.";

        // Handle Quota/Rate Limit errors gracefully
        if (error?.message?.includes("429") || error?.message?.includes("quota") || error?.status === 429) {
            errorMessage = "I'm currently very busy helping others and have reached my limit for now. Please try again in a few minutes!";
        }

        return NextResponse.json({ response: errorMessage }, { status: 200, headers: corsHeaders });
    }
}
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
