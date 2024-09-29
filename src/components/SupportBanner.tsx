import { bannerDescriptions, bannerIcons, bannerLinks, bannerMessages, bannerStyles } from "@/src/data/bannerSettings"
import { Icon } from "@iconify/react"

export default function SupportBanner({ bannerType }) {
	const message = bannerMessages[bannerType]
	const description = bannerDescriptions[bannerType]
	const styleClass = bannerStyles[bannerType]

	const getBannerLink = (type) => {
		const linkObject = bannerLinks[type]
		return linkObject
	}

	const actionLink = getBannerLink(bannerType)

	return (
		<div className={`support-banner ${styleClass} w-full max-w-sm`}>
			<div className="flex flex-col">
				<div className="flex flex-row items-center gap-2">
					<Icon icon={bannerIcons[bannerType]} className="icon h-8 w-8 text-card" />
					<h1 className="text-md font-bold">{message}</h1>
				</div>
				<p className="items-center justify-center break-words p-2 text-xs">{description}</p>
			</div>

			<div className="button-container flex items-center justify-end">
				<a href={actionLink} className="button bg-card text-card-foreground" target="_blank" rel="noopener noreferrer">
					ACT NOW
				</a>
			</div>
		</div>
	)
}
