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
		<div className="flex flex-row items-center justify-start">
			<form onSubmit={handleSubmit} className="link-form">
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					className="bg-transparent py-2"
				/>
				<button type="submit" className="button bg-accent text-accent-foreground">
					Update Header
				</button>
			</form>

			<div className="px-4 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
