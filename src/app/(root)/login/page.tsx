"use client"

import { Icon } from "@iconify/react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/dashboard")
	}

	return (
		<div className="main-container relative">
			<div className="absolute inset-x-0 bottom-0 h-3/6 opacity-35">
				<Image src="/grid-bg.png" alt="Background" fill className="rounded-2xl" />
			</div>

			<main className="flex flex-col items-center justify-center gap-4 p-8">
				<strong className="text-6xl">Sign In</strong>
				<p className="text-muted-foreground">Sign in with your preferred provider.</p>

				<hr className="w-full" />

				<div className="flex flex-col items-center justify-center gap-2">
					<button className="button bg-google text-accent-foreground" onClick={() => signIn("google")}>
						<Icon icon="simple-icons:google" className="icon" />
						Sign In With Google
					</button>
					<button className="button bg-github text-accent-foreground" onClick={() => signIn("github")}>
						<Icon icon="simple-icons:github" className="icon" />
						Sign In With GitHub
					</button>
				</div>
			</main>
		</div>
	)
}
