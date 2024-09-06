"use client"

import Sidebar from "@/src/components/Sidebar"
import LinkList from "@/src/components/dashboard/LinkList"
import Preview from "@/src/components/dashboard/Preview"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
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
						<h1 className="title">Dashboard</h1>
						<div className="flex flex-row">
							<span className="text-muted-foreground">
								Welcome back, <span className="font-bold text-primary">{session.user.name}!</span>
							</span>
						</div>
						<hr />
					</header>

					<div className="flex flex-col gap-4">
						<p className="subtitle">My URL</p>
						<UpdateSlugForm currentSlug={session.user.slug} />
						<hr />

						<p className="subtitle">My Header</p>
						<UpdateDescriptionForm currentDescription={session.user.description} />
						<hr />

						<p className="subtitle">My Links</p>
						<LinkList />
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
