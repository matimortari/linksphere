import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const userSlug = session.user?.slug
		if (!userSlug) {
			return NextResponse.json({ error: "User slug is missing in the session" }, { status: 400 })
		}

		const user = await db.user.findUnique({
			where: { slug: userSlug },
			include: { UserStats: true, links: true, buttons: true },
		})

		if (!user) {
			return NextResponse.json({ error: `User with slug ${userSlug} not found` }, { status: 404 })
		}

		const stats =
			user.UserStats[0] ||
			(await db.userStats.create({
				data: { userId: user.id, views: 0, clicks: 0 },
			}))

		const totalClicks =
			user.links.reduce((sum, link) => sum + link.clicks, 0) +
			user.buttons.reduce((sum, button) => sum + button.clicks, 0)

		const updatedStats = await db.userStats.update({
			where: { id: stats.id },
			data: { clicks: totalClicks },
		})

		return NextResponse.json({ success: true, stats: updatedStats })
	} catch (error) {
		console.error("Error in /api/analytics route:", error)
		return NextResponse.json({ success: false, error: "Failed to fetch or update analytics" }, { status: 500 })
	}
}

export async function POST(request: Request) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()
		if (error) return response

		const { id, type } = await request.json()

		if (!id || !type) {
			return NextResponse.json({ success: false, error: "Missing id or type" }, { status: 400 })
		}

		if (type === "link") {
			const updatedLink = await db.userLink.update({
				where: { id },
				data: { clicks: { increment: 1 } },
			})

			return NextResponse.json({ success: true, updatedLink })
		} else if (type === "button") {
			const updatedButton = await db.socialButton.update({
				where: { id },
				data: { clicks: { increment: 1 } },
			})

			return NextResponse.json({ success: true, updatedButton })
		}

		return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 })
	} catch (error) {
		console.error("Error incrementing clicks:", error)
		return NextResponse.json({ success: false, error: "Failed to increment clicks" }, { status: 500 })
	}
}
