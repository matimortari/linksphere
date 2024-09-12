import { getSessionOrUnauthorized } from "@/src/lib/actions"
import { db } from "@/src/lib/db"
import { validateLinkData } from "@/src/lib/utils"
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

		const userLinks = await db.userLink.findMany({ where: { userId: user.id } })
		return NextResponse.json(userLinks)
	} catch (error) {
		console.error("Error fetching links:", error)
		return NextResponse.json({ error: "Error fetching links" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { title, url } = await req.json()

		if (!title || !url) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 })
		}

		const newLink = await db.userLink.create({
			data: {
				title,
				url,
				userId: session.user.id,
			},
		})

		return NextResponse.json(newLink)
	} catch (error) {
		console.error("Error adding link:", error)
		return NextResponse.json({ error: "Error adding link" }, { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const { id, title, url } = await req.json()

		if (typeof id !== "number" || !validateLinkData({ title, url })) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 })
		}

		const existingLink = await db.userLink.findUnique({ where: { id } })
		if (!existingLink || existingLink.userId !== session.user.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		const updatedLink = await db.userLink.update({
			where: { id },
			data: { title, url },
		})

		return NextResponse.json(updatedLink)
	} catch (error) {
		console.error("Error updating link:", error)
		return NextResponse.json({ error: "Error updating link" }, { status: 500 })
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

		const existingLink = await db.userLink.findUnique({ where: { id } })
		if (!existingLink || existingLink.userId !== session.user.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 })
		}

		await db.userLink.delete({ where: { id } })

		return new NextResponse(null, { status: 204 })
	} catch (error) {
		console.error("Error deleting link:", error)
		return NextResponse.json({ error: "Error deleting link" }, { status: 500 })
	}
}
