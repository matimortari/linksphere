"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"

export default function FeedbackForm() {
	const { data: session } = useSession()
	const [message, setMessage] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsSubmitting(true)
		setSubmissionStatus(null)

		try {
			const response = await fetch("/api/feedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.error || "Failed to submit feedback")
			}

			setMessage("")
			setSubmissionStatus(responseData.message)
		} catch (error) {
			console.error("Error submitting feedback:", error)
			setSubmissionStatus(`Error: ${error.message}`)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="form-container"
				required
				placeholder="Enter your feedback here"
			/>

			<div className="button-container">
				<button
					type="submit"
					disabled={isSubmitting || !session}
					className={`button bg-accent text-accent-foreground ${isSubmitting ? "opacity-50" : ""}`}
				>
					{isSubmitting ? "Submitting..." : "Submit Feedback"}
				</button>
			</div>

			{submissionStatus && (
				<p className={`mb-4 font-bold ${submissionStatus.startsWith("Error") ? "text-destructive" : "text-accent"}`}>
					{submissionStatus}
				</p>
			)}

			{!session && <p className="text-sm text-destructive">You must be logged in to submit feedback.</p>}
		</form>
	)
}
