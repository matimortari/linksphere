"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import AppearanceForm from "@/src/components/dashboard/AppearanceForm"
import Preview from "@/src/components/dashboard/Preview"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Appearance() {
	const { data: session, status } = useSession()
	const { slug, setSlug, settings, setSettings } = useGlobalContext()

	useEffect(() => {
		if (status === "loading") return

		if (status === "unauthenticated") {
			redirect("/login")
		} else if (session?.user) {
			setSlug(session.user.slug || "")
		}
	}, [status, session, setSlug])

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
						<h1 className="title">Appearance</h1>
						<p className="text-muted-foreground">Update your profile appearance here.</p>
						<hr />
					</header>

					<div className="flex flex-col gap-4">
						<p className="subtitle">Update Appearance</p>
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
