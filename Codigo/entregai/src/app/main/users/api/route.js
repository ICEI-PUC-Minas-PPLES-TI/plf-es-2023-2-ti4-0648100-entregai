import { db } from "@/lib/firebase/firebase-config";
import { getAllUsers, registerUser, updateUser } from "@/lib/firebase/userHandler";
import { auth } from "firebase-admin";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { email, password, name, permissionLevel } = await request.json();

		await registerUser(email, password, name, permissionLevel);

        // Talvez retornar o usuario criado
		return NextResponse.json({}, { status: 200 });

	} catch (error) {
		return NextResponse.json({ error: "Email already registered" }, { status: 500 });
	}
}

export async function PATCH(request) {
    const { id, email, password, name, permissionLevel } = await request.json();

    await updateUser(id, email, password, name, permissionLevel)

    return NextResponse.json({}, {status: 200});
}

export async function GET(request) {

    const users = await getAllUsers()

    return NextResponse.json({users}, {status: 200});
}
