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
		<div className="flex flex-row items-center justify-start">
			<form onSubmit={handleSubmit} className="link-form">
				<span className="py-2">ness-live.vercel.app/</span>
				<input type="text" onChange={(e) => setSlug(e.target.value)} value={slug} className="bg-transparent py-2" />
				<button type="submit" className="button bg-accent text-accent-foreground">
					Update URL
				</button>
			</form>

			<div className="px-4 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
