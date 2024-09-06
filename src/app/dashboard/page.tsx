"use client"

import Sidebar from "@/src/components/Sidebar"
import AddLinkDialog from "@/src/components/dashboard/AddLinkDialog"
import LinkList from "@/src/components/dashboard/LinkList"
import Preview from "@/src/components/dashboard/Preview"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const [slug, setSlug] = useState(session?.user.slug || "")
	const [description, setDescription] = useState(session?.user.description || "")
	const [links, setLinks] = useState(session?.user.links || [])
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	useEffect(() => {
		if (status === "loading") return

		if (status === "unauthenticated") {
			redirect("/login")
		}
	}, [status])

	const handleAddLink = (newLink) => {
		setLinks((prevLinks) => [...prevLinks, newLink])
	}

	if (status === "loading") {
		return <div>Loading Dashboard...</div>
	}

	if (!session?.user) {
		return null
	}

	return (
		<div className="dashboard-container">
			<div className="flex flex-row">
				<Sidebar slug={slug} name={session.user.name} image={session.user.image} />

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
						<UpdateSlugForm currentSlug={slug} setSlug={setSlug} />
						<hr />

						<p className="subtitle">My Header</p>
						<UpdateDescriptionForm currentDescription={description} setDescription={setDescription} />
						<hr />

						<p className="subtitle">My Links</p>
						<LinkList links={links} />
						<div className="button-container">
							<button className="button bg-primary text-primary-foreground" onClick={() => setIsDialogOpen(true)}>
								Add Link
							</button>
						</div>
						{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} onAddLink={handleAddLink} />}
						<hr />

						<p className="title">Preview</p>
						<Preview slug={slug} description={description} links={links} />
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
