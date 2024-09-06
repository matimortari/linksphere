import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

// Handler for GET requests to fetch user settings
export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const settings = await db.userSettings.findUnique({
			where: { userId: session.user.id },
		})

		if (!settings) {
			return NextResponse.json({ error: "Settings not found" }, { status: 404 })
		}

		return NextResponse.json({ settings })
	} catch (error) {
		console.error("Error fetching settings:", error)
		return NextResponse.json({ error: "Error fetching settings data" }, { status: 500 })
	}
}
