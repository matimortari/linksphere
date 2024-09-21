"use client"

import FeedbackForm from "@/src/components/forms/FeedbackForm"
import Sidebar from "@/src/components/Sidebar"
import { deleteUserAccount } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import SupportBannerForm from "../../../components/forms/SupportBannerForm"

export default function Preferences() {
	const { data: session, status } = useSession()

	const [isDeleting, setIsDeleting] = useState(false)

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
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
						<SupportBannerForm />
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
