"use client"

import LinkClickList from "@/src/components/dashboard/LinkClickList"
import Sidebar from "@/src/components/Sidebar"
import { fetchUserAnalytics } from "@/src/lib/actions"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Analytics() {
	const { data: session, status } = useSession()
	const [stats, setStats] = useState(null)
	const [links, setLinks] = useState([])
	const [error, setError] = useState(null)

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}

	useEffect(() => {
		const loadAnalyticsData = async () => {
			try {
				const data = await fetchUserAnalytics()
				setStats(data.stats)
				setLinks(data.links)
			} catch (error) {
				setError("Error fetching analytics")
			}
		}

		loadAnalyticsData()
	}, [status])

	return (
		<div className="dashboard-container">
			<div className="flex flex-col gap-2 bg-background md:flex-row">
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

						<div className="font-semibold">
							Total Views: <span className="font-normal">{stats?.views ?? 0}</span>
						</div>

						<div className="font-semibold">
							Total Page Clicks: <span className="font-normal">{stats?.clicks ?? 0}</span>
						</div>
						<hr />

						<p className="subtitle">Clicks By Link</p>
						<LinkClickList />
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
