import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

// Handler for GET requests to fetch user settings
export async function GET(req) {
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		const settings = await db.userSettings.findUnique({
			where: { userId: session.user.id },
		})

		if (settings) {
			return NextResponse.json({ settings }, { status: 200 })
		} else {
			return NextResponse.json({ error: "Settings not found" }, { status: 404 })
		}
	} catch (error) {
		console.error("Error fetching settings:", error)
		return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
	}
}

// Handler for PUT requests to update user settings
export async function PUT(req) {
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		const {
			backgroundColor,
			linkBackgroundColor,
			linkTextColor,
			linkHoverBackgroundColor,
			linkShadowColor,
			linkBorderRadius,
			linkPadding,
			headerTextColor,
		} = await req.json()

		const updatedSettings = await db.userSettings.update({
			where: { userId: session.user.id },
			data: {
				backgroundColor,
				linkBackgroundColor,
				linkTextColor,
				linkHoverBackgroundColor,
				linkShadowColor,
				linkBorderRadius,
				linkPadding,
				headerTextColor,
			},
		})

		return NextResponse.json({ message: "Settings updated successfully", settings: updatedSettings }, { status: 200 })
	} catch (error) {
		console.error("Error updating settings:", error)
		return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
	}
}
