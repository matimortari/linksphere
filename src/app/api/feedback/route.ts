import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		// Just return a dummy response for testing
		return new NextResponse(JSON.stringify({ message: "Feedback received!" }), { status: 200 })
	} catch (error) {
		console.error("Error submitting feedback:", error)
		return new NextResponse(JSON.stringify({ error: "Error submitting feedback" }), { status: 500 })
	}
}
