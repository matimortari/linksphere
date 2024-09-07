"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { UserLink } from "@prisma/client"
import { useState } from "react"
import UpdateLinkDialog from "./UpdateLinkDialog"

export default function LinkList({ onUpdateLink, onDeleteLink }) {
	const { links: contextLinks, deleteLink, updateLink } = useGlobalContext()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState(null)

	const handleEditClick = (link: UserLink) => {
		setCurrentLink(link)
		setIsDialogOpen(true)
	}

	const handleUpdateLink = async (updatedLink: UserLink) => {
		try {
			await updateLink(updatedLink)
			onUpdateLink(updatedLink)
			setIsDialogOpen(false)
		} catch (error) {
			console.error("Error updating link:", error)
		}
	}

	const handleDeleteLink = async (id: number) => {
		try {
			await deleteLink(id)
			onDeleteLink(id)
		} catch (error) {
			console.error("Error deleting link:", error)
		}
	}

	return (
		<div className="w-[542px] space-y-2">
			{contextLinks.length > 0 ? (
				<ul className="list-inside list-disc space-y-2">
					{contextLinks.map((link) => (
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

								<button className="text-destructive" onClick={() => handleDeleteLink(link.id)}>
									<Icon icon="material-symbols:delete-forever-outline" className="h-5 w-5" />
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}

			{isDialogOpen && currentLink && (
				<UpdateLinkDialog
					onClose={() => setIsDialogOpen(false)}
					onUpdateLink={handleUpdateLink}
					linkData={currentLink}
				/>
			)}
		</div>
	)
}
