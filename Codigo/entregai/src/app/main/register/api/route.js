import { auth } from "@/firebase/Init"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { email, password } = await request.json()

    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)

        return NextResponse.json({user}, {status: 200})

    } catch (error) {

        return NextResponse.json({error}, {status: 500})
    }
}