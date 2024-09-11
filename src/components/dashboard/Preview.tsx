"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import LinkItem from "../LinkItem"
import SocialButton from "../SocialButton"

export default function Preview() {
	const { description, links, setSlug, image, buttons, slug, settings } = useGlobalContext()

	useEffect(() => {
		if (slug) {
			setSlug(slug)
		}
		console.log(buttons)
	}, [slug, setSlug, buttons])

	return (
		<div className="h-full w-full">
			<div className="rounded-lg border border-muted p-12" style={{ backgroundColor: settings.backgroundColor }}>
				<div className="flex flex-col items-center justify-center gap-3">
					<h1 className="title">Preview</h1>
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

					{description && <p style={{ color: settings.headerTextColor }}>{description}</p>}

					{buttons.length > 0 ? (
						<ul className="my-2 flex flex-row gap-2">
							{buttons.map((button) => (
								<SocialButton
									key={button.id}
									url={button.url}
									icon={button.icon}
									settings={settings}
									buttonId={button.id}
								/>
							))}
						</ul>
					) : (
						<hr />
					)}

					{links.length > 0 ? (
						<ul className="space-y-4">
							{links.map((link) => (
								<LinkItem key={link.id} url={link.url} title={link.title} settings={settings} linkId={link.id} />
							))}
						</ul>
					) : (
						<p className="text-muted-foreground">No links available</p>
					)}
				</div>
			</div>
		</div>
	)
}
