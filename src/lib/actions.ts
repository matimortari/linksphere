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

export async function handleFormSubmit(
	e: React.FormEvent,
	url: string,
	payload: object,
	setSuccess: React.Dispatch<React.SetStateAction<string | null>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	onSuccess?: () => void
) {
	e.preventDefault()
	setError(null)
	setSuccess(null)

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.error)
		}

		setSuccess("Operation completed successfully!")
		if (onSuccess) onSuccess()
	} catch (error) {
		setError((error as Error).message)
	}
}
