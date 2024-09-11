import { db } from "./db"
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

export async function fetchUserButtons(slug: string) {
	const response = await fetch(`/api/buttons?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user buttons")
	}
	return response.json()
}

export async function fetchUserSettings() {
	try {
		const response = await fetch("/api/preferences")
		if (!response.ok) throw new Error((await response.json()).error)

		return { ...defaultSettings, ...(await response.json()).settings }
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return defaultSettings
	}
}

export async function handleFormSubmit(
	e: React.FormEvent,
	url: string,
	payload: object,
	setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	onSuccess?: () => void
) {
	e.preventDefault()

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		})

		const data = await response.json()
		if (!response.ok) throw new Error(data.error)

		setSuccess("Updated successfully!")
		onSuccess?.()
	} catch (error) {
		setError((error as Error).message)
	}
}

export async function trackPageVisit(slug: string) {
	const user = await db.user.findUnique({
		where: { slug },
		include: { UserStats: true },
	})

	if (!user) return

	const stats =
		user.UserStats[0] ??
		(await db.userStats.create({
			data: { userId: user.id, views: 0, clicks: 0 },
		}))

	await db.userStats.update({
		where: { id: stats.id },
		data: { views: stats.views + 1 },
	})
}
