"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
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
			<div className="h-screen p-4">
				<div className="p-8">
					<h1 className="mb-4 text-5xl font-bold text-foreground">Welcome to My NeSS</h1>
					<p className="mb-8 text-xl text-muted-foreground">
						Share your links, social profiles, <br />
						contact info & more in one page.
					</p>

					<form className="ml-6 inline-flex items-center justify-center rounded-lg border border-muted pl-2 shadow-lg">
						<span className="py-2">ness-live.vercel.app/</span>
						<input type="text" placeholder="your_name" className="bg-transparent py-2" />
						<Link href="/login" className="rounded-lg bg-accent p-2 text-center font-semibold text-accent-foreground">
							Sign In
						</Link>
					</form>
				</div>
			</div>
		)
	}

	return null
}
