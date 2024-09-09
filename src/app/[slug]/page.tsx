import LinkItem from "@/src/components/LinkItem"
import { db } from "@/src/lib/db"
import Image from "next/image"

export default async function UserPage({ params }: { params: { slug: string } }) {
	const { slug } = params

	// Fetch user data based on the slug using Prisma
	const user = await db.user.findUnique({
		where: { slug },
		include: {
			links: true,
			settings: true,
		},
	})

	// If no user is found, render a simple message
	if (!user) {
		return <div>User not found</div>
	}

	const { description, links, image, settings } = user

	return (
		<div className="main-container" style={{ backgroundColor: settings.backgroundColor }}>
			<div className="mb-2 flex flex-col items-center justify-center gap-3">
				{image && <Image src={image} alt={slug} width={100} height={100} className="rounded-full" />}
				<h1 className="text-2xl font-bold">@{slug}</h1>
				{description && (
					<p className="mt-2" style={{ color: settings.headerTextColor }}>
						{description}
					</p>
				)}
			</div>

			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-4">
					{links.map((link) => (
						<LinkItem key={link.id} url={link.url} title={link.title} settings={settings} />
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}
		</div>
	)
}
