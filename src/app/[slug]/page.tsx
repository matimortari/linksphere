"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import LinkItem from "@/src/components/LinkItem"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"

export default function UserPage() {
	const { status } = useSession()
	const { description, links, setSlug, image, slug, settings } = useGlobalContext()
	const defaultSettings = {
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
		shadowColor: "#000000",
		linkBorderRadius: "8px",
		linkPadding: "8px",
		headerTextColor: "#000000",
		backgroundColor: "#ffffff",
	}

	useEffect(() => {
		if (slug) {
			setSlug(slug)
		}
	}, [slug, setSlug])

	if (status === "loading") {
		return <div>Loading...</div>
	}

	return (
		<div
			className="main-container"
			style={{ backgroundColor: settings.backgroundColor || defaultSettings.backgroundColor }}
		>
			<div className="mb-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="rounded-full" />}
				<h1 className="text-2xl font-bold">@{slug}</h1>
				{description && (
					<p className="mt-2" style={{ color: settings.headerTextColor || defaultSettings.headerTextColor }}>
						{description}
					</p>
				)}
			</div>

			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} {...link} settings={settings} />
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}
		</div>
	)
}
