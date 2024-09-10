"use client"

import Sidebar from "@/src/components/Sidebar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserStats {
	views: number
	clicks: number
}

interface ApiResponse {
	success: boolean
	stats: UserStats
}

export default function Analytics() {
	const { data: session, status } = useSession()
	const [stats, setStats] = useState<UserStats | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		if (status === "loading") {
			return
		}

		if (status === "unauthenticated") {
			router.push("/login")
			return
		}

		fetch("/api/analytics")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then((data: ApiResponse) => {
				if (data.success) {
					setStats(data.stats)
				} else {
					setError("Failed to fetch analytics data")
				}
				setLoading(false)
			})
			.catch((error) => {
				setError("Error fetching analytics")
				setLoading(false)
				console.error("Error fetching analytics:", error)
			})
	}, [status, router])

	if (loading) {
		return (
			<div className="main-container">
				<div className="flex flex-col bg-background md:flex-row">
					<Sidebar />
					<main className="dashboard-container w-full md:w-9/12">
						<header className="flex flex-col gap-2 pb-4">
							<h1 className="title">Analytics</h1>
							<span className="text-muted-foreground">View your profile analytics.</span>
							<hr />
						</header>
						<div className="flex flex-col gap-2">
							<p className="subtitle">Total Views: Loading...</p>
							<hr />
							<p className="subtitle">Total Clicks: Loading...</p>
							<hr />
						</div>
					</main>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="main-container">
				<div className="flex flex-col bg-background md:flex-row">
					<Sidebar />
					<main className="dashboard-container w-full md:w-9/12">
						<header className="flex flex-col gap-2 pb-4">
							<h1 className="title">Analytics</h1>
							<span className="text-muted-foreground">View your profile analytics.</span>
							<hr />
						</header>
						<div className="flex flex-col gap-2">
							<p className="subtitle">{error}</p>
							<hr />
						</div>
					</main>
				</div>
			</div>
		)
	}

	return (
		<div className="main-container">
			<div className="flex flex-col bg-background md:flex-row">
				<Sidebar />
				<main className="dashboard-container w-full md:w-9/12">
					<header className="flex flex-col gap-2 pb-4">
						<h1 className="title">Analytics</h1>
						<span className="text-muted-foreground">View your profile analytics.</span>
						<hr />
					</header>
					<div className="flex flex-col gap-2">
						<p className="subtitle">Total Page Views: {stats?.views ?? 0}</p>
						<hr />
						<p className="subtitle">Total Clicks: {stats?.clicks ?? 0}</p>
						<hr />
					</div>
				</main>
			</div>
		</div>
	)
}
