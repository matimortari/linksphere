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
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<aside className="sidebar-container w-full md:mr-2 md:w-3/12">
					<Sidebar />
				</aside>

				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Analytics</h1>
						<span className="title-label">View your profile analytics.</span>
						<hr />
					</header>

					<div className="flex flex-col gap-2">
						<p className="subtitle">Total Page Views</p>
						<div className="text-base">
							Total Views: <span className="font-semibold">{stats?.views ?? 0}</span>
						</div>
						<div className="text-base">
							Total Page Clicks: <span className="font-semibold">{stats?.clicks ?? 0}</span>
						</div>
						<hr />

						<p className="subtitle">Clicks By Link</p>
						<LinkClickList />
					</div>
				</main>
			</div>
		</div>
	)
}
