import Image from "next/image"
import { presets } from "../../lib/presets"
import CarouselLinkItem from "./CarouselLinkItem"
import CarouselSocialButton from "./CarouselSocialButton"

export default function CarouselPreview({ presetId = 0 }) {
	const preset = presets[presetId]
	const { description, links, image, buttons, slug, settings } = preset

	return (
		<div
			className="content-container mx-auto my-2"
			style={{ backgroundColor: settings.backgroundColor, maxWidth: "400px", overflow: "hidden" }}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-5">
				{image && <Image src={image} alt={slug} width={100} height={100} className="avatar icon" />}
				<h1
					style={{
						color: settings.slugTextColor,
						fontWeight: settings.slugTextWeight,
						fontSize: settings.slugTextSize,
					}}
				>
					@{slug}
				</h1>

				{description && <p style={{ color: settings.headerTextColor, textAlign: "center" }}>{description}</p>}

				{buttons.length > 0 ? (
					<ul className="my-2 flex flex-row gap-2">
						{buttons.map((button) => (
							<CarouselSocialButton key={button.id} icon={button.icon} settings={settings} />
						))}
					</ul>
				) : (
					<hr />
				)}
				{links.length > 0 ? (
					<ul className="space-y-4">
						{links.map((link) => (
							<CarouselLinkItem key={link.id} title={link.title} settings={settings} />
						))}
					</ul>
				) : (
					<p className="text-muted-foreground">No links available</p>
				)}
			</div>
		</div>
	)
}
