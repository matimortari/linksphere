import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const userId = req.nextUrl.searchParams.get("userId")

		if (!userId || typeof userId !== "string") {
			return new NextResponse("Invalid userId", { status: 400 })
		}

		const user = await db.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			return new NextResponse("User not found", { status: 404 })
		}

		return NextResponse.json(user)
	} catch (error) {
		console.error("Error fetching user:", error)
		return new NextResponse("Error fetching user data", { status: 500 })
	}
}
