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
			<div className="flex flex-col md:flex-row">
				<Sidebar />

				<main className="content-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-8">
						<h1 className="title">Appearance</h1>
						<span className="text-muted-foreground">Update your profile appearance here.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-4">
						<AppearanceForm />
						<hr />

						<p className="title">Preview</p>
						<Preview />
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
