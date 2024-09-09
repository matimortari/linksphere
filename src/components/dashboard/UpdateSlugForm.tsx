"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateSlugForm() {
	const { slug, setSlug } = useGlobalContext()
	const [error, setError] = useState<string | null>("")
	const [success, setSuccess] = useState<string | null>("")

	const handleSubmit = (e: React.FormEvent) => {
		handleFormSubmit(e, "/api/user", { newSlug: slug }, setSuccess, setError)
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
