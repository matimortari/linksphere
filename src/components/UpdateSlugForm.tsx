import { useState } from "react"

export default function UpdateSlugForm({ currentSlug }) {
	const [slug, setSlug] = useState(currentSlug)
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
				body: JSON.stringify({ newSlug: slug }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Failed to update slug")
			}

			setSuccess("Slug updated successfully!")
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="m-4 ml-6 inline-flex items-center justify-center rounded-lg border border-muted pl-2 shadow-lg"
		>
			<label htmlFor="slug">Your URL:</label>
			<span className="py-2">ness-live.vercel.app/</span>
			<input
				type="text"
				id="slug"
				value={slug}
				onChange={(e) => setSlug(e.target.value)}
				required
				className="bg-transparent py-2"
			/>
			<button type="submit" className="button">
				Update URL
			</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}
		</form>
	)
}
