"use client"

import { useState } from "react"

export default function FeedbackForm() {
	const [feedback, setFeedback] = useState("")
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
				body: JSON.stringify({ feedback }),
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.error || "Failed to submit feedback")
			}

			setFeedback("")
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
			<textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="form-container" required />

			<div className="button-container">
				<button type="submit" disabled={isSubmitting} className="button bg-accent text-accent-foreground">
					{isSubmitting ? "Submitting..." : "Submit Feedback"}
				</button>
			</div>
			{submissionStatus && <p className="mb-4 font-bold">{submissionStatus}</p>}
		</form>
	)
}
