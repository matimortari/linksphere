import { User, UserLink } from "@prisma/client"

export async function fetchLinks(slug: string): Promise<UserLink[]> {
	const response = await fetch(`/api/links?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch links")
	}
	return response.json()
}

export async function fetchUser(slug: string): Promise<User> {
	const response = await fetch(`/api/user?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}

export async function fetchUserBySlug(slug: string): Promise<User> {
	const response = await fetch(`/api/user?slug=${slug}`)
	if (!response.ok) {
		throw new Error("Failed to fetch user data")
	}
	return response.json()
}
