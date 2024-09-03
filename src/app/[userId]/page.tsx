"use client"

import LinkItem from "@/src/components/LinkItem"
import { fetchLinks } from "@/src/lib/actions"
import { UserLink } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { userId: string } }) {
	const [links, setLinks] = useState<UserLink[]>([])
	const { data: session, status } = useSession()
	const { userId } = params

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
		<div className="h-screen p-4">
			<header className="mb-6 flex items-center justify-end">
				{session ? (
					<div className="flex flex-row items-center gap-2">
						<button onClick={() => signOut()} className="button">
							Sign Out
						</button>
						{session.user.image && (
							<a href="dashboard">
								<Image
									src={session.user.image}
									alt={session.user.name || ""}
									width={40}
									height={40}
									className="avatar icon"
								/>
							</a>
						)}
					</div>
				) : (
					<Link href="/login" className="button">
						Sign In
					</Link>
				)}
			</header>

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
