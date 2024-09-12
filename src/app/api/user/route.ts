import { getSessionOrUnauthorized } from "@/src/lib/actions"
import { db } from "@/src/lib/db"
import {} from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const { slug } = session.user
		if (!slug || typeof slug !== "string") {
			return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 })
		}

		const user = await db.user.findUnique({ where: { slug } })
		if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

		return NextResponse.json(user)
	} catch (error) {
		console.error("Error fetching user:", error)
		return NextResponse.json({ error: "Error fetching user data" }, { status: 500 })
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
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const user = await db.user.delete({ where: { id: session.user.id } })
		return NextResponse.json({ message: "User deleted successfully", user })
	} catch (error) {
		console.error("Error deleting user:", error)
		return NextResponse.json({ error: "Error deleting user data" }, { status: 500 })
	}
}
