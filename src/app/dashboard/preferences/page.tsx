"use client"

import AnalyticsForm from "@/src/components/dashboard/AnalyticsForm"
import FeedbackForm from "@/src/components/dashboard/FeedbackForm"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Preferences() {
	const { data: session, status } = useSession()
	const [selectedOption, setSelectedOption] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	if (!session?.user) {
		return null
	}

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value)
	}

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")

		if (!confirmed) {
			return
		}

		try {
			const response = await fetch("/api/user", {
				method: "DELETE",
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || "Failed to delete the account")
			}

			alert("Your account has been successfully deleted.")
		} catch (error) {
			console.error("Error deleting account:", error)
			alert(`Error deleting account: ${error.message}`)
		}
	}

	return (
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<Sidebar />

				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Settings</h1>
						<span className="text-muted-foreground">Update your account preferences.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<p className="subtitle">Support Banner</p>
						<select value={selectedOption} onChange={handleOptionChange} className="rounded border p-2">
							<option value="">Select an option</option>
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</select>
						<hr />

						<p className="subtitle">Analytics Integrations</p>
						<AnalyticsForm />
						<hr />

						<p className="subtitle">Submit Feedback</p>
						<FeedbackForm />
						<hr />

						<p className="subtitle">Delete Account</p>
						<div className="button-container mt-2">
							<button
								className="button bg-destructive text-destructive-foreground"
								onClick={handleDeleteAccount}
								disabled={isDeleting}
							>
								{isDeleting ? "Deleting..." : "Delete Account"}
							</button>
						</div>
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
