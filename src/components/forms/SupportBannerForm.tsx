"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { updateUserBanner } from "@/src/lib/actions"
import { useEffect, useState } from "react"

export default function SupportBannerForm() {
	const { settings } = useGlobalContext()
	const [selectedOption, setSelectedOption] = useState("NONE")
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

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
			<form className="flex flex-col gap-2">
				<select
					value={selectedOption}
					onChange={(event) => setSelectedOption(event.target.value)}
					className="form-container text-sm font-medium"
				>
					<option value="NONE" className="bg-card font-medium text-muted-foreground">
						None
					</option>
					<option value="LGBTQ_RIGHTS" className="bg-card font-medium">
						Pride
					</option>
					<option value="ANTI_RACISM" className="bg-card font-medium">
						Anti-Racism
					</option>
					<option value="MENTAL_HEALTH" className="bg-card font-medium">
						Mental Health
					</option>
					<option value="CLIMATE_ACTION" className="bg-card font-medium">
						Climate Action
					</option>
				</select>

				<div className="button-container">
					<button onClick={handleSubmit} className="button bg-primary text-primary-foreground">
						Update Banner
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
