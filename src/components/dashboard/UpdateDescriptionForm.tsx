import { useState } from "react"

export default function UpdateDescriptionForm({ currentDescription, setDescription }) {
	const [description, updateDescription] = useState(currentDescription)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			const response = await fetch(`/api/user`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ newDescription: description }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Failed to update header.")
			}

			setSuccess("Header updated successfully!")
			setDescription(description)
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form-container w-[542px]">
				<input
					type="text"
					onChange={(e) => updateDescription(e.target.value)}
					value={description}
					className="input flex-1 bg-transparent"
				/>
				<button type="submit" className="button bg-primary text-primary-foreground">
					Update Header
				</button>
			</form>

			<div className="px-4 pt-2 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
