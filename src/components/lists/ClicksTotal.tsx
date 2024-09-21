"use client"

import { fetchUserAnalytics } from "@/src/lib/actions"
import { useEffect, useState } from "react"

export default function ClicksTotal() {
	const [stats, setStats] = useState(null)
	const [links, setLinks] = useState([])
	const [error, setError] = useState(null)

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
	}, [])

	return (
		<div>
			<div className="font-semibold">
				Total Views: <span className="font-normal">{stats?.views ?? 0}</span>
			</div>

			<div className="font-semibold">
				Total Page Clicks: <span className="font-normal">{stats?.clicks ?? 0}</span>
			</div>
		</div>
	)
}
