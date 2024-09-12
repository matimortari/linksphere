"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { useState } from "react"
import AddLinkDialog from "./AddLinkDialog"
import UpdateLinkDialog from "./UpdateLinkDialog"

export default function LinkList() {
	const { links: contextLinks, setLinks, deleteLink, updateLink } = useGlobalContext()
	const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState(null)

	// Handle updating a link
	const handleUpdateLink = async (updatedLink) => {
		try {
			await updateLink(updatedLink)
			setLinks((prevLinks) => prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
			setIsUpdateDialogOpen(false)
		} catch (error) {
			console.error("Error updating link:", error)
		}
	}

	// Handle deleting a link
	const handleDeleteLink = async (id) => {
		try {
			await deleteLink(id)
			setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id))
		} catch (error) {
			console.error("Error deleting link:", error)
		}
	}

	const handleEditClick = (link) => {
		setCurrentLink(link)
		setIsUpdateDialogOpen(true)
	}

	return (
		<div className="w-full space-y-2">
			{contextLinks && contextLinks.length > 0 ? (
				<ul className="space-y-2">
					{contextLinks.map((link) => (
						<li key={link.id} className="content-container flex items-center overflow-hidden">
							<div className="flex flex-1 flex-col">
								<section className="flex flex-row items-center gap-2">
									<p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">{link.title}</p>
									<button className="text-muted-foreground" onClick={() => handleEditClick(link)}>
										<Icon icon="material-symbols:ink-pen-outline" className="icon h-5 w-5" />
									</button>
								</section>

								<section className="mt-1 flex items-center gap-2">
									<a
										href={link.url}
										className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground md:max-w-[500px]"
									>
										{link.url}
									</a>
								</section>
							</div>

							<button className="mt-8 text-destructive" onClick={() => handleDeleteLink(link.id)}>
								<Icon icon="material-symbols:delete-forever-outline" className="icon h-5 w-5" />
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links yet</p>
			)}

			{isUpdateDialogOpen && currentLink && (
				<UpdateLinkDialog
					onClose={() => setIsUpdateDialogOpen(false)}
					onUpdateLink={handleUpdateLink}
					linkData={currentLink}
				/>
			)}

			{isAddLinkDialogOpen && <AddLinkDialog onClose={() => setIsAddLinkDialogOpen(false)} />}

			<div className="button-container">
				<button onClick={() => setIsAddLinkDialogOpen(true)} className="button bg-primary text-primary-foreground">
					Add Link
				</button>
			</div>
		</div>
	)
}
