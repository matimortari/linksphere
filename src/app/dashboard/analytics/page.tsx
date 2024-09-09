"use client"

import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Analytics() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	return (
		<div className="dashboard-container">
			<div className="flex flex-col md:flex-row">
				<Sidebar />

				<main className="content-container w-full">
					<header className="flex flex-col gap-2 pb-8">
						<h1 className="title">Analytics</h1>
						<p className="text-muted-foreground">View your profile analytics here.</p>
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
