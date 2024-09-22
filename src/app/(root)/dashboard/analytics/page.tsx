"use client"

import ClicksByLink from "@/src/components/lists/ClicksByLink"
import ClicksTotal from "@/src/components/lists/ClicksTotal"
import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Analytics() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	return (
		<div className="flex min-h-screen flex-col gap-2 bg-background md:flex-row">
			<aside className="w-full md:w-3/12">
				<Sidebar />
			</aside>

			<main className="w-full md:w-9/12">
				<div className="content-container flex flex-col gap-2">
					<header className="flex flex-col">
						<h1 className="title">Analytics</h1>
						<span className="title-label">View your profile analytics.</span>
						<hr />
					</header>

					<p className="subtitle">Total Clicks</p>
					<ClicksTotal />
					<hr />

					<p className="subtitle">Clicks By Link</p>
					<ClicksByLink />
				</div>
			</main>
		</div>
	)
}
