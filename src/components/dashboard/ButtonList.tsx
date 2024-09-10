"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { useState } from "react"
import AddButtonDialog from "./AddButtonDialog"

export default function ButtonList({ onDeleteButton }) {
	const { buttons: contextButtons, deleteButton } = useGlobalContext()
	const [isAddButtonDialogOpen, setIsAddButtonDialogOpen] = useState(false)
	const [isDeleteMode, setIsDeleteMode] = useState(false)

	const handleDeleteButton = async (id) => {
		try {
			await deleteButton(id)
			if (onDeleteButton) {
				onDeleteButton(id)
			}
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
						<li
							key={button.id}
							className={`relative flex items-center justify-center ${isDeleteMode ? "darkened-background" : ""}`}
						>
							<button className="button relative flex items-center justify-center">
								<a href={button.url}>{button.icon && <Icon icon={button.icon} className="icon h-8 w-8" />}</a>
								{isDeleteMode && (
									<button
										className="icon absolute flex items-center justify-center rounded-full bg-destructive p-2 text-background"
										onClick={() => handleDeleteButton(button.id)}
									>
										<Icon icon="material-symbols:delete-forever-outline" className="icon h-5 w-5" />
									</button>
								)}
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No social buttons yet</p>
			)}

			{isAddButtonDialogOpen && <AddButtonDialog onClose={() => setIsAddButtonDialogOpen(false)} />}

			<div className="button-container">
				<button onClick={() => setIsAddButtonDialogOpen(true)} className="button bg-primary text-primary-foreground">
					Add Social Button
				</button>
				<button onClick={handleToggleDeleteMode} className="button bg-destructive text-destructive-foreground">
					{isDeleteMode ? "Cancel Deletion" : "Delete Social Buttons"}
				</button>
			</div>
		</div>
	)
}
