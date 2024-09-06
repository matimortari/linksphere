"use client"

import Sidebar from "@/src/components/Sidebar"
import AddLinkDialog from "@/src/components/dashboard/AddLinkDialog"
import Preview from "@/src/components/dashboard/Preview"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

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
		<div className="p-4 pt-16">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-4">
					<div className="flex flex-col pb-8">
						<h1 className="text-2xl font-semibold">Dashboard</h1>
						<p className="text-muted">Welcome back, {session.user.name}!</p>
					</div>

					<div className="flex flex-col gap-2">
						<section className="flex flex-col">
							<p className="text-xl font-semibold">My URL</p>
							<UpdateSlugForm currentSlug={session.user.slug} />
						</section>

						<section className="flex flex-col">
							<p className="text-xl font-semibold">My Header</p>
							<UpdateDescriptionForm currentDescription={session.user.description} />
						</section>

						<section className="flex flex-col">
							<p className="text-xl font-semibold">My Links</p>
							<Preview />
							<div className="flex flex-row gap-2">
								<button className="button w-24 bg-accent text-accent-foreground" onClick={() => setIsDialogOpen(true)}>
									Add Link
								</button>
								<button className="button w-44 bg-accent text-accent-foreground" onClick={() => setIsDialogOpen(true)}>
									Add Social Button
								</button>
							</div>
						</section>
					</div>
				</main>
			</div>

			{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}
		</div>
	)
}
