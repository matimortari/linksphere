import { defaultSettings } from "@/src/data/userSettings"
import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const settings = await db.userSettings.findUnique({
			where: { userId: session.user.id },
		})

		return settings
			? NextResponse.json({ settings }, { status: 200 })
			: NextResponse.json({ error: "Settings not found" }, { status: 404 })
	} catch (error) {
		console.error("Error fetching settings:", error)
		return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
	}
}

export async function PUT(req) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	try {
		const settingsData = await req.json()

		if (!settingsData || Object.keys(settingsData).length === 0) {
			const updatedSettings = await db.userSettings.update({
				where: { userId: session.user.id },
				data: defaultSettings,
			})
			return NextResponse.json(
				{ message: "Settings reset to default successfully", settings: updatedSettings },
				{ status: 200 }
			)
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
