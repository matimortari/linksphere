"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

export default function LinkList() {
	const { links: contextLinks, deleteLink } = useGlobalContext()
	const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState(null)

	const handleEditClick = (link) => {
		setCurrentLink(link)
		setIsUpdateDialogOpen(true)
	}

	return (
		<div className="w-full space-y-2">
			{contextLinks && contextLinks.length > 0 ? (
				<ul className="space-y-2">
					{contextLinks.map((link) => (
						<li key={link.id} className="flex items-center overflow-hidden rounded-2xl border border-muted p-2">
							<div className="flex flex-1 flex-col">
								<section className="flex max-w-72 flex-row items-center gap-2">
									<p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">{link.title}</p>
									<button onClick={() => handleEditClick(link)}>
										<Icon icon="material-symbols:edit-square-outline" className="icon h-6 w-6" />
									</button>
								</section>

								<section className="flex items-center gap-2">
									<a href={link.url} className="overflow-hidden text-ellipsis whitespace-nowrap">
										{link.url}
									</a>
								</section>
							</div>

							<button className="mt-8 text-destructive" onClick={() => deleteLink(link.id)}>
								<Icon icon="material-symbols:delete-forever-outline" className="icon h-6 w-6" />
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links yet.</p>
			)}

			{isUpdateDialogOpen && currentLink && (
				<UpdateLinkDialog onClose={() => setIsUpdateDialogOpen(false)} linkData={currentLink} />
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
