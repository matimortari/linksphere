"use client"

import { updateUserBanner } from "@/src/lib/actions"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function SupportBannerForm() {
	const { settings } = useGlobalContext()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [selectedOption, setSelectedOption] = useState("NONE")

	useEffect(() => {
		if (settings && settings.supportBanner) {
			setSelectedOption(settings.supportBanner)
		}
	}, [settings])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			await updateUserBanner(selectedOption)
			setSuccess("Support banner has been updated!")
		} catch (error) {
			console.error("Error saving support banner:", error)
			setError("Failed to update support banner")
		}
	}

	return (
		<>
			<div className="flex flex-col gap-2">
				<select
					value={selectedOption}
					onChange={(event) => setSelectedOption(event.target.value)}
					className="form-container text-sm"
				>
					<option value="NONE" className="bg-card text-muted-foreground">
						None
					</option>
					<option value="LGBTQ_RIGHTS" className="bg-card">
						Pride
					</option>
					<option value="ANTI_RACISM" className="bg-card">
						Anti-Racism
					</option>
					<option value="MENTAL_HEALTH" className="bg-card">
						Mental Health
					</option>
					<option value="CLIMATE_ACTION" className="bg-card">
						Climate Action
					</option>
				</select>

				<div className="button-container">
					<button onClick={handleSubmit} className="button bg-accent text-accent-foreground">
						Update Banner
					</button>
				</div>
			</div>

			<>
				{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
				{success && <p className="mt-2 font-bold text-accent">{success}</p>}
			</>
		</>
	)
}
