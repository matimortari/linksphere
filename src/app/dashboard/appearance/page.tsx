"use client"

import AppearanceForm from "@/src/components/dashboard/AppearanceForm"
import Preview from "@/src/components/dashboard/Preview"
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
				<Sidebar />

				<main className="dashboard-container w-full md:w-6/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Appearance</h1>
						<span className="text-muted-foreground">Update your profile appearance.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<AppearanceForm />
						<hr />
					</div>
				</main>

				<div className="mb-2 flex h-full w-full justify-center md:ml-2 md:w-3/12 md:max-w-full">
					<Preview />
					<hr />
				</div>
			</div>
		</div>
	)
}
