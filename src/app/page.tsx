"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import Navbar from "../components/Navbar"

export default function Home() {
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "loading") {
			return
		}

		if (status === "authenticated" && session?.user?.id) {
			redirect(`/${session.user.id}`)
		}
	}, [status, session])

	if (status === "loading") {
		return <div>Loading...</div>
	}

	if (!session?.user) {
		return (
			<div>
				<Navbar />
				<div className="h-screen p-4">
					<header className="mb-6 flex items-center justify-between">
						<strong className="text-2xl md:text-4xl">My Links</strong>
					</header>
					<div className="text-center">
						<h1 className="mb-4 text-4xl font-bold">Welcome to My Links</h1>
						<p className="mb-8 text-lg">Sign in to view and manage your links.</p>
						<a href="/api/auth/signin" className="button">
							Sign In
						</a>
					</div>
				</div>
			</div>
		)
	}

	return null
}
