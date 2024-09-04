import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

// Handler for GET requests to fetch user data
export async function GET(req: NextRequest) {
	try {
		const slug = req.nextUrl.searchParams.get("slug")

		if (!slug || typeof slug !== "string") {
			return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
		}

		const user = await db.user.findUnique({
			where: { slug },
		})

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		return NextResponse.json(user)
	} catch (error) {
		console.error("Error fetching user:", error)
		return NextResponse.json({ error: "Error fetching user data" }, { status: 500 })
	}
}

// Handler for PUT requests to update user slug
export async function PUT(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { newSlug } = await req.json()

		if (!newSlug || typeof newSlug !== "string") {
			return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
		}

		if (!session.user.id || !newSlug) {
			return NextResponse.json({ error: "User ID and new slug must be provided" }, { status: 400 })
		}

		const updatedUser = await db.user.update({
			where: { id: session.user.id },
			data: { slug: newSlug },
		})

		return NextResponse.json({ message: "Slug updated successfully", updatedUser })
	} catch (error) {
		console.error("Error updating user slug:", error)
		return NextResponse.json({ error: "Error updating user slug" }, { status: 500 })
	}
}
