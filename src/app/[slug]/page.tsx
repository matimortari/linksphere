import LinkItem from "@/src/components/LinkItem"
import { db } from "@/src/lib/db"
import { defaultSettings } from "@/src/lib/utils"
import { UserLink } from "@prisma/client"
import Image from "next/image"

type UserWithSettings = {
	id: string
	slug: string
	name: string
	email: string
	emailVerified: Date | null
	image: string
	description: string | null
	public: boolean
	links: UserLink[]
	settings?: typeof defaultSettings
}

export default async function UserPage({ params }: { params: { slug: string } }) {
	const { slug } = params

	const user = (await db.user.findUnique({
		where: { slug },
		include: {
			links: true,
			settings: true,
		},
	})) as UserWithSettings | null

	if (!user) {
		return <div>User not found</div>
	}

	const { description, links, image, settings } = user

	// Fallback to default settings if userSettings is not available
	const effectiveSettings = settings || defaultSettings

	return (
		<div
			className="main-container"
			style={{ backgroundColor: effectiveSettings.backgroundColor || defaultSettings.backgroundColor }}
		>
			<div className="mb-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="rounded-full" />}
				<h1 className="text-2xl font-bold">@{slug}</h1>
				{description && (
					<p className="mt-2" style={{ color: effectiveSettings.headerTextColor || defaultSettings.headerTextColor }}>
						{description}
					</p>
				)}
			</div>

			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} url={link.url} title={link.title} />
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}
		</div>
	)
}
