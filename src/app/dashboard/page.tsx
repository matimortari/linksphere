"use client"

import Sidebar from "@/src/components/Sidebar"
import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import LinkList from "@/src/components/lists/LinkList"
import SocialButtonList from "@/src/components/lists/SocialButtonList"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Dashboard() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	return (
		<div className="dashboard-container">
			<div className="flex flex-col gap-2 bg-background md:flex-row">
				<aside className="w-full md:w-3/12">
					<Sidebar />
				</aside>

				<main className="w-full md:w-9/12">
					<div className="content-container flex flex-col gap-2">
						<header className="flex flex-col">
							<h1 className="title">Dashboard</h1>
							<span className="title-label">
								Welcome back, <span className="font-bold text-primary">{session.user.name}!</span>
							</span>
							<hr />
						</header>

						<p className="subtitle">My URL</p>
						<UpdateSlugForm />
						<hr />

						<p className="subtitle">My Header</p>
						<UpdateHeaderForm />
						<hr />

						<p className="subtitle">My Social Buttons</p>
						<SocialButtonList />
						<hr />

						<p className="subtitle">My Links</p>
						<LinkList />
					</div>
				</main>
			</div>
		</div>
	)
}
