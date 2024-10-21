import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}
	return { error: false, session }
}

export function validateLinkData(data: any) {
	return data && typeof data.title === "string" && typeof data.url === "string"
}

export function validateButtonData(data: any) {
	return data && typeof data.platform === "string" && typeof data.url === "string" && typeof data.icon === "string"
}

export function errorResponse(message: string, status: number) {
	return NextResponse.json({ error: message }, { status })
}

export async function fetchAPI(endpoint: string, options?: RequestInit) {
	const response = await fetch(endpoint, {
		headers: { "Content-Type": "application/json" },
		...options
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || "An error occurred")
	}

	return data
}

export function generateSlug(base: string = "", isInitial: boolean = false, length: number = 6) {
	const randomString = () =>
		Math.random()
			.toString(36)
			.substring(2, 2 + length)

	return isInitial
		? `${base
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "")}-${randomString()}`
		: `${randomString()}-${randomString()}`
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}
