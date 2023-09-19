import { auth, db } from "@/lib/firebase/firebase-config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { email, password, fullname, permission } = await request.json()

    try {
        const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

        const userRef = doc(db, "users", userCredetial.user.uid);
        
        await setDoc(userRef, {
          name: fullname,
          email: email,
          permission: permission,
        });

        return NextResponse.json({user}, {status: 200})

    } catch (error) {

        return NextResponse.json({error}, {status: 500})
    }
}