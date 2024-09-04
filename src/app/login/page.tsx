"use client"

import { Icon } from "@iconify/react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="flex h-screen flex-col items-center p-4">
			<div className="flex flex-col items-center justify-center rounded-lg px-8 py-4 text-center shadow-md">
				<strong className="p-4 text-5xl">Sign In</strong>
				<p className="mt-2 text-base text-muted-foreground">Sign in with your preferred provider.</p>

				<hr className="my-6 w-full border-muted" />

				<div className="m-4 flex flex-col items-center justify-center gap-2">
					<button
						className="button flex w-full flex-row items-center gap-2 bg-google text-accent-foreground"
						onClick={() => signIn("google")}
					>
						<Icon icon="simple-icons:google" className="icon" />
						Sign In With Google
					</button>

					<button
						className="button flex w-full flex-row items-center gap-2 bg-github text-accent-foreground"
						onClick={() => signIn("github")}
					>
						<Icon icon="simple-icons:github" className="icon" />
						Sign In With GitHub
					</button>
				</div>
			</div>
		</div>
	)
}
