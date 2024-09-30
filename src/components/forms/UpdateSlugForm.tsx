"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { handleFormSubmit } from "@/src/lib/actions"
import { generateSlug } from "@/src/lib/utils"
import { useState } from "react"

export default function UpdateSlugForm() {
	const { slug, setSlug } = useGlobalContext()
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		handleFormSubmit(e, "/api/user", { newSlug: slug }, setSuccess, setError)
	}

	const handleGenerateSlug = () => {
		const newSlug = generateSlug(slug)
		setSlug(newSlug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container w-full">
				<span className="hidden text-muted-foreground md:block">linksphere-live.vercel.app/</span>
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
					<button type="button" onClick={handleGenerateSlug} className="button bg-accent text-accent-foreground">
						Random URL
					</button>
				</div>
			</form>

			<>
				{success && <p className="mt-2 font-bold text-primary">{success}</p>}
				{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
			</>
		</>
	)
}
