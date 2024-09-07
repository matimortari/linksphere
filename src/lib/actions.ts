export async function fetchUserData() {
	const response = await fetch("/api/user")
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}

export async function fetchUserLinks(slug) {
	const response = await fetch(`/api/links?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user links")
	}
	return response.json()
}

export async function fetchUserSettings() {
	try {
		const response = await fetch(`/api/preferences`)
		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}
		const data = await response.json()
		return (
			data.settings || {
				linkBackgroundColor: "#ffffff",
				linkTextColor: "#000000",
				linkHoverBackgroundColor: "#eeeeee",
			}
		)
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return {
			linkBackgroundColor: "#ffffff",
			linkTextColor: "#000000",
			linkHoverBackgroundColor: "#eeeeee",
		}
	}
}
