import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const slug = session.user?.slug
		if (!slug || typeof slug !== "string") {
			return errorResponse("Invalid or missing slug", 400)
		}

		const user = await db.user.findUnique({ where: { slug } })
		if (!user) return errorResponse("User not found", 404)

		return NextResponse.json(user)
	} catch (error) {
		console.error("Error fetching user:", error)
		return errorResponse("Error fetching user data", 500)
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const { newSlug, newDescription } = await req.json()
		const updateData = {
			...(newSlug && typeof newSlug === "string" && { slug: newSlug }),
			...(newDescription && typeof newDescription === "string" && { description: newDescription }),
		}

		if (!Object.keys(updateData).length) {
			return errorResponse("No valid fields provided", 400)
		}

		const updatedUser = await db.user.update({
			where: { id: session.user.id },
			data: updateData,
		})

		return NextResponse.json({ message: "User updated successfully", updatedUser })
	} catch (error) {
		console.error("Error updating user:", error)
		return errorResponse("Error updating user data", 500)
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const deletedUser = await db.user.delete({ where: { id: session.user.id } })
		return NextResponse.json({ message: "User deleted successfully", deletedUser })
	} catch (error) {
		console.error("Error deleting user:", error)
		return errorResponse("Error deleting user data", 500)
	}
}
