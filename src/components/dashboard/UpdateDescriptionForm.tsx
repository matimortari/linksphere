"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { FormEvent, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateDescriptionForm() {
	const { description, setDescription } = useGlobalContext()
	const [localDescription, updateLocalDescription] = useState(description)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	const handleSubmit = (e: FormEvent) => {
		handleFormSubmit(e, "/api/user", { newDescription: localDescription }, setSuccess, setError, () =>
			setDescription(localDescription)
		)
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form-container w-full">
				<input
					type="text"
					onChange={(e) => updateLocalDescription(e.target.value)}
					value={localDescription}
					className="input max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground"
					placeholder="Enter new description"
				/>

				<div className="button-container">
					<button type="submit" className="button bg-primary text-primary-foreground">
						Update
					</button>
					<button type="submit" className="button bg-destructive text-destructive-foreground">
						Delete
					</button>
				</div>
			</form>

			<div className="font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
