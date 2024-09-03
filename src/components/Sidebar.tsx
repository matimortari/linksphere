"use client"

import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Sidebar() {
	const { data: session } = useSession()

	if (session) {
		return (
			<aside className="h-6/12 w-3/12 rounded-lg border border-muted p-4 shadow-lg">
				<div className="flex flex-col items-center gap-2 pb-6 text-2xl font-bold">
					{session.user.image && (
						<Image src={session.user.image} alt={session.user.name || ""} width={40} height={40} className="avatar" />
					)}
					<div className="flex flex-col items-center justify-center">
						<h1>My Dashboard</h1>
						<p className="text-sm font-normal">{session.user.name}</p>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-6 p-2 text-sm font-semibold">
					<Link href="/dashboard" className="button flex flex-row items-center gap-2">
						<Icon icon="material-symbols:id-card" className="icon text-3xl" />
						<p>Links</p>
					</Link>

					<Link href="/dashboard/analytics" className="button flex flex-row items-center gap-2">
						<Icon icon="material-symbols:analytics" className="icon text-3xl" />
						<p>Analytics</p>
					</Link>

					<Link href="/dashboard/appearance" className="button flex flex-row items-center gap-2">
						<Icon icon="material-symbols:brush" className="icon text-3xl" />
						<p>Appearance</p>
					</Link>

					<Link href="/dashboard/settings" className="button flex flex-row items-center gap-2">
						<Icon icon="material-symbols:settings" className="icon text-3xl" />
						<p>Settings</p>
					</Link>
				</div>
			</aside>
		)
	} else {
		return (
			<aside className="h-6/12 w-3/12 rounded-lg border border-muted p-4">
				<div className="flex flex-col items-center gap-2 pb-6 text-2xl font-bold">
					<h1>My Dashboard</h1>
					<p className="text-sm font-normal">Please sign in to access your dashboard.</p>
				</div>

				<div className="flex flex-col justify-center gap-6 p-2 text-sm font-semibold">
					<Link href="/login" className="flex flex-row items-center gap-2">
						<Icon icon="material-symbols:login" className="icon text-3xl" />
						<p>Sign In</p>
					</Link>
				</div>
			</aside>
		)
	}
}
