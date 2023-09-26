import { getAllSupermarkets, registerSupermarket } from "@/lib/firebase/supermarketHandler";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const supermarkets = await getAllSupermarkets()

        return NextResponse.json({supermarkets}, {status: 200});

    } catch (error) {

        return NextResponse.json({error}, {status: 200});
    }
}

export async function POST(request) {
    const { name, address, phone, cnpj } = await request.json()

    try {

        await registerSupermarket(name, address, phone, cnpj)

        return NextResponse.json({}, {status: 200})

    } catch (error) {
        
        return NextResponse.json({error}, {status: 500})
    }
}