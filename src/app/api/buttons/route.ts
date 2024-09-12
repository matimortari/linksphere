import { getSessionOrUnauthorized } from "@/src/lib/actions"
import { db } from "@/src/lib/db"
import { validateButtonData } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const slug = req.nextUrl.searchParams.get("slug")

	if (!slug) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
	}

	try {
		const user = await db.user.findUnique({ where: { slug } })
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 })
		}

		const userButtons = await db.socialButton.findMany({ where: { userId: user.id } })
		return NextResponse.json(userButtons)
	} catch (error) {
		console.error("Error fetching buttons:", error)
		return NextResponse.json({ error: "Error fetching buttons" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { platform, url, icon } = await req.json()

		if (!platform || !url || !icon) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 })
		}

		const newButton = await db.socialButton.create({
			data: {
				platform,
				url,
				icon,
				userId: session.user.id,
			},
		})

		return NextResponse.json(newButton)
	} catch (error) {
		console.error("Error adding button:", error)
		return NextResponse.json({ error: "Error adding button" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const buttonData = await req.json()
		const { id, platform, url, icon } = buttonData

		if (typeof id !== "number" || !validateButtonData({ platform, url, icon })) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 })
		}

		const existingButton = await db.socialButton.findUnique({ where: { id } })
		if (!existingButton || existingButton.userId !== session.user.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		const updatedButton = await db.socialButton.update({
			where: { id },
			data: { platform, url, icon },
		})

		return NextResponse.json(updatedButton)
	} catch (error) {
		console.error("Error updating button:", error)
		return NextResponse.json({ error: "Error updating button" }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { id } = await req.json()

		if (typeof id !== "number") {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
		}

		const existingButton = await db.socialButton.findUnique({ where: { id } })
		if (!existingButton || existingButton.userId !== session.user.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		await db.socialButton.delete({ where: { id } })

		return new NextResponse(null, { status: 204 })
	} catch (error) {
		console.error("Error deleting button:", error)
		return NextResponse.json({ error: "Error deleting button" }, { status: 500 })
	}
}
