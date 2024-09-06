"use client"

import { fetchUser } from "@/src/lib/actions"
import { User, UserLink } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"
import LinkItem from "../LinkItem"

interface PreviewProps {
	slug: string
	description: string
	links: UserLink[]
}

export default function Preview({ slug, description, links }: PreviewProps) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const fetchUserData = async () => {
		if (!slug) return

		try {
			const userFromServer = await fetchUser(slug)
			setUser(userFromServer)
		} catch (err) {
			console.error("Failed to fetch user data:", err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUserData()
	}, [slug])

	if (loading) {
		return <div className="h-screen p-4">Loading Preview...</div>
	}

	return (
		<div className="rounded-3xl border border-muted p-12 shadow-lg">
			{user && (
				<div className="mb-8 flex flex-col items-center text-center">
					{user.image && (
						<Image
							src={user.image}
							alt={`Profile picture of ${user.slug}`}
							width={100}
							height={100}
							className="rounded-full"
						/>
					)}
					<h1 className="text-2xl font-bold">@{slug}</h1>
					{description && <p className="mt-2 text-muted-foreground">{description}</p>}
				</div>
			)}

			<div className="space-y-4">
				{links.length > 0 ? (
					<ul className="list-inside list-disc space-y-2">
						{links.map((link) => (
							<LinkItem key={link.id} {...link} />
						))}
					</ul>
				) : (
					<p className="text-muted-foreground">No links available</p>
				)}
			</div>
		</div>
	)
}
