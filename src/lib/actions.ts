import { db } from "./db"
import { fetchAPI } from "./utils"

// Fetch user data
export async function fetchUserData() {
	return fetchAPI("/api/user", { method: "GET" })
}

// Fetch user settings
export async function fetchUserSettings() {
	const data = await fetchAPI("/api/preferences")
	return data.settings
}

// Fetch user links based on slug
export async function fetchUserLinks(slug: string) {
	return fetchAPI(`/api/links?slug=${slug}`)
}

// Fetch user social buttons based on slug
export async function fetchUserButtons(slug: string) {
	return fetchAPI(`/api/buttons?slug=${slug}`)
}

// Fetch user analytics
export async function fetchUserAnalytics() {
	return fetchAPI("/api/analytics")
}

// Delete user account
export async function deleteUserAccount() {
	return fetchAPI("/api/user", { method: "DELETE" })
}

// Add a new link
export async function addLink(newLink: object) {
	return fetchAPI("/api/links", {
		method: "POST",
		body: JSON.stringify(newLink)
	})
}

// Update an existing link
export async function updateLink(updatedLink: object) {
	return fetchAPI("/api/links", {
		method: "PUT",
		body: JSON.stringify(updatedLink)
	})
}

// Delete a link by its ID
export async function deleteLink(id: string): Promise<string> {
	await fetch(`/api/links?id=${id}`, { method: "DELETE" })
	// await fetchAPI(`/api/links?id=${id}`, { method: "DELETE" })
	return id
}

// Add a new social button
export async function addButton(newButton: object) {
	return fetchAPI("/api/buttons", {
		method: "POST",
		body: JSON.stringify(newButton)
	})
}

// Delete a social button by its ID
export async function deleteButton(id: string) {
	await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })
	// await fetchAPI(`/api/buttons?id=${id}`, { method: "DELETE" })
	return id
}

// Update user settings
export async function updateSettings(newSettings: object) {
	return fetchAPI("/api/preferences", {
		method: "PUT",
		body: JSON.stringify(newSettings)
	})
}

// Reset user settings to default
export async function resetSettings() {
	return fetchAPI("/api/preferences", {
		method: "PUT",
		body: JSON.stringify({})
	})
}

// Update user banner
export async function updateUserBanner(newBanner: string) {
	try {
		const currentSettings = await fetchUserSettings()
		const updatedSettings = { ...currentSettings, supportBanner: newBanner }
		await updateSettings(updatedSettings)
	} catch (error) {
		console.error("Error saving support banner:", error)
	}
}

// Track a page visit based on the user's slug
export async function trackPageVisit(slug: string) {
	const user = await db.user.findUnique({
		where: { slug },
		include: { UserStats: true }
	})

	if (!user) return

	const stats =
		user.UserStats[0] ||
		(await db.userStats.create({
			data: { userId: user.id, views: 0, clicks: 0 }
		}))

	await db.userStats.update({
		where: { id: stats.id },
		data: { views: stats.views + 1 }
	})
}

// Track a user click
export async function trackClick(id: string, type: string) {
	try {
		await fetchAPI("/api/analytics", {
			method: "POST",
			body: JSON.stringify({ id, type })
		})
	} catch (error) {
		console.error("Failed to increment click count:", error)
	}
}

// Handle form submission
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
		const data = await fetchAPI(url, {
			method: "PUT",
			body: JSON.stringify(payload)
		})

		setSuccess("Updated successfully!")
		if (onSuccess) onSuccess()
	} catch (error: any) {
		setError(error.message)
	}
}

// Handle dialog form submission
export async function handleDialogFormSubmit({
	contextFn,
	formData,
	onClose,
	onError
}: {
	contextFn: (data: object) => Promise<any>
	formData: object
	onClose: () => void
	onError: (error: string | null) => void
}) {
	const result = await contextFn(formData)

	if (result?.error) {
		onError(result.error)
	} else {
		onClose()
		onError(null)
	}
}

// Handle feedback form submission
export async function handleFeedbackSubmit(message: string, rating: number | null) {
	try {
		const responseData = await fetchAPI("/api/feedback", {
			method: "POST",
			body: JSON.stringify({ message, rating })
		})

		return { success: true, message: "Feedback submitted successfully!" }
	} catch (error: any) {
		console.error("Error submitting feedback:", error)
		return { success: false, message: error.message || "Failed to submit feedback" }
	}
}
