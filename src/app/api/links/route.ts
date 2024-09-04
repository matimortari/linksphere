import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

// Handler for GET requests to fetch user links
export async function GET(req: NextRequest) {
	try {
		const slug = req.nextUrl.searchParams.get("slug")

		if (!slug || typeof slug !== "string") {
			return new NextResponse("Invalid slug", { status: 400 })
		}

		const userLinks = await db.userLink.findMany({
			where: {
				user: {
					slug,
				},
			},
		})

		return NextResponse.json(userLinks)
	} catch (error) {
		console.error("Error fetching links:", error)
		return new NextResponse("Error fetching links", { status: 500 })
	}
}
