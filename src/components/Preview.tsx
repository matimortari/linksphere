"use client"

import Image from "next/image"
import { useGlobalContext } from "./context/GlobalContext"
import LinkItem from "./LinkItem"
import SocialButton from "./SocialButton"

export default function Preview() {
	const { description, links, image, buttons, slug, settings } = useGlobalContext()

	return (
		<div
			className="content-container mx-auto my-2 max-w-[400px] overflow-hidden"
			style={{ backgroundColor: settings.backgroundColor }}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
				{image && <Image src={image} alt={slug} width={100} height={100} className="avatar icon" />}
				<h1
					className="text-center"
					style={{
						color: settings.slugTextColor,
						fontWeight: settings.slugTextWeight,
						fontSize: settings.slugTextSize,
					}}
				>
					@{slug}
				</h1>

				{description && (
					<p className="text-center" style={{ color: settings.headerTextColor }}>
						{description}
					</p>
				)}

				{buttons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
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
					<p className="text-center text-muted-foreground">No links available</p>
				)}
			</div>
		</div>
	)
}
