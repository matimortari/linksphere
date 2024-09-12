import { db } from "./db"

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
	const response = await fetch("/api/preferences")
	if (!response.ok) {
		throw new Error((await response.json()).error)
	}

	return (await response.json()).settings
}

export async function fetchUserAnalytics() {
	try {
		const response = await fetch("/api/analytics")
		if (!response.ok) throw new Error("Network response was not ok")

		const data = await response.json()
		if (!data.success) {
			throw new Error("Failed to fetch analytics data")
		}

		return data
	} catch (error) {
		console.error("Error fetching analytics:", error)
		throw error
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

export const trackClick = async (id, type) => {
	try {
		await fetch("/api/analytics", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, type }),
		})
	} catch (error) {
		console.error("Failed to increment click count:", error)
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
