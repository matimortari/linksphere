"use client"

import { Icon } from "@iconify/react"
import { UserLink } from "@prisma/client"
import { useState } from "react"
import UpdateLinkDialog from "./UpdateLinkDialog"

interface LinkListProps {
	links: UserLink[]
	onUpdateLink: (updatedLink: UserLink) => void // Expect the onUpdateLink callback
}

export default function LinkList({ links: initialLinks, onUpdateLink }: LinkListProps) {
	const [links, setLinks] = useState<UserLink[]>(initialLinks)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [selectedLink, setSelectedLink] = useState<UserLink | null>(null)

	const handleEditClick = (link: UserLink) => {
		setSelectedLink(link)
		setIsDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
		setSelectedLink(null)
	}

	const handleUpdateLink = (updatedLink: UserLink) => {
		setLinks((prevLinks) => prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
		onUpdateLink(updatedLink) // Notify the global context about the update
	}

	return (
		<div className="w-[542px] space-y-2">
			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-2">
					{links.map((link) => (
						<li key={link.id} className="content-container flex items-center overflow-hidden">
							<div className="flex flex-1 flex-col">
								<section className="flex items-center gap-2">
									<p className="font-semibold">{link.title}</p>
								</section>

								<section className="mt-1 flex items-center gap-2">
									<a
										href={link.url}
										className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground"
										style={{ maxWidth: "400px" }}
									>
										{link.url}
									</a>
								</section>
							</div>

							<div className="mt-12 flex flex-row items-center gap-2">
								<button className="text-muted-foreground" onClick={() => handleEditClick(link)}>
									<Icon icon="material-symbols:ink-pen-outline" className="h-5 w-5" />
								</button>

								<button className="text-destructive">
									<Icon icon="material-symbols:delete-forever-outline" className="h-5 w-5" />
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}

			{isDialogOpen && selectedLink && (
				<UpdateLinkDialog onClose={handleCloseDialog} onUpdateLink={handleUpdateLink} linkData={selectedLink} />
			)}
		</div>
	)
}
