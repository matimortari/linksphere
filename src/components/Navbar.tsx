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

	const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"))

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
	}, [theme])

	const toggleDialog = () => setIsDialogOpen((prev) => !prev)

	const handleSignOut = () => {
		signOut({ redirect: true, callbackUrl: "/" })
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target)) {
				setIsDialogOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<nav className="absolute top-6 z-10 flex w-full items-center justify-between bg-transparent px-6">
			<Link href="/" className="button h-10 w-10 bg-card">
				<Icon icon="ri:home-2-line" />
			</Link>

			<div className="flex items-center gap-1">
				<button onClick={toggleTheme} className="button h-10 w-10 bg-card">
					<Icon
						icon={theme === "light" ? "material-symbols:light-mode-rounded" : "material-symbols:dark-mode-rounded"}
					/>
				</button>

				{!session ? (
					<Link href="/login" className="button h-10 w-10 bg-card">
						<Icon icon="material-symbols:login" />
					</Link>
				) : (
					<button onClick={toggleDialog} className="button h-10 w-10 bg-card">
						<Icon icon="charm:menu-hamburger" />
					</button>
				)}

				{isDialogOpen && (
					<div ref={dialogRef} className="content-container absolute right-8 top-8 flex">
						<div className="flex flex-col justify-center gap-4 p-2 text-sm font-semibold">
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
			</div>
		</nav>
	)
}
