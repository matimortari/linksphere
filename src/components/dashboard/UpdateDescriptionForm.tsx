"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { FormEvent, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateDescriptionForm() {
	const { description, setDescription } = useGlobalContext()
	const [localDescription, updateLocalDescription] = useState(description)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const handleSubmit = (e: FormEvent) => {
		handleFormSubmit(
			e,
			"/api/user",
			{ newDescription: localDescription },
			setSuccess,
			setError,
			() => setDescription(localDescription) // Update global context after successful submission
		)
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form-container w-[542px]">
				<input
					type="text"
					onChange={(e) => updateLocalDescription(e.target.value)}
					value={localDescription}
					className="input flex-1 bg-transparent"
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

			<div className="px-4 pt-2 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
