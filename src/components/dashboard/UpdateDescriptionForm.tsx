import { useState } from "react"

export default function UpdateDescriptionForm({ currentDescription }) {
	const [description, setDescription] = useState(currentDescription)
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
				throw new Error(data.error || "Failed to update header")
			}

			setSuccess("Header updated successfully!")
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="form-container w-[542px]">
			<span className="py-2 text-muted-foreground">Your description Here</span>
			<input
				type="text"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				className="bg-transparent"
			/>
			<button type="submit" className="button bg-accent text-accent-foreground">
				Update Header
			</button>

			<div className="font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</form>
	)
}
