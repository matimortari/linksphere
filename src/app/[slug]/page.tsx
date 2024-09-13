import LinkItem from "@/src/components/LinkItem"
import SocialButton from "@/src/components/SocialButton"
import SupportBanner from "@/src/components/SupportBanner"
import { trackPageVisit } from "@/src/lib/actions"
import { db } from "@/src/lib/db"
import Image from "next/image"

export default async function UserPage({ params }: { params: { slug: string } }) {
	const { slug } = params

	const user = await db.user.findUnique({
		where: { slug },
		include: {
			links: true,
			buttons: true,
			settings: true,
		},
	})

	await trackPageVisit(slug)

	if (!user) {
		return (
			<div className="main-container">
				<div className="mb-2 flex flex-col items-center justify-center gap-3">
					<p className="text-muted-foreground">User `{slug}` not found.</p>
				</div>
			</div>
		)
	}

	const { description, links, image, buttons, settings } = user

	return (
		<div className="min-h-screen p-12" style={{ backgroundColor: settings.backgroundColor }}>
			<div className="flex flex-col items-center justify-center gap-3">
				{settings.supportBanner !== "NONE" && <SupportBanner bannerType={settings.supportBanner} />}

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
	)
}
