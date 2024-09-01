import { Link } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { db } from "./db"

export async function getUserLinks(): Promise<Link[]> {
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		throw new Error("Unauthorized")
	}

	const links: Link[] = await db.link.findMany({
		where: { userId: session.user.id },
	})

	return links
}

export async function fetchLinks(userId: string): Promise<Link[]> {
	try {
		return await db.link.findMany({
			where: { userId },
		})
	} catch (error) {
		if (error instanceof Error) {
			throw new Error("Failed to fetch links: " + error.message)
		} else {
			throw new Error("An unknown error occurred")
		}
	}
}
