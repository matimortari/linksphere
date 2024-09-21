import { db } from "./db"

// Fetch user data
export async function fetchUserData() {
	const response = await fetch("/api/user")

	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}

// Fetch user settings
export async function fetchUserSettings() {
	const response = await fetch("/api/preferences")

	if (!response.ok) {
		throw new Error((await response.json()).error)
	}

	return (await response.json()).settings
}

// Fetch user links based on slug
export async function fetchUserLinks(slug: string) {
	const response = await fetch(`/api/links?slug=${slug}`)

	if (!response.ok) {
		throw new Error("Failed to fetch user links")
	}
	return response.json()
}

// Fetch user social buttons based on slug
export async function fetchUserButtons(slug: string) {
	const response = await fetch(`/api/buttons?slug=${slug}`)

	if (!response.ok) {
		throw new Error("Failed to fetch user buttons")
	}
	return response.json()
}

// Fetch user analytics
export async function fetchUserAnalytics() {
	const response = await fetch("/api/analytics")

	if (!response.ok) {
		throw new Error("Network response was not ok")
	}

	return response.json()
}

// Add a new link
export async function addLink(newLink) {
	try {
		const response = await fetch("/api/links", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newLink),
		})

		if (!response.ok) throw new Error((await response.json()).error)

		return response.json()
	} catch (error) {
		throw new Error("Failed to add link: " + error.message)
	}
}

// Update an existing link
export async function updateLink(updatedLink) {
	try {
		const response = await fetch("/api/links", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedLink),
		})

		if (!response.ok) throw new Error((await response.json()).error)

		return response.json()
	} catch (error) {
		throw new Error("Failed to update link: " + error.message)
	}
}

// Delete a link by its ID
export async function deleteLink(id: string): Promise<string> {
	try {
		const response = await fetch(`/api/links?id=${id}`, { method: "DELETE" })

		if (response.status !== 204) throw new Error((await response.json()).error)

		return id
	} catch (error) {
		throw new Error("Failed to delete link: " + error.message)
	}
}

// Add a new social button
export async function addButton(newButton) {
	try {
		const response = await fetch("/api/buttons", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newButton),
		})

		if (!response.ok) throw new Error((await response.json()).error)

		return response.json()
	} catch (error) {
		throw new Error("Failed to add button: " + error.message)
	}
}

// Delete a social button by its ID
export async function deleteButton(id) {
	try {
		const response = await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })

		if (response.status !== 204) throw new Error((await response.json()).error)

		return id
	} catch (error) {
		throw new Error("Failed to delete button: " + error.message)
	}
}

// Update user settings
export async function updateSettings(newSettings) {
	try {
		const response = await fetch("/api/preferences", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newSettings),
		})

		if (!response.ok) throw new Error((await response.json()).error)

		return response.json()
	} catch (error) {
		throw new Error("Failed to update settings: " + error.message)
	}
}

// Update user banner
export async function updateUserBanner(newBanner) {
	try {
		const currentSettings = await fetchUserSettings()
		const updatedSettings = { ...currentSettings, supportBanner: newBanner }
		await updateSettings(updatedSettings)
		alert("Support banner has been updated successfully!")
	} catch (error) {
		console.error("Error saving support banner:", error)
		alert(`Error saving support banner: ${error.message}`)
	}
}

// Delete user account
export async function deleteUserAccount() {
	try {
		const response = await fetch("/api/user", {
			method: "DELETE",
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || "Failed to delete the account")
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

// Track a page visit based on the user's slug
export async function trackPageVisit(slug) {
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

// Track a user click
export async function trackClick(id, type) {
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

// Handle form submission for dialogs
export async function handleDialogFormSubmit({ contextFn, formData, onClose, onError }) {
	const result = await contextFn(formData)

	if (result && result.error) {
		if (onError) onError(result.error)
	} else {
		onClose()
		if (onError) onError(null)
	}
}
