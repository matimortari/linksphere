"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function SocialButtonList() {
	const { buttons: contextButtons, setSocialButtons, deleteButton } = useGlobalContext()
	const [isAddButtonDialogOpen, setIsAddButtonDialogOpen] = useState(false)
	const [isDeleteMode, setIsDeleteMode] = useState(false)

	// Handle deleting a social button
	const handleDeleteButton = async (id) => {
		try {
			await deleteButton(id)
			setSocialButtons((prevButtons) => prevButtons.filter((button) => button.id !== id))
		} catch (error) {
			console.error("Error deleting button:", error)
		}
	}

	const handleToggleDeleteMode = () => {
		setIsDeleteMode((prevMode) => !prevMode)
	}

	return (
		<div className="w-full space-y-2">
			{contextButtons && contextButtons.length > 0 ? (
				<ul className="flex flex-wrap gap-2">
					{contextButtons.map((button) => (
						<button
							key={button.id}
							className={`button flex items-center justify-center ${isDeleteMode ? "bg-muted" : ""}`}
						>
							<a href={button.url}>{button.icon && <Icon icon={button.icon} className="icon h-8 w-8" />}</a>
							{isDeleteMode && (
								<button
									className="icon absolute flex items-center justify-center rounded-full bg-destructive p-2 text-destructive-foreground"
									onClick={() => handleDeleteButton(button.id)}
								>
									<Icon icon="material-symbols:delete-forever-outline" className="icon h-5 w-5" />
								</button>
							)}
						</button>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No social buttons yet.</p>
			)}

			{isAddButtonDialogOpen && <AddButtonDialog onClose={() => setIsAddButtonDialogOpen(false)} />}

			<div className="button-container">
				<button onClick={() => setIsAddButtonDialogOpen(true)} className="button bg-primary text-primary-foreground">
					Add Button
				</button>
				<button onClick={handleToggleDeleteMode} className="button bg-destructive text-destructive-foreground">
					{isDeleteMode ? "Cancel Deletion" : "Delete Buttons"}
				</button>
			</div>
		</div>
	)
}
