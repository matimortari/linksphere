"use client"

import { fetchLinks, fetchUser } from "@/src/lib/actions"
import { User, UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import AddLinkDialog from "./AddLinkDialog"

export default function LinkList() {
	const { data: session, status } = useSession()
	const [user, setUser] = useState<User | null>(null)
	const [links, setLinks] = useState<UserLink[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

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
		return <div className="flex h-screen items-center justify-center p-4">Loading Link...</div>
	}

	return (
		<div className="w-[542px] space-y-2">
			{links.map((link) => (
				<li key={link.id} className="content-container flex items-center overflow-hidden">
					<a href={link.url} className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
						{link.title}
					</a>
				</li>
			))}

			<div className="button-container">
				<button className="button bg-accent text-accent-foreground" onClick={() => setIsDialogOpen(true)}>
					Add Link
				</button>
				<button className="button bg-accent text-accent-foreground" onClick={() => setIsDialogOpen(true)}>
					Add Social Button
				</button>
				{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}
			</div>
		</div>
	)
}
