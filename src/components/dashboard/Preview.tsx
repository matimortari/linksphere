"use client"

import { defaultSettings } from "@/src/lib/utils"
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
		<div
			className="rounded-3xl border border-muted p-12 shadow-lg"
			style={{ backgroundColor: settings.backgroundColor || defaultSettings.backgroundColor }}
		>
			<div className="mb-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="rounded-full" />}
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
