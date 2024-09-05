"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { CardCarousel } from "../components/CardCarousel"

export default function Home() {
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === "loading") {
			return
		}

		if (status === "authenticated" && session?.user?.slug) {
			redirect(`/${session.user.slug}`)
		}
	}, [status, session])

	if (!session?.user) {
		return (
			<div className="h-screen p-4 pt-16">
				<div className="flex h-full flex-row">
					<section className="w-1/2 p-8">
						<h1 className="mb-4 text-5xl font-bold text-foreground">Welcome to NeSS!</h1>
						<p className="mb-4 text-xl text-muted-foreground">
							Share your links, social profiles, <br />
							contact info & more in one page.
						</p>
						<form className="link-form">
							<span className="py-2">ness-live.vercel.app/</span>
							<input type="text" placeholder="your_name" className="bg-transparent py-2" />
							<Link href="/login" className="button bg-accent text-accent-foreground">
								Sign In
							</Link>
						</form>
					</section>

					<section className="w-1/2 p-8">
						<div className="flex w-full items-center justify-center">
							<CardCarousel />
						</div>
					</section>
				</div>
			</div>
		)
	}

	return null
}
