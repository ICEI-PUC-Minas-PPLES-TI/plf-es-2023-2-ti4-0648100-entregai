import { getAllUsers } from "@/lib/firebase/userHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

	try {
		const users = await getAllUsers()

		return NextResponse.json({users}, {status: 200});

	} catch (err) {
		return NextResponse.json({err}, {status: 200});
	}
}