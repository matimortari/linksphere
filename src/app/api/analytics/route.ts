import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const userSlug = session.user?.slug
		if (!userSlug) return errorResponse("Missing user slug", 400)

		const user = await db.user.findUnique({
			where: { slug: userSlug },
			include: { UserStats: true, links: true, buttons: true },
		})
		if (!user) return errorResponse("User not found", 404)

		const stats = user.UserStats[0] || (await db.userStats.create({ data: { userId: user.id, views: 0, clicks: 0 } }))
		const totalClicks = [...user.links, ...user.buttons].reduce((sum, item) => sum + item.clicks, 0)

		const updatedStats = await db.userStats.update({
			where: { id: stats.id },
			data: { clicks: totalClicks },
		})

		return NextResponse.json({ user, stats: updatedStats })
	} catch (error) {
		console.error("Error fetching user:", error)
		return errorResponse("Failed to fetch user", 500)
	}
}

export async function POST(req: NextRequest) {
	try {
		const { error, response } = await getSessionOrUnauthorized()
		if (error) return response

		const { id, type } = await req.json()
		if (!id || !type) return errorResponse("Missing id or type", 400)

		const dbModel = { link: db.userLink, button: db.socialButton }[type]
		if (!dbModel) return errorResponse("Invalid type", 400)

		const updatedItem = await dbModel.update({
			where: { id },
			data: { clicks: { increment: 1 } },
		})

		return NextResponse.json(updatedItem)
	} catch (error) {
		console.error("Error updating item:", error)
		return errorResponse("Failed to update item", 500)
	}
}
