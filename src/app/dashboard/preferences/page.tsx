"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import FeedbackForm from "@/src/components/dashboard/FeedbackForm"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Preferences() {
	const { data: session, status } = useSession()
	const { settings, updateSettings } = useGlobalContext()
	const [selectedOption, setSelectedOption] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	if (status === "unauthenticated") {
		redirect("/login")
	}

	useEffect(() => {
		if (session?.user) {
			if (settings?.supportBanner) {
				setSelectedOption(settings.supportBanner)
			}
		}
	}, [session?.user, settings])

	const handleOptionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newBanner = event.target.value
		setSelectedOption(newBanner)
		setIsSaving(true)
		try {
			await updateSettings({ supportBanner: newBanner })
			alert("Support banner has been updated successfully!")
		} catch (error) {
			console.error("Error saving support banner:", error)
			alert(`Error saving support banner: ${error.message}`)
		} finally {
			setIsSaving(false)
		}
	}

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")

		if (!confirmed) {
			return
		}

		setIsDeleting(true)
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
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<aside className="sidebar-container w-full md:mr-2 md:w-3/12">
					<Sidebar />
				</aside>

				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Settings</h1>
						<span className="title-label">Update your account preferences.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<p className="subtitle">Support Banner</p>
						<select value={selectedOption} onChange={handleOptionChange} className="rounded border p-2">
							<option value="NONE">None</option>
							<option value="LGBTQ_RIGHTS">Pride</option>
							<option value="ANTI_RACISM">Anti-Racism</option>
							<option value="MENTAL_HEALTH">Mental Health</option>
							<option value="CLIMATE_ACTION">Climate Action</option>
						</select>
						<button className="button bg-accent text-accent-foreground" disabled={isSaving}>
							{isSaving ? "Saving..." : "Save Banner"}
						</button>
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
					</div>
				</main>
			</div>
		</div>
	)
}
