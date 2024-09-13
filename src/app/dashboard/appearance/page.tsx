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

	return (
		<div className="dashboard-container">
			<div className="flex flex-col gap-2 bg-background md:flex-row">
				<aside className="w-full md:w-3/12">
					<Sidebar />
				</aside>

				<main className="w-full md:w-9/12">
					<div className="content-container flex flex-col gap-2">
						<header className="flex flex-col">
							<h1 className="title">Appearance</h1>
							<span className="title-label">Update your profile appearance.</span>
							<hr />
						</header>

						<AppearanceForm />
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
