"use client"

import { Link } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import LinkItem from "../components/LinkItem"
import { fetchLinks } from "../lib/actions"

export default function Home() {
	const [links, setLinks] = useState<Link[]>([])
	const { data: session, status } = useSession()

	const fetchUserLinks = async () => {
		if (status === "loading" || !session?.user?.id) {
			return
		}
		try {
			const linksFromServer = await fetchLinks(session.user.id)
			setLinks(linksFromServer as Link[])
		} catch (err) {
			console.error("Failed to fetch links:", err)
		}
	}

	useEffect(() => {
		fetchUserLinks()
	}, [session, status])

	if (status === "loading") {
		return <div>Loading...</div>
	}

	if (!session?.user) {
		return (
			<div className="h-screen p-4">
				<header className="mb-6 flex items-center justify-between">
					<strong className="text-2xl md:text-4xl">My Links</strong>
				</header>
				<p className="text-2xl font-light text-muted-foreground">
					Welcome! Please sign in to view and manage your links.
				</p>
			</div>
		)
	}

	return (
		<div className="h-screen p-4">
			<header className="mb-6 flex items-center justify-between">
				<strong className="text-2xl md:text-4xl">My Links</strong>
				<a href="/new" className="button md:ml-4">
					New Link
				</a>
			</header>
			<ul className="space-y-4">
				{links.map((link) => (
					<LinkItem key={link.id} {...link} />
				))}
			</ul>
		</div>
	)
}
