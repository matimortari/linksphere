"use client"

import { FormEvent, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateDescriptionForm() {
	const { description, setDescription } = useGlobalContext()
	const [localDescription, updateLocalDescription] = useState<string>(description)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		setSuccess(null)

		try {
			const response = await fetch(`/api/user`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newDescription: localDescription }),
			})

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || "Failed to update description.")
			}

			setSuccess("Description updated successfully!")
			setDescription(localDescription)
		} catch (error) {
			setError((error as Error).message)
		}
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
				<button type="submit" className="button bg-primary text-primary-foreground">
					Update Description
				</button>
			</form>

			<div className="px-4 pt-2 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
