import { getAllSupermarkets } from "@/lib/firebase/supermarketHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const supermarkets = await getAllSupermarkets()

        return NextResponse.json({supermarkets}, {status: 200});

    } catch (error) {

        return NextResponse.json({error}, {status: 200});
    }
}