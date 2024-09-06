"use client"

import AppearanceForm from "@/src/components/dashboard/AppearanceForm"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Appearance() {
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
		<div className="h-screen p-4 pt-16">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-4">
					<div className="flex flex-col pb-8">
						<h1 className="text-2xl font-semibold">Appearance</h1>
						<p className="text-muted">Update your profile appearance here.</p>
					</div>

					<section className="flex flex-col">
						<p className="mb-2 text-xl font-semibold">Update Appearance</p>
						<AppearanceForm />
					</section>
				</main>
			</div>
		</div>
	)
}
