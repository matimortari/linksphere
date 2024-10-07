"use client"

import { fetchUserAnalytics } from "@/src/lib/actions"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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

	const conversionRate =
		stats && stats.views > 0
			? ((stats.clicks / stats.views) * 100).toFixed(2) // Calculate conversion rate in percentage
			: 0

	const chartData = stats
		? [
				{ name: "Views", value: stats.views },
				{ name: "Clicks", value: stats.clicks },
			]
		: []

	return (
		<div>
			<div className="font-semibold">
				Total Views: <span className="font-normal">{stats?.views}</span>
			</div>

			<div className="font-semibold">
				Total Page Clicks: <span className="font-normal">{stats?.clicks}</span>
			</div>

			<div className="font-semibold">
				Conversion Rate: <span className="font-normal">{conversionRate}%</span>
			</div>

			{error && <p className="mt-2 font-bold text-destructive">{error}</p>}

			<ResponsiveContainer width="100%" height={150} className="m-4 max-w-lg">
				<BarChart data={chartData}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="value" fill="#458a7c" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}
