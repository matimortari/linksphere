import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./auth"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function validateLinkData(data: any) {
	return data && typeof data.title === "string" && typeof data.url === "string"
}

export function validateButtonData(data: any) {
	return data && typeof data.platform === "string" && typeof data.url === "string" && typeof data.icon === "string"
}

export function generateSlug(name: string) {
	const baseSlug = (name || Math.random().toString(36).substring(2, 10))
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 20)

	return `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`
}

export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}
	return { error: false, session }
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}
