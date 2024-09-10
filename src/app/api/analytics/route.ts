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

		const userSlug = session.user?.slug // Adjust based on your session structure
		if (!userSlug) {
			throw new Error("User slug is missing in the session")
		}

		// Fetch the user based on slug, include links, buttons, and user stats
		const user = await db.user.findUnique({
			where: { slug: userSlug },
			include: { UserStats: true, links: true, buttons: true }, // Include both links and buttons
		})

		if (!user) {
			throw new Error(`User with slug ${userSlug} not found`)
		}

		// If UserStats don't exist for this user, create them
		const stats =
			user.UserStats[0] ||
			(await db.userStats.create({
				data: { userId: user.id, views: 0, clicks: 0 },
			}))

		// Get the total clicks from links and social buttons
		const totalClicks =
			user.links.reduce((sum, link) => sum + link.clicks, 0) +
			user.buttons.reduce((sum, button) => sum + button.clicks, 0)

		// Update the stats with new data (if necessary)
		const updatedStats = await db.userStats.update({
			where: { id: stats.id },
			data: { clicks: totalClicks },
		})

		// Send back the updated stats
		return NextResponse.json({ success: true, stats: updatedStats })
	} catch (error) {
		console.error("Error in /api/analytics route:", error)
		return NextResponse.error()
	}
}

// This handles POST requests for both link and button clicks
export async function POST(request: Request) {
	try {
		const { id, type } = await request.json() // Pass both the ID and the type (link or button)

		if (type === "link") {
			// Increment the clicks for the given linkId
			const updatedLink = await db.userLink.update({
				where: { id },
				data: { clicks: { increment: 1 } },
			})

			return NextResponse.json({ success: true, updatedLink })
		} else if (type === "button") {
			// Increment the clicks for the given buttonId
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
