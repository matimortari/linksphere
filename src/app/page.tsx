"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { CardCarousel } from "../components/CardCarousel"

export default function Home() {
	const { data: session, status } = useSession()

	if (status === "authenticated" && session?.user?.slug) {
		redirect(`/${session.user.slug}`)
	}

	if (!session?.user && status === "unauthenticated") {
		return (
			<div className="main-container">
				<div className="flex flex-row">
					<section className="w-1/2 p-8">
						<h1 className="mb-4 text-5xl font-bold text-foreground">Welcome to NeSS!</h1>
						<p className="mb-4 text-xl text-muted-foreground">
							Share your links, social profiles, <br />
							contact info & more in one page.
						</p>

						<form className="form-container">
							<span className="text-muted-foreground">ness-live.vercel.app/</span>
							<input type="text" placeholder="your_name" className="bg-transparent" />
							<Link href="/login" className="button bg-primary text-primary-foreground">
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
