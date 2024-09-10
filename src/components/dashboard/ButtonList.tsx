"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { useState } from "react"
import AddButtonDialog from "./AddButtonDialog"

export default function ButtonList({ onDeleteButton }) {
	const { buttons: contextButtons, addButton, deleteButton } = useGlobalContext()
	const [isAddButtonDialogOpen, setIsAddButtonDialogOpen] = useState(false)

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

	return (
		<div className="w-full space-y-2">
			{contextButtons && contextButtons.length > 0 ? (
				<ul className="flex flex-wrap gap-2">
					{contextButtons.map((button) => (
						<li key={button.id} className="relative flex items-center">
							<a
								href={button.url}
								className="flex items-center space-x-2 rounded-lg bg-gray-200 p-2 shadow-md hover:bg-gray-300"
							>
								{button.icon && <Icon icon={button.icon} className="h-5 w-5" />}
								<span>{button.title}</span>
							</a>
							<button
								className="absolute right-0 top-0 p-1 text-red-500 hover:text-red-700"
								onClick={() => handleDeleteButton(button.id)}
							>
								<Icon icon="material-symbols:delete-forever-outline" className="h-5 w-5" />
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No buttons available</p>
			)}

			{isAddButtonDialogOpen && <AddButtonDialog onClose={() => setIsAddButtonDialogOpen(false)} />}

			<div className="button-container">
				<button onClick={() => setIsAddButtonDialogOpen(true)} className="button bg-primary text-primary-foreground">
					Add Social Button
				</button>
			</div>
		</div>
	)
}
