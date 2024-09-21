"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Navbar() {
	const { data: session } = useSession()
	const { slug } = useGlobalContext()
	const [theme, setTheme] = useState("light")
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const dialogRef = useRef(null)

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
		<nav className="absolute top-0 flex w-full items-center justify-end bg-transparent p-2">
			<div className="button-container">
				<button onClick={toggleTheme} className="button h-10 w-10 bg-card">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</button>

				{!session && (
					<Link href="/login" className="button h-10 w-10 bg-card">
						<Icon icon="material-symbols:login" />
					</Link>
				)}

				{session && (
					<button onClick={toggleDialog} className="button h-10 w-10 bg-card">
						<Icon icon="material-symbols:menu-rounded" />
					</button>
				)}
			</div>

			{isDialogOpen && (
				<div ref={dialogRef} className="content-container absolute top-14 z-10 flex">
					<div className="flex flex-col justify-center gap-2 p-2 text-sm font-semibold">
						{session && (
							<>
								<Link href={`/${slug}`} className="button">
									My Page
								</Link>
								<Link href="/dashboard" className="button">
									Dashboard
								</Link>
								<button onClick={handleSignOut} className="button">
									Sign Out
								</button>
							</>
						)}
						{!session && (
							<Link href="/login" className="button">
								<Icon icon="material-symbols:logout" />
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}
