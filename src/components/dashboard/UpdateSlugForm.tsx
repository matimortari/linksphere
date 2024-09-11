"use client"

import { handleFormSubmit } from "@/src/lib/actions"
import { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function UpdateSlugForm() {
	const { slug, setSlug } = useGlobalContext()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		handleFormSubmit(e, "/api/user", { newSlug: slug }, setSuccess, setError)
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="form-container w-full">
				<span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
					ness-live.vercel.app/
				</span>
				<input
					type="text"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					className="input flex-1 overflow-hidden text-ellipsis whitespace-nowrap bg-transparent"
				/>
				<button type="submit" className="button bg-primary text-primary-foreground">
					Update
				</button>
			</form>

			<div className="mt-2 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
