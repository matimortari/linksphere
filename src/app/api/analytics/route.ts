import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.redirect(new URL("/login", request.url))
		}

		const userSlug = session.user?.slug
		if (!userSlug) {
			throw new Error("User slug is missing in the session")
		}

		const user = await db.user.findUnique({
			where: { slug: userSlug },
			include: { UserStats: true, links: true, buttons: true },
		})

		if (!user) {
			throw new Error(`User with slug ${userSlug} not found`)
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
		return NextResponse.error()
	}
}

export async function POST(request: Request) {
	try {
		const { id, type } = await request.json()

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

		return NextResponse.json({ success: false, error: "Invalid type" })
	} catch (error) {
		console.error("Error incrementing clicks:", error)
		return NextResponse.json({ success: false, error: "Failed to increment clicks" })
	}
}
