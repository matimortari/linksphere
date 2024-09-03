import { db } from "@/src/lib/db"
import type { NextApiRequest, NextApiResponse } from "next"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const { userId } = req.query

	if (typeof userId !== "string") {
		return res.status(400).json({ error: "Invalid userId" })
	}

	try {
		const links = await db.userLink.findMany({ where: { userId } })
		res.status(200).json(links)
	} catch (error) {
		console.error("Error fetching links:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}
