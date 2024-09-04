import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const userId = req.nextUrl.searchParams.get("userId")

		if (!userId || typeof userId !== "string") {
			return new NextResponse("Invalid userId", { status: 400 })
		}

		const links = await db.userLink.findMany({
			where: { userId },
		})

		return NextResponse.json(links)
	} catch (error) {
		console.error("Error fetching links:", error)
		return new NextResponse("Error fetching links", { status: 500 })
	}
}
