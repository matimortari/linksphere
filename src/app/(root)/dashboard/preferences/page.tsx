"use client"

import FeedbackForm from "@/src/components/forms/FeedbackForm"
import SupportBannerForm from "@/src/components/forms/SupportBannerForm"
import Sidebar from "@/src/components/Sidebar"
import { deleteUserAccount } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Preferences() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	const handleDeleteAccount = async () => {
		const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.")

		if (confirmation) {
			try {
				await deleteUserAccount()
				window.location.href = "/login"
			} catch (error) {
				alert(error.message)
			}
		}
	}

	return (
		<div className="flex min-h-screen flex-col gap-2 bg-background md:flex-row">
			<aside className="w-full md:w-3/12">
				<Sidebar />
			</aside>

			<main className="w-full md:w-9/12">
				<div className="content-container flex flex-col gap-2">
					<header className="flex flex-col">
						<h1 className="title">Preferences</h1>
						<span className="title-label">Update your account settings.</span>
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
						<button className="button bg-destructive text-destructive-foreground" onClick={handleDeleteAccount}>
							Delete Account
						</button>
					</div>
				</div>
			</main>
		</div>
	)
}
