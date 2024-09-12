"use client"

import Sidebar from "@/src/components/Sidebar"
import { useGlobalContext } from "@/src/components/context/GlobalContext"
import ButtonList from "@/src/components/dashboard/ButtonList"
import LinkList from "@/src/components/dashboard/LinkList"
import UpdateDescriptionForm from "@/src/components/dashboard/UpdateDescriptionForm"
import UpdateSlugForm from "@/src/components/dashboard/UpdateSlugForm"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {
	const { data: session, status } = useSession()
	const { setLinks, setSocialButtons } = useGlobalContext()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	return (
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<aside className="sidebar-container w-full md:mr-2 md:w-3/12">
					<Sidebar />
				</aside>

				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Dashboard</h1>
						<span className="title-label">
							Welcome back, <span className="font-bold text-primary">{session.user.name}!</span>
						</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<p className="subtitle">My URL</p>
						<UpdateSlugForm />
						<hr />

						<p className="subtitle">My Header</p>
						<UpdateDescriptionForm />
						<hr />

						<p className="subtitle">My Social Buttons</p>
						<ButtonList />
						<hr />

						<p className="subtitle">My Links</p>
						<LinkList />
					</div>
				</main>
			</div>
		</div>
	)
}
