"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateHeaderForm() {
	const { description, setDescription } = useGlobalContext()
	const [localDescription, updateLocalDescription] = useState(description || "")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	useEffect(() => {
		updateLocalDescription(description)
	}, [description])

	const handleSubmit = (e: React.FormEvent) => {
		handleFormSubmit(e, "/api/user", { newDescription: localDescription }, setSuccess, setError, () =>
			setDescription(localDescription)
		)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container w-full">
				<input
					type="text"
					value={localDescription}
					onChange={(e) => updateLocalDescription(e.target.value)}
					placeholder="Enter new header description"
					className="input flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground"
				/>

				<div className="button-container">
					<button type="submit" className="button bg-primary text-primary-foreground">
						Update
					</button>
					<button
						type="button"
						className="button bg-destructive text-destructive-foreground"
						onClick={() => setDescription("")}
					>
						Delete
					</button>
				</div>
			</form>

			<>
				{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
				{success && <p className="mt-2 font-bold text-accent">{success}</p>}
			</>
		</>
	)
}
