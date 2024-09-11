import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user || !session.user.slug || typeof session.user.slug !== "string") {
			return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 })
		}

		const slug = session.user.slug

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

export async function DELETE(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		// Check if the session and user are valid
		if (!session || !session.user) {
			console.error("Unauthorized request - no session or user found", { session })
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		// Log the session details for debugging
		console.log("Session data:", session)

		// Attempt to delete the user
		const user = await db.user.delete({
			where: { id: session.user.id },
		})

		// Log successful deletion
		console.log("User deleted successfully:", user)

		return NextResponse.json({ message: "User deleted successfully", user })
	} catch (error: any) {
		// Log detailed error info for troubleshooting
		console.error("Error deleting user:", error.message, error)

		// Return a more descriptive error to help with debugging
		return NextResponse.json({ error: "Error deleting user data", details: error.message }, { status: 500 })
	}
}
