import { User, UserLink } from "@prisma/client"

export async function fetchLinks(userId: string): Promise<UserLink[]> {
	const response = await fetch(`/api/links?userId=${userId}`)
	if (!response.ok) {
		throw new Error("Failed to fetch links")
	}
	return response.json()
}

export async function fetchUser(userId: string): Promise<User> {
	const response = await fetch(`/api/user?userId=${userId}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}
