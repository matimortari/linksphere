"use client"

import LinkItem from "@/src/components/LinkItem"
import { fetchLinks, fetchUser } from "@/src/lib/actions"
import { User, UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { slug: string } }) {
	const { data: session, status } = useSession()
	const [user, setUser] = useState<User | null>(null)
	const [links, setLinks] = useState<UserLink[]>([])
	const { slug } = params

	const fetchUserData = async () => {
		if (status === "loading" || !slug) {
			return
		}

		try {
			const [linksFromServer, userFromServer] = await Promise.all([fetchLinks(slug), fetchUser(slug)])
			setLinks(linksFromServer)
			setUser(userFromServer)
		} catch (err) {
			console.error("Failed to fetch data:", err)
		}
	}

	useEffect(() => {
		fetchUserData()
	}, [slug, status])

	if (status === "loading") {
		return <div>Loading...</div>
	}

	return (
		<div className="flex h-screen flex-col items-center rounded-lg bg-muted py-8">
			{user && (
				<div className="mb-8 flex flex-col justify-center gap-2 text-center">
					{user.image && (
						<Image src={user.image} alt={`${user.name}'s picture`} width={40} height={40} className="avatar mx-auto" />
					)}

					<h1 className="text-2xl font-bold">{user.name}</h1>
					{user.description && <p className="text-accent">{user.description}</p>}
				</div>
			)}

			<ul className="space-y-4">
				{links.map((link) => (
					<LinkItem key={link.id} {...link} />
				))}
			</ul>
		</div>
	)
}
