"use client"

import AppearanceForm from "@/src/components/dashboard/AppearanceForm"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Appearance() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	if (!session?.user) {
		return null
	}

	return (
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<aside className="sidebar-container w-full md:mr-2 md:w-3/12">
					<Sidebar />
				</aside>

				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Appearance</h1>
						<span className="title-label">Update your profile appearance.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<AppearanceForm />
					</div>
				</main>
			</div>
		</div>
	)
}
