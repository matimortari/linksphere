import { db } from "@/src/lib/db"
import { errorResponse, getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const { session } = await getSessionOrUnauthorized()

		if (!session?.user?.email) {
			return errorResponse("User not authenticated", 401)
		}

		const { name = "Anonymous", email } = session.user
		const { message, rating } = await req.json()

		if (!message) {
			return errorResponse("Feedback message is required", 400)
		}

		await db.feedback.create({
			data: { name, email, message, rating: rating ?? null }
		})

		return new NextResponse(JSON.stringify({ message: "Feedback received successfully!" }), { status: 200 })
	} catch (error) {
		console.error("Error submitting feedback:", error)
		return errorResponse("Error submitting feedback", 500)
	}
}
