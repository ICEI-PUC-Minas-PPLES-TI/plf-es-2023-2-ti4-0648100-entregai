import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request) {

    const body = await request.json()

    await createUserWithEmailAndPassword(auth, body.email, body.password)
    
    console.log("User cadastrado com sucesso");

    return NextResponse.json({}, {status: 200})
}