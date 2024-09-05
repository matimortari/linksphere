"use client"

import LinkItem from "@/src/components/LinkItem"
import Sidebar from "@/src/components/Sidebar"
import UpdateSlugForm from "@/src/components/UpdateSlugForm"
import { fetchLinks } from "@/src/lib/actions"
import { UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const { data: session } = useSession()
	const [links, setLinks] = useState<UserLink[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchUserLinks = async () => {
			if (session?.user.slug) {
				try {
					const linksFromServer = await fetchLinks(session.user.slug)
					setLinks(linksFromServer)
				} catch (err) {
					console.error("Failed to fetch links:", err)
				}
				setLoading(false)
			}
		}

		fetchUserLinks()
	}, [session?.user.slug])

	if (loading) {
		return <div className="h-screen p-4">Loading...</div>
	}

	return (
		<div className="h-screen p-4 pt-16">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-4">
					<div className="flex flex-col pb-8">
						<h1 className="text-2xl font-semibold">Dashboard</h1>
						<p className="text-muted">Welcome back, {session?.user.name}!</p>
					</div>

					<section className="flex flex-col">
						<p className="mb-2 text-xl font-semibold">My URL</p>
						<UpdateSlugForm currentSlug={session?.user.slug} />
					</section>

					<section className="flex flex-col">
						<h2 className="mb-2 text-xl font-semibold">My Links</h2>
						<div className="rounded-lg border border-muted p-4">
							{links.length > 0 ? (
								<ul className="m-4 space-y-4">
									{links.map((link) => (
										<LinkItem key={link.id} {...link} />
									))}
								</ul>
							) : (
								<p className="mt-4 text-muted-foreground">No links</p>
							)}
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
