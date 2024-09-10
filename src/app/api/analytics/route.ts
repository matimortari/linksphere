// src/app/api/analytics/route.ts
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

		const user = await db.user.findUnique({
			where: { slug: userSlug },
			include: { UserStats: true },
		})

		if (!user) {
			throw new Error(`User with slug ${userSlug} not found`)
		}

		const stats =
			user.UserStats[0] ||
			(await db.userStats.create({
				data: { userId: user.id, views: 0, clicks: 0 },
			}))

		return NextResponse.json({ success: true, stats })
	} catch (error) {
		console.error("Error in /api/analytics route:", error)
		return NextResponse.error()
	}
}
