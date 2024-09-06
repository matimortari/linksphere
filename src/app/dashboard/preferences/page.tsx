"use client"

import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Preferences() {
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "loading") return

		if (status === "unauthenticated") {
			redirect("/login")
		}
	}, [status])

	if (status === "loading") {
		return <div>Loading Dashboard...</div>
	}

	if (!session?.user) {
		return null
	}

	return (
		<div className="dashboard-container">
			<div className="flex flex-row">
				<Sidebar />

				<main className="content-container w-full">
					<header className="flex flex-col gap-2 pb-8">
						<h1 className="title">Settings</h1>
						<p className="text-muted-foreground">Update your account settings here.</p>
						<hr />
					</header>

					<div className="flex flex-col gap-4">
						<p className="subtitle">TBA</p>
						<hr />

						<p className="subtitle">TBA</p>
						<hr />

						<p className="subtitle">TBA</p>
						<hr />

						<p className="subtitle">TBA</p>
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
