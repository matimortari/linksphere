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
		const response = await fetch(`/api/preferences`)
		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error)
		}
		const data = await response.json()
		return {
			backgroundColor: data.settings.backgroundColor || "#ffffff",
			linkBackgroundColor: data.settings.linkBackgroundColor || "#ffffff",
			linkTextColor: data.settings.linkTextColor || "#000000",
			linkHoverBackgroundColor: data.settings.linkHoverBackgroundColor || "#eeeeee",
			shadowColor: data.settings.shadowColor || "#000000",
			linkBorderRadius: data.settings.linkBorderRadius || "4px",
			linkPadding: data.settings.linkPadding || "4px",
			headerTextColor: data.settings.headerTextColor || "#000000",
		}
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return {
			backgroundColor: "#ffffff",
			linkBackgroundColor: "#ffffff",
			linkTextColor: "#000000",
			linkHoverBackgroundColor: "#eeeeee",
			shadowColor: "#000000",
			linkBorderRadius: "4px",
			linkPadding: "4px",
			headerTextColor: "#000000",
		}
	}
}
