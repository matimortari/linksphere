"use client"

import { fetchLinks, fetchUser } from "@/src/lib/actions"
import { User, UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import LinkItem from "../LinkItem"

export default function Preview() {
	const { data: session, status } = useSession()
	const [user, setUser] = useState<User | null>(null)
	const [links, setLinks] = useState<UserLink[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchUserData = async () => {
		if (status === "loading" || !session?.user?.slug) {
			return
		}

		try {
			const [userFromServer, linksFromServer] = await Promise.all([
				fetchUser(session.user.slug),
				fetchLinks(session.user.slug),
			])
			setUser(userFromServer)
			setLinks(linksFromServer)
		} catch (err) {
			console.error("Failed to fetch data:", err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUserData()
	}, [session?.user?.slug, status])

	if (loading) {
		return <div className="h-screen p-4">Loading Preview...</div>
	}

	return (
		<div className="my-4 rounded-lg border border-muted bg-muted p-4">
			{user && (
				<div className="mb-4 flex flex-col items-center text-center">
					{user.image && (
						<Image src={user.image} alt={`${user.name}'s picture`} width={40} height={40} className="avatar mx-auto" />
					)}
					<h2 className="text-xl font-semibold">{user.name}</h2>
					{user.description && <p className="mt-2 text-accent">{user.description}</p>}
				</div>
			)}

			{links.length > 0 ? (
				<ul className="space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} {...link} />
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links</p>
			)}
		</div>
	)
}
