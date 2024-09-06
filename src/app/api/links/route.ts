import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
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

// Handler for POST requests to add a new link
export async function POST(req: NextRequest) {
	try {
		const { title, url } = await req.json()

		if (!title || typeof title !== "string" || !url || typeof url !== "string") {
			return new NextResponse(JSON.stringify({ error: "Invalid input" }), { status: 400 })
		}

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const newLink = await db.userLink.create({
			data: {
				title,
				url,
				userId,
			},
		})

		return NextResponse.json(newLink)
	} catch (error) {
		console.error("Error adding link:", error)
		return new NextResponse(JSON.stringify({ error: "Error adding link" }), { status: 500 })
	}
}
