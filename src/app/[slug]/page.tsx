"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import LinkItem from "@/src/components/LinkItem"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"

export default function UserPage() {
	const { status } = useSession()
	const { user, links, slug, setSlug } = useGlobalContext()

	useEffect(() => {
		if (slug) {
			setSlug(slug)
		}
	}, [slug, setSlug])

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
