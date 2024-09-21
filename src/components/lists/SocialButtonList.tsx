"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import AddButtonDialog from "@/src/components/dialogs/AddButtonDialog"
import { Icon } from "@iconify/react"
import { useState } from "react"

export default function SocialButtonList() {
	const { buttons: contextButtons, deleteButton } = useGlobalContext()
	const [isAddButtonDialogOpen, setIsAddButtonDialogOpen] = useState(false)
	const [isDeleteMode, setIsDeleteMode] = useState(false)

	const handleToggleDeleteMode = () => {
		setIsDeleteMode((prevMode) => !prevMode)
	}

	return (
		<div className="w-full space-y-2">
			{contextButtons && contextButtons.length > 0 ? (
				<ul className="flex flex-wrap gap-2">
					{contextButtons.map((button) => (
						<li key={button.id} className="relative">
							<a
								href={button.url}
								className={`button flex items-center justify-center ${isDeleteMode ? "bg-muted" : ""}`}
							>
								{button.icon && <Icon icon={button.icon} className="icon h-8 w-8" />}
							</a>
							{isDeleteMode && (
								<button
									className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-destructive p-1 text-destructive-foreground"
									onClick={() => deleteButton(button.id)}
								>
									<Icon icon="material-symbols:delete-forever-outline" className="icon h-5 w-5" />
								</button>
							)}
						</li>
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
