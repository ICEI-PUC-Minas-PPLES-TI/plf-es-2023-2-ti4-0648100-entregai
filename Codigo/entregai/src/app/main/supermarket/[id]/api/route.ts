import { getSupermarket } from "@/lib/firebase/supermarketHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('supermarketId')!

    try {
        const supermarket = await getSupermarket(id)

        return NextResponse.json({supermarket}, {status: 200});

    } catch (error) {

        return NextResponse.json({error}, {status: 200});
    }
}