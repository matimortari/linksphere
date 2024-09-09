"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useGlobalContext } from "./context/GlobalContext"

export default function Sidebar() {
	const { slug, name, image } = useGlobalContext()

	return (
		<aside className="content-container h-full w-full shadow-lg md:mr-4 md:w-3/12">
			<div className="flex flex-col items-center justify-center gap-2 py-2 md:py-4">
				{image && <Image src={image} alt={name} width={40} height={40} className="avatar" />}
				<p className="text-base font-semibold md:text-lg">{name}</p>
				<a href={`https://ness-live.vercel.app/${slug}`} className="text-xs font-normal md:text-sm">
					ness-live.vercel.app/{slug}
				</a>
			</div>

			<hr />

			<div className="flex flex-col justify-center gap-4 py-4 text-sm font-semibold md:text-base">
				<Link href="/dashboard" className="button flex flex-row items-center gap-2">
					<Icon icon="material-symbols:id-card" className="icon text-2xl" />
					<p>Links</p>
				</Link>
				<hr />

				<Link href="/dashboard/appearance" className="button flex flex-row items-center gap-2">
					<Icon icon="material-symbols:brush" className="icon text-2xl" />
					<p>Appearance</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="button flex flex-row items-center gap-2">
					<Icon icon="material-symbols:analytics" className="icon text-2xl" />
					<p>Analytics</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="button flex flex-row items-center gap-2">
					<Icon icon="material-symbols:settings" className="icon text-2xl" />
					<p>Preferences</p>
				</Link>
				<hr />
			</div>
		</aside>
	)
}
