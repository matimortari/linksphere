"use client"

import { fetchUserAnalytics } from "@/src/lib/actions"
import { useEffect, useState } from "react"

export default function ClicksTotal() {
	const [stats, setStats] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const loadAnalyticsData = async () => {
			try {
				const data = await fetchUserAnalytics()
				setStats(data.stats)
			} catch (error) {
				console.error("Error fetching user analytics:", error)
				setError("Error fetching analytics")
			}
		}

		loadAnalyticsData()
	}, [])

	return (
		<div>
			<div className="font-semibold">
				Total Views: <span className="font-normal">{stats?.views ?? 0}</span>
			</div>

			<div className="font-semibold">
				Total Page Clicks: <span className="font-normal">{stats?.clicks ?? 0}</span>
			</div>

			{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
		</div>
	)
}
