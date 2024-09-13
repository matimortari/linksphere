"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { CardCarousel } from "../components/CardCarousel"

export default function Home() {
	const { data: session, status } = useSession()

	if (status === "loading") {
		return <div>Loading...</div>
	}

	if (status === "authenticated" && session?.user) {
		redirect("/dashboard")
	}

	return (
		<div className="main-container flex flex-col bg-card md:flex-row">
			<section className="flex flex-col items-center gap-2 p-8 md:w-1/2 md:items-start">
				<h1 className="text-3xl font-bold md:text-5xl">Welcome to NeSS!</h1>
				<p className="text-xl text-muted-foreground">
					Share your links, social profiles, <br />
					contact info & more in one page.
				</p>
				<form className="form-container">
					<span className="text-muted-foreground">ness-live.vercel.app/</span>
					<input type="text" placeholder="your_name" className="input flex-1 bg-transparent" />
					<Link href="/login" className="button bg-primary text-primary-foreground">
						Sign In
					</Link>
				</form>
			</section>

			<section className="flex items-center justify-center gap-2 p-8 md:w-1/2 md:items-start">
				<CardCarousel />
			</section>
		</div>
	)
}
