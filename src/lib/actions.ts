import { defaultSettings } from "./utils"

export async function fetchUserData() {
	const response = await fetch("/api/user")
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}

export async function fetchUserLinks(slug: string) {
	const response = await fetch(`/api/links?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user links")
	}
	return response.json()
}

export async function fetchUserSettings() {
	try {
		const response = await fetch("/api/preferences")
		if (!response.ok) {
			const { error } = await response.json()
			throw new Error(error)
		}

		const { settings } = await response.json()
		return {
			...defaultSettings,
			...settings,
		}
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return defaultSettings
	}
}
