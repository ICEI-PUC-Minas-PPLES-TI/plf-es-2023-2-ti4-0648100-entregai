import { deleteSupermarket, getSupermarket, registerSupermarket } from "@/lib/firebase/supermarketHandler";
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

export async function DELETE(request: NextRequest) {
        
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('supermarketId')!

    try {
        await deleteSupermarket(id)

        return NextResponse.json({}, {status: 200});

    } catch (error) {

        return NextResponse.json({error}, {status: 200});
    }
}

export async function POST(request: NextRequest) {
    const { name, address, phone, cnpj } = await request.json()

    try {

        await registerSupermarket(name, address, phone, cnpj)

        return NextResponse.json({}, {status: 200})

    } catch (error) {
        
        return NextResponse.json({error}, {status: 500})
    }
}