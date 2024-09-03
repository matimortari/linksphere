"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

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

	if (!session?.user) {
		return (
			<>
				<div className="h-screen">
					<div className="text-center">
						<h1 className="mb-4 text-4xl font-bold">Welcome to My NeSS</h1>
						<p className="mb-8 text-lg">Sign in to view and manage your links.</p>
					</div>
				</div>
			</>
		)
	}

	return null
}
