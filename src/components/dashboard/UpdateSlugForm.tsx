"use client"

import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateSlugForm() {
	const { slug, setSlug } = useGlobalContext()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
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
				throw new Error(data.error)
			}

			setSuccess("Slug updated successfully!")
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
					onChange={(e) => setSlug(e.target.value)}
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
