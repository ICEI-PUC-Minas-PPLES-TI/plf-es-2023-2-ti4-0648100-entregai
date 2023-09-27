import { getSupermarketById } from "@/lib/firebase/supermarketHandler";
import { NextResponse } from "next/server";

export async function GET(request) {
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('supermarketId')

    try {
        const supermarket = await getSupermarketById(id)

        return NextResponse.json({supermarket}, {status: 200});

    } catch (error) {

        return NextResponse.json({error}, {status: 200});
    }
}