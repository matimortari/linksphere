import { User, UserLink } from "@prisma/client"

export function generateSlug(name) {
	const baseSlug = name
		? name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "")
				.slice(0, 20)
		: Math.random().toString(36).substr(2, 8)

	const randomString = Math.random().toString(36).substr(2, 4)

	return `${baseSlug}-${randomString}`
}

export async function fetchLinks(slug: string): Promise<UserLink[]> {
	const response = await fetch(`/api/links?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch links")
	}
	return response.json()
}

export async function fetchUser(slug: string): Promise<User> {
	const response = await fetch(`/api/user?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}

export async function fetchUserSettings() {
	try {
		const response = await fetch(`/api/preferences`)
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.error || "Failed to fetch settings")
		}

		// Ensure the settings object is in the expected format
		if (data.settings) {
			return data.settings
		} else {
			throw new Error("Settings data is missing")
		}
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return {
			linkBackgroundColor: "#ffffff",
			linkTextColor: "#000000",
			linkHoverBackgroundColor: "#eeeeee",
		}
	}
}
