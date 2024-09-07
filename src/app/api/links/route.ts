import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

// Handler for GET requests to fetch user links
export async function GET(req: NextRequest) {
	try {
		const slug = req.nextUrl.searchParams.get("slug")

		if (!slug || typeof slug !== "string") {
			return new NextResponse("Invalid slug", { status: 400 })
		}

		const user = await db.user.findUnique({
			where: { slug },
		})

		if (!user) {
			return new NextResponse("User not found", { status: 404 })
		}

		const userLinks = await db.userLink.findMany({
			where: {
				userId: user.id,
			},
		})

		return NextResponse.json(userLinks)
	} catch (error) {
		console.error("Error fetching links:", error)
		return new NextResponse("Error fetching links", { status: 500 })
	}
}

// Handler for POST requests to add a new link
export async function POST(req: NextRequest) {
	try {
		const { title, url } = await req.json()

		if (!title || typeof title !== "string" || !url || typeof url !== "string") {
			return new NextResponse(JSON.stringify({ error: "Invalid input" }), { status: 400 })
		}

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const newLink = await db.userLink.create({
			data: {
				title,
				url,
				userId,
			},
		})

		return NextResponse.json(newLink)
	} catch (error) {
		console.error("Error adding link:", error)
		return new NextResponse(JSON.stringify({ error: "Error adding link" }), { status: 500 })
	}
}

// Handler for PUT requests to update an existing link
export async function PUT(req: NextRequest) {
	try {
		const { id, title, url } = await req.json()

		if (typeof id !== "number" || !title || typeof title !== "string" || !url || typeof url !== "string") {
			return new NextResponse(JSON.stringify({ error: "Invalid input" }), { status: 400 })
		}

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const existingLink = await db.userLink.findUnique({
			where: { id },
		})

		if (!existingLink || existingLink.userId !== userId) {
			return new NextResponse(JSON.stringify({ error: "Link not found or not authorized" }), { status: 403 })
		}

		const updatedLink = await db.userLink.update({
			where: { id },
			data: { title, url },
		})

		return NextResponse.json(updatedLink)
	} catch (error) {
		console.error("Error updating link:", error)
		return new NextResponse(JSON.stringify({ error: "Error updating link" }), { status: 500 })
	}
}

// Handler for DELETE requests to delete an existing link
export async function DELETE(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id")

		if (!id || isNaN(Number(id))) {
			return new NextResponse(JSON.stringify({ error: "Invalid ID" }), { status: 400 })
		}

		const idNumber = parseInt(id, 10)

		// Authenticate user
		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		// Check if the link exists and belongs to the user
		const existingLink = await db.userLink.findUnique({
			where: { id: idNumber },
		})

		if (!existingLink || existingLink.userId !== userId) {
			return new NextResponse(JSON.stringify({ error: "Link not found or not authorized" }), { status: 403 })
		}

		// Delete the link
		await db.userLink.delete({
			where: { id: idNumber },
		})

		// Respond with 204 No Content
		return new NextResponse(null, { status: 204 })
	} catch (error) {
		console.error("Error deleting link:", error)
		return new NextResponse(JSON.stringify({ error: "Error deleting link" }), { status: 500 })
	}
}
