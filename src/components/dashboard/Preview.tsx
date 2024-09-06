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
		<div className="my-4 flex w-[60vw] flex-col items-center rounded-lg border border-muted bg-muted p-12 shadow-xl">
			{user && (
				<div className="mb-2 flex flex-col justify-center gap-3 pt-8 text-center">
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
