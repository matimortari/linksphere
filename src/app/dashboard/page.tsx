"use client"

import Sidebar from "@/src/components/Sidebar"
import AddLinkDialog from "@/src/components/dashboard/AddLinkDialog"
import Preview from "@/src/components/dashboard/Preview"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function Dashboard() {
	const { data: session } = useSession()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<div className="p-4 pt-16">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-4">
					<div className="flex flex-col pb-8">
						<h1 className="text-2xl font-semibold">Dashboard</h1>
						<p className="text-muted">Welcome back, {session?.user.name}!</p>
					</div>

					<div className="flex flex-col gap-2">
						<section className="flex flex-col">
							<p className="text-xl font-semibold">My URL</p>
							<UpdateSlugForm currentSlug={session?.user.slug} />
						</section>

						<section className="flex flex-col">
							<p className="text-xl font-semibold">My Header</p>
							<UpdateDescriptionForm currentDescription={session?.user.description} />
						</section>

						<section className="flex flex-col">
							<p className="text-xl font-semibold">My Links</p>
							<Preview />
							<button className="button w-32 bg-accent text-accent-foreground" onClick={() => setIsDialogOpen(true)}>
								Add Link
							</button>
						</section>
					</div>
				</main>
			</div>

			{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}
		</div>
	)
}
