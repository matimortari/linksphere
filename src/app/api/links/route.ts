import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized, validateLinkData } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const slug = req.nextUrl.searchParams.get("slug")
	if (!slug) return errorResponse("Invalid slug", 400)

	const user = await db.user.findUnique({ where: { slug } })
	if (!user) return errorResponse("User not found", 404)

	const userLinks = await db.userLink.findMany({ where: { userId: user.id } })
	return NextResponse.json(userLinks)
}

export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { title, url } = await req.json()
	if (!title || !url) return errorResponse("Invalid input", 400)

	const newLink = await db.userLink.create({
		data: { title, url, userId: session.user.id },
	})

	return NextResponse.json(newLink)
}

export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, title, url } = await req.json()
	if (typeof id !== "number" || !validateLinkData({ title, url })) {
		return errorResponse("Invalid input", 400)
	}

	const existingLink = await db.userLink.findUnique({ where: { id } })
	if (!existingLink || existingLink.userId !== session.user.id) {
		return errorResponse("Forbidden", 403)
	}

	const updatedLink = await db.userLink.update({
		where: { id },
		data: { title, url },
	})

	return NextResponse.json(updatedLink)
}

export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id || isNaN(Number(id))) return errorResponse("Invalid ID", 400)

	const existingLink = await db.userLink.findUnique({ where: { id: Number(id) } })
	if (!existingLink || existingLink.userId !== session.user.id) {
		return errorResponse("Forbidden", 403)
	}

	await db.userLink.delete({ where: { id: Number(id) } })
	return new NextResponse(null, { status: 204 }) // No content, successful deletion
}
