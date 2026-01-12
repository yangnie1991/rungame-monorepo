import { auth } from "@/lib/auth"; // import your auth instance
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
    try {
        return await handler.GET(req);
    } catch (error: any) {
        console.error("[Auth GET Error]", error);
        return NextResponse.json(
            { error: error.message || "Auth error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        return await handler.POST(req);
    } catch (error: any) {
        console.error("[Auth POST Error]", error);
        return NextResponse.json(
            { error: error.message || "Auth error" },
            { status: 500 }
        );
    }
}
