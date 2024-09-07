"use client"

import LinkItem from "@/src/components/LinkItem"
import { fetchUserData, fetchUserLinks, fetchUserSettings } from "@/src/lib/actions"
import { User, UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserPage({ params }: { params: { slug: string } }) {
	const { data: session, status } = useSession()
	const [user, setUser] = useState<User | null>(null)
	const [links, setLinks] = useState<UserLink[]>([])
	const [settings, setSettings] = useState({
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
	})
	const { slug } = params

	const fetchData = async () => {
		if (status === "loading" || !slug) {
			return
		}

		try {
			const [linksFromServer, userFromServer, userSettings] = await Promise.all([
				fetchUserLinks(slug),
				fetchUserData(),
				fetchUserSettings(),
			])
			setLinks(linksFromServer)
			setUser(userFromServer)
			setSettings(userSettings)
		} catch (err) {
			console.error("Failed to fetch data:", err)
		}
	}

	useEffect(() => {
		fetchData()
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
