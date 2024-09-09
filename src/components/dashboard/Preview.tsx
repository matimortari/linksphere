"use client"

import Image from "next/image"
import { useEffect } from "react"
import LinkItem from "../LinkItem"
import { useGlobalContext } from "../context/GlobalContext"

export default function Preview() {
	const { description, links, setSlug, image, slug, settings } = useGlobalContext()

	useEffect(() => {
		if (slug) {
			setSlug(slug)
		}
	}, [slug, setSlug])

	return (
		<div className="rounded-lg border border-muted p-12" style={{ backgroundColor: settings.backgroundColor }}>
			<div className="my-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="avatar" />}
				<h1
					style={{
						color: settings.slugTextColor,
						fontWeight: settings.slugTextWeight,
						fontSize: settings.slugTextSize,
					}}
				>
					@{slug}
				</h1>
				{description && (
					<p className="my-2" style={{ color: settings.headerTextColor }}>
						{description}
					</p>
				)}
				{links.length > 0 ? (
					<ul className="space-y-4">
						{links.map((link) => (
							<LinkItem key={link.id} url={link.url} title={link.title} settings={settings} />
						))}
					</ul>
				) : (
					<p className="text-muted-foreground">No links available</p>
				)}
			</div>
		</div>
	)
}
