import { deleteUser, getUser, registerUser, updateUser } from "@/lib/firebase/userHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('userId')!

	try {
		const user = await getUser(id)

		return NextResponse.json({user}, {status: 200});

	} catch (err) {
		return NextResponse.json({err}, {status: 200});
	}
}

export async function POST(request: NextRequest) {
	const { email, password, name, permissionLevel, selectedSupermarkets } = await request.json();

	try {

		await registerUser(email, password, name, permissionLevel, selectedSupermarkets);
		
		return NextResponse.json({}, { status: 200 });

	} catch (error) {
		return NextResponse.json({ error: "Email already registered" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	
	const searchParams = request.nextUrl.searchParams
	const id = searchParams.get('userId')!

	try {

		await deleteUser(id)
		
		return NextResponse.json({}, { status: 200 });

	} catch (err) {

		return NextResponse.json({ err }, { status: 500 });
	}
}


export async function PATCH(request: NextRequest) {
    const { id, email, password, name, permissionLevel, selectedSupermarkets } = await request.json();

	try {

		await updateUser(id, email, password, name, permissionLevel, selectedSupermarkets)

		return NextResponse.json({}, {status: 200});

	} catch (err) {

		return NextResponse.json({ err }, { status: 500 });
	}
}