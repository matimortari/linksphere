"use client"

import Sidebar from "@/src/components/Sidebar"
import { useGlobalContext } from "@/src/components/context/GlobalContext"
import AddLinkDialog from "@/src/components/dashboard/AddLinkDialog"
import LinkList from "@/src/components/dashboard/LinkList"
import Preview from "@/src/components/dashboard/Preview"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { UserLink } from "@prisma/client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const { links, setLinks } = useGlobalContext()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	const handleUpdateLink = (updatedLink: UserLink) => {
		setLinks((prevLinks) => prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
	}

	const handleDeleteLink = (linkId: number) => {
		setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId))
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
						<UpdateSlugForm />
						<hr />

						<p className="subtitle">My Header</p>
						<UpdateDescriptionForm />
						<hr />

						<p className="subtitle">My Links</p>
						<LinkList onUpdateLink={handleUpdateLink} onDeleteLink={handleDeleteLink} />
						<div className="button-container">
							<button className="button bg-primary text-primary-foreground" onClick={() => setIsDialogOpen(true)}>
								Add Link
							</button>
						</div>
						{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}
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
