"use client"

import { handleFeedbackSubmit } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function FeedbackForm() {
	const { data: session } = useSession()
	const [message, setMessage] = useState("")
	const [rating, setRating] = useState<number | null>(null)
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			await handleFeedbackSubmit(message, rating)
			setSuccess("Feedback submitted!")
			setMessage("")
			setRating(null)
		} catch (error) {
			console.error("Error submitting feedback:", error)
			setError("Failed to submit feedback")
		}
	}

	const renderStars = () => {
		return Array.from({ length: 5 }, (_, index) => {
			const starIndex = index + 1
			return (
				<span
					key={starIndex}
					className={`cursor-pointer text-2xl ${rating >= starIndex ? "text-accent" : "text-muted"}`}
					onClick={() => setRating(starIndex)}
				>
					★
				</span>
			)
		})
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
					placeholder="Enter your feedback here..."
					rows={5}
					className="form-container text-sm"
				/>

				<div className="flex flex-row items-center gap-2">
					<label className="text-base font-semibold">Rating (Optional):</label>
					<div className="flex space-x-1">{renderStars()}</div>
				</div>

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
