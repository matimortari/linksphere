"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { generateSlug } from "@/src/lib/utils"
import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateSlugForm() {
	const { slug, setSlug } = useGlobalContext()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		handleFormSubmit(e, "/api/user", { newSlug: slug }, setSuccess, setError)
	}

	const handleGenerateSlugFromUsername = () => {
		const newSlug = generateSlug(slug)
		setSlug(newSlug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container w-full">
				<span className="text-muted-foreground">ness-live.vercel.app/</span>
				<input
					type="text"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					className="input flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
				/>

				<div className="button-container">
					<button type="submit" className="button bg-primary text-primary-foreground">
						Update
					</button>
					<button
						type="button"
						onClick={handleGenerateSlugFromUsername}
						className="button bg-accent text-accent-foreground"
					>
						Random URL{" "}
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
