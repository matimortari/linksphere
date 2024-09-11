import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
	const session = await getServerSession(authOptions)

	if (!session?.user) {
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

export async function PUT(req: Request) {
	const session = await getServerSession(authOptions)

	if (!session?.user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	try {
		const settingsData = await req.json()

		if (!settingsData || !settingsData.supportBanner) {
			return NextResponse.json({ error: "Invalid input" }, { status: 400 })
		}

		const updatedSettings = await db.userSettings.update({
			where: { userId: session.user.id },
			data: settingsData,
		})

		return NextResponse.json({ message: "Settings updated successfully", settings: updatedSettings }, { status: 200 })
	} catch (error) {
		console.error("Error updating settings:", error)

		return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
	}
}
