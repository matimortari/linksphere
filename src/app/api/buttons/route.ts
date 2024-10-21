import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized, validateButtonData } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const slug = req.nextUrl.searchParams.get("slug")
	if (!slug) return errorResponse("Invalid slug", 400)

	const user = await db.user.findUnique({ where: { slug } })
	if (!user) return errorResponse("User not found", 404)

	const userButtons = await db.socialButton.findMany({ where: { userId: user.id } })
	return NextResponse.json(userButtons)
}

export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { platform, url, icon } = await req.json()
	if (!platform || !url || !icon) return errorResponse("Invalid input", 400)

	const newButton = await db.socialButton.create({
		data: { platform, url, icon, userId: session.user.id }
	})

	return NextResponse.json(newButton)
}

export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, platform, url, icon } = await req.json()
	if (typeof id !== "number" || !validateButtonData({ platform, url, icon })) {
		return errorResponse("Invalid input", 400)
	}

	const existingButton = await db.socialButton.findUnique({ where: { id } })
	if (!existingButton || existingButton.userId !== session.user.id) {
		return errorResponse("Forbidden", 403)
	}

	const updatedButton = await db.socialButton.update({
		where: { id },
		data: { platform, url, icon }
	})

	return NextResponse.json(updatedButton)
}

export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id || isNaN(Number(id))) return errorResponse("Invalid ID", 400)

	const existingButton = await db.socialButton.findUnique({ where: { id: Number(id) } })
	if (!existingButton || existingButton.userId !== session.user.id) {
		return errorResponse("Forbidden", 403)
	}

	await db.socialButton.delete({ where: { id: Number(id) } })
	return new NextResponse(null, { status: 204 }) // No content, successful deletion
}
