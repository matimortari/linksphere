"use client"

import { handleFeedbackSubmit } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function FeedbackForm() {
	const { data: session } = useSession()
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			await handleFeedbackSubmit(message)
			setSuccess("Feedback submitted!")
		} catch (error) {
			console.error("Error submitting feedback:", error)
			setError("Failed to submit feedback")
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="form-container text-sm"
					required
					placeholder="Enter your feedback here..."
				/>

				<div className="button-container">
					<button type="submit" disabled={!session} className="button bg-accent text-accent-foreground">
						Submit Feedback
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
