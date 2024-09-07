import Image from "next/image"
import { useEffect } from "react"
import LinkItem from "../LinkItem"
import { useGlobalContext } from "../context/GlobalContext"

export default function Preview() {
	const { description, links, setSlug, image, slug } = useGlobalContext()

	useEffect(() => {
		if (slug) {
			setSlug(slug)
		}
	}, [slug, setSlug])

	return (
		<div className="rounded-3xl border border-muted bg-white p-12 shadow-lg">
			<div className="mb-8 flex flex-col items-center text-center">
				{image && (
					<Image src={image} alt={`Profile picture of ${slug}`} width={100} height={100} className="rounded-full" />
				)}
				<h1 className="text-2xl font-bold">@{slug}</h1>
				{description && <p className="mt-2 text-muted-foreground">{description}</p>}
			</div>

			<div className="space-y-4">
				{links.length > 0 ? (
					<ul className="list-inside list-disc space-y-2">
						{links.map((link) => (
							<LinkItem key={link.id} {...link} />
						))}
					</ul>
				) : (
					<p className="text-muted-foreground">No links available</p>
				)}
			</div>
		</div>
	)
}
