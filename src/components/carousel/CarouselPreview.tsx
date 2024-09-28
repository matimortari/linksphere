import Image from "next/image"
import { presets } from "../../lib/presets"
import CarouselLinkItem from "./CarouselLinkItem"
import CarouselSocialButton from "./CarouselSocialButton"

export default function CarouselPreview({ presetId = 0 }) {
	const preset = presets[presetId]
	const { description, links, image, buttons, slug, settings } = preset

	return (
		<div
			className="content-container mx-auto w-72 md:w-80"
			style={{
				backgroundColor: settings.backgroundColor,
			}}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
				<Image src={image} alt={slug} width={100} height={100} className="icon rounded-full" />
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

				<p style={{ color: settings.headerTextColor, textAlign: "center" }}>{description}</p>

				<ul className="my-2 flex flex-row justify-center gap-2">
					{buttons.map((button) => (
						<CarouselSocialButton key={button.id} icon={button.icon} settings={settings} />
					))}
				</ul>

				<hr />

				<ul className="max-h-[550px] space-y-4 overflow-auto">
					{links.map((link) => (
						<CarouselLinkItem key={link.id} title={link.title} settings={settings} />
					))}
				</ul>
			</div>
		</div>
	)
}
