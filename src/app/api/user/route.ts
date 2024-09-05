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

// Handler for PUT requests to update user slug or description
export async function PUT(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { newSlug, newDescription } = await req.json()

		const updateData: any = {}

		if (newSlug && typeof newSlug === "string") {
			updateData.slug = newSlug
		}

		if (newDescription && typeof newDescription === "string") {
			updateData.description = newDescription
		}

		if (Object.keys(updateData).length === 0) {
			return NextResponse.json({ error: "No valid fields provided" }, { status: 400 })
		}

		const updatedUser = await db.user.update({
			where: { id: session.user.id },
			data: updateData,
		})

		return NextResponse.json({ message: "User updated successfully", updatedUser })
	} catch (error) {
		console.error("Error updating user:", error)
		return NextResponse.json({ error: "Error updating user data" }, { status: 500 })
	}
}
