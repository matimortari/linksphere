import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

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

		const userButtons = await db.socialButton.findMany({
			where: {
				userId: user.id,
			},
		})

		return NextResponse.json(userButtons)
	} catch (error) {
		console.error("Error fetching buttons:", error)
		return new NextResponse("Error fetching buttons", { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		const { platform, url, icon } = await req.json()

		if (
			!platform ||
			typeof platform !== "string" ||
			!url ||
			typeof url !== "string" ||
			!icon ||
			typeof icon !== "string"
		) {
			return new NextResponse(JSON.stringify({ error: "Invalid input" }), { status: 400 })
		}

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const newButton = await db.socialButton.create({
			data: {
				platform,
				url,
				icon,
				userId,
			},
		})

		return NextResponse.json(newButton)
	} catch (error) {
		console.error("Error adding button:", error)
		return new NextResponse(JSON.stringify({ error: "Error adding button" }), { status: 500 })
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { id, platform, url, icon } = await req.json()

		if (
			typeof id !== "number" ||
			!platform ||
			typeof platform !== "string" ||
			!url ||
			typeof url !== "string" ||
			!icon ||
			typeof icon !== "string"
		) {
			return new NextResponse(JSON.stringify({ error: "Invalid input" }), { status: 400 })
		}

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const existingButton = await db.socialButton.findUnique({
			where: { id },
		})

		if (!existingButton || existingButton.userId !== userId) {
			return new NextResponse(JSON.stringify({ error: "Button not found or not authorized" }), { status: 403 })
		}

		const updatedButton = await db.socialButton.update({
			where: { id },
			data: { platform, url, icon },
		})

		return NextResponse.json(updatedButton)
	} catch (error) {
		console.error("Error updating button:", error)
		return new NextResponse(JSON.stringify({ error: "Error updating button" }), { status: 500 })
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get("id")

		if (!id || isNaN(Number(id))) {
			return new NextResponse(JSON.stringify({ error: "Invalid ID" }), { status: 400 })
		}

		const idNumber = parseInt(id, 10)

		const session = await getServerSession(authOptions)
		const userId = session?.user?.id

		if (!userId) {
			return new NextResponse(JSON.stringify({ error: "User not authenticated" }), { status: 401 })
		}

		const existingButton = await db.socialButton.findUnique({
			where: { id: idNumber },
		})

		if (!existingButton || existingButton.userId !== userId) {
			return new NextResponse(JSON.stringify({ error: "Button not found or not authorized" }), { status: 403 })
		}

		await db.socialButton.delete({
			where: { id: idNumber },
		})

		return new NextResponse(null, { status: 204 })
	} catch (error) {
		console.error("Error deleting button:", error)
		return new NextResponse(JSON.stringify({ error: "Error deleting button" }), { status: 500 })
	}
}
