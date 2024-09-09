"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { CardCarousel } from "../components/CardCarousel"

export default function Home() {
	const { data: session, status } = useSession()

	if (status === "authenticated" && session?.user?.slug) {
		redirect("/dashboard")
	}

	if (!session?.user && status === "unauthenticated") {
		return (
			<div className="main-container flex flex-col bg-background md:flex-row">
				<section className="flex w-full flex-col items-center p-6 md:w-1/2 md:items-start">
					<h1 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">Welcome to NeSS!</h1>
					<p className="mb-4 text-xl text-muted-foreground">
						Share your links, social profiles, <br />
						contact info & more in one page.
					</p>

					<form className="form-container w-full">
						<span className="text-muted-foreground">ness-live.vercel.app/</span>
						<input type="text" placeholder="your_name" className="input flex-1 bg-transparent" />
						<Link href="/login" className="button bg-primary text-primary-foreground">
							Sign In
						</Link>
					</form>
				</section>

				<section className="w-full p-6 md:w-1/2">
					<div className="flex items-center justify-center">
						<CardCarousel />
					</div>
				</section>
			</div>
		)
	}

	return null
}
