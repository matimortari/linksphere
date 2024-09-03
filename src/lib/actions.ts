import { UserLink } from "@prisma/client"

export async function fetchLinks(userId: string): Promise<UserLink[]> {
	const response = await fetch(`/api/links?userId=${userId}`)
	if (!response.ok) {
		throw new Error("Failed to fetch links")
	}
	return response.json()
}
