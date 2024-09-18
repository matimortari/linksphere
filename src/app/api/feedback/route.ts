import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const { error, session, response } = await getSessionOrUnauthorized()

		if (!session || !session.user || !session.user.email) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const { name, email } = session.user

		const body = await req.json()
		const { message } = body

		if (!message) {
			return new NextResponse(JSON.stringify({ error: "Feedback message is required" }), { status: 400 })
		}

		const feedback = await db.feedback.create({
			data: {
				name: name || "Anonymous",
				email: email!,
				message,
			},
		})

		return new NextResponse(JSON.stringify({ message: "Feedback received successfully!" }), { status: 200 })
	} catch (error) {
		console.error("Error submitting feedback:", error)
		return new NextResponse(JSON.stringify({ error: "Error submitting feedback" }), { status: 500 })
	}
}
