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
		<div className="main-container">
			{user && (
				<div className="mb-2 flex flex-col justify-center gap-3 text-center">
					{user.image && (
						<Image src={user.image} alt={`${user.slug}`} width={100} height={100} className="avatar mx-auto" />
					)}
					<h1 className="text-2xl font-bold">@{user.slug}</h1>
					{user.description && <p className="text-muted-foreground">{user.description}</p>}
				</div>
			)}

			<ul className="mt-2 space-y-4">
				{links.map((link) => (
					<LinkItem key={link.id} {...link} />
				))}
			</ul>
		</div>
	)
}
