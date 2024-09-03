"use client"

import LinkItem from "@/src/components/LinkItem"
import { fetchLinks } from "@/src/lib/actions"
import { UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { userId: string } }) {
	const [links, setLinks] = useState<UserLink[]>([])
	const { userId } = params
	const { data: session, status } = useSession()

	const fetchUserLinks = async () => {
		if (status === "loading" || !userId) {
			return
		}

		try {
			const linksFromServer = await fetchLinks(userId)
			setLinks(linksFromServer as UserLink[])
		} catch (err) {
			console.error("Failed to fetch links:", err)
		}
	}

	useEffect(() => {
		fetchUserLinks()
	}, [userId, status])

	if (status === "loading") {
		return <div>Loading...</div>
	}

	return (
		<div className="h-screen">
			<div className="h-full bg-muted">
				<ul className="space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} {...link} />
					))}
				</ul>
			</div>
		</div>
	)
}
