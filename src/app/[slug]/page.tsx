"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import LinkItem from "@/src/components/LinkItem"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"

export default function UserPage() {
	const { status } = useSession()
	const { description, user, links, setSlug, image, slug } = useGlobalContext()

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
			<div className="mb-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="rounded-full" />}
				<h1 className="text-2xl font-bold">@{slug}</h1>
				{description && <p className="mt-2 text-muted-foreground">{description}</p>}
			</div>

			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} {...link} />
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}
		</div>
	)
}
