"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
	const { data: session } = useSession()
	const [theme, setTheme] = useState("light")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const dialogRef = useRef<HTMLDivElement>(null)

	const toggleTheme = () => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
	}, [theme])

	const toggleDialog = () => setIsDialogOpen((prevState) => !prevState)

	const handleSignOut = () => {
		signOut({ redirect: true, callbackUrl: "/" })
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
				setIsDialogOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<nav className="mb-8 flex items-center justify-end bg-transparent p-4">
			<div className="flex items-center gap-2">
				<button onClick={toggleTheme} className="button flex h-10 w-10 items-center justify-center bg-background">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</button>

				{!session && (
					<Link href="/login" className="button flex h-10 w-10 items-center justify-center">
						<Icon icon="material-symbols:menu-rounded" />
					</Link>
				)}

				{session && (
					<button onClick={toggleDialog} className="button flex h-10 w-10 items-center justify-center bg-background">
						<Icon icon="material-symbols:menu-rounded" />
					</button>
				)}
			</div>

			{isDialogOpen && (
				<div
					ref={dialogRef}
					className="absolute top-14 z-50 flex rounded-lg border border-muted bg-background p-2 shadow-lg"
				>
					<div className="m-2 flex flex-col justify-center gap-4 p-2 text-center text-sm font-semibold">
						{session && (
							<>
								<Link href={`/${session.user.id}`} className="button w-full text-center">
									My Profile
								</Link>
								<Link href="/dashboard" className="button w-full text-center">
									Dashboard
								</Link>
								<button onClick={handleSignOut} className="button w-full text-center">
									Sign Out
								</button>
							</>
						)}
						{!session && (
							<Link href="/login" className="button w-full text-center">
								<Icon icon="material-symbols:logout" />
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}
