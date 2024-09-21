"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import FeedbackForm from "@/src/components/forms/FeedbackForm"
import Sidebar from "@/src/components/Sidebar"
import { deleteUserAccount, updateUserBanner } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Preferences() {
	const { data: session, status } = useSession()
	const { settings } = useGlobalContext()
	const [selectedOption, setSelectedOption] = useState("NONE")
	const [isSaving, setIsSaving] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	useEffect(() => {
		if (settings && settings.supportBanner) {
			setSelectedOption(settings.supportBanner)
		}
	}, [settings])

	const handleOptionChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newBanner = event.target.value
		setSelectedOption(newBanner)
		setIsSaving(true)
		try {
			await updateUserBanner(newBanner)
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
		if (!confirmed) return

		setIsDeleting(true)
		try {
			await deleteUserAccount()
			alert("Your account has been successfully deleted.")
			redirect("/login")
		} catch (error) {
			console.error("Error deleting account:", error)
			alert(`Error deleting account: ${error.message}`)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div className="dashboard-container">
			<div className="flex flex-col gap-2 bg-background md:flex-row">
				<aside className="w-full md:w-3/12">
					<Sidebar />
				</aside>

				<main className="w-full md:w-9/12">
					<div className="content-container flex flex-col gap-2">
						<header className="flex flex-col">
							<h1 className="title">Settings</h1>
							<span className="title-label">Update your account preferences.</span>
							<hr />
						</header>

						<p className="subtitle">Support Banner</p>
						<select value={selectedOption} onChange={handleOptionChange} className="form-container">
							<option value="NONE">None</option>
							<option value="LGBTQ_RIGHTS">Pride</option>
							<option value="ANTI_RACISM">Anti-Racism</option>
							<option value="MENTAL_HEALTH">Mental Health</option>
							<option value="CLIMATE_ACTION">Climate Action</option>
						</select>
						<div className="button-container">
							<button className="button bg-accent text-accent-foreground" disabled={isSaving}>
								{isSaving ? "Saving..." : "Save Banner"}
							</button>
						</div>
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
