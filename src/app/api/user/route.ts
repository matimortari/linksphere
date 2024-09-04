import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const slug = req.nextUrl.searchParams.get("slug")

		if (!slug || typeof slug !== "string") {
			return new NextResponse("Invalid slug", { status: 400 })
		}

		const user = await db.user.findUnique({
			where: { slug },
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
