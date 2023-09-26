import { deleteUser, getAllUsers, registerUser, updateUser } from "@/lib/firebase/userHandler";
import { NextResponse } from "next/server";

export async function GET(request) {

	try {
		const users = await getAllUsers()

		return NextResponse.json({users}, {status: 200});

	} catch (err) {
		return NextResponse.json({err}, {status: 200});
	}
}

export async function POST(request) {
	const { email, password, name, permissionLevel } = await request.json();

	try {

		await registerUser(email, password, name, permissionLevel);
		
		return NextResponse.json({}, { status: 200 });

	} catch (error) {
		return NextResponse.json({ error: "Email already registered" }, { status: 500 });
	}
}

export async function DELETE(request) {
	const { id } = await request.params

	try {

		console.log(id);

		await deleteUser(id)

		return NextResponse.json({}, { status: 200 });

	} catch (err) {
		return NextResponse.json({ err }, { status: 500 });
	}
}

export async function PATCH(request) {
    const { id, email, password, name, permissionLevel } = await request.json();

	// try catch
    await updateUser(id, email, password, name, permissionLevel)

    return NextResponse.json({}, {status: 200});
}