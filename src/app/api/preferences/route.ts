import { defaultSettings } from "@/src/data/userSettings"
import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const settings = await db.userSettings.findUnique({
			where: { userId: session.user.id },
		})

		if (!settings) return errorResponse("Settings not found", 404)
		return NextResponse.json({ settings }, { status: 200 })
	} catch (error) {
		console.error("Error fetching settings:", error)
		return errorResponse("Failed to fetch settings", 500)
	}
}

export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const settingsData = await req.json()

		const updatedSettings = await db.userSettings.update({
			where: { userId: session.user.id },
			data: Object.keys(settingsData).length === 0 ? defaultSettings : settingsData,
		})

		const message =
			Object.keys(settingsData).length === 0
				? "Settings reset to default successfully"
				: "Settings updated successfully"

		return NextResponse.json({ message, settings: updatedSettings }, { status: 200 })
	} catch (error) {
		console.error("Error updating settings:", error)
		return errorResponse("Failed to update settings", 500)
	}
}
