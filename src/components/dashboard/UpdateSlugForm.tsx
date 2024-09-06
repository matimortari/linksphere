import { useState } from "react"

export default function UpdateSlugForm({ currentSlug, setSlug }) {
	const [slug, updateSlug] = useState(currentSlug)
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
				throw new Error(data.error || "Failed to update slug.")
			}

			setSuccess("Slug updated successfully!")
			setSlug(slug)
		} catch (error) {
			setError((error as Error).message)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form-container w-[542px]">
				<span className="text-muted-foreground">ness-live.vercel.app/</span>
				<input
					type="text"
					onChange={(e) => updateSlug(e.target.value)}
					value={slug}
					className="input flex-1 bg-transparent"
				/>
				<button type="submit" className="button ml-4 rounded bg-primary px-4 py-2 text-primary-foreground">
					Update URL
				</button>
			</form>

			<div className="px-4 pt-2 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
