"use client"

import { Icon } from "@iconify/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useGlobalContext } from "./context/GlobalContext"
import Preview from "./Preview"

export default function Sidebar() {
	const { slug, name, image } = useGlobalContext()
	const [isPreviewVisible, setIsPreviewVisible] = useState(false)

	const togglePreview = () => {
		setIsPreviewVisible((prev) => !prev)
	}

	return (
		<div className="content-container flex flex-col items-center justify-center gap-2 py-4">
			{image && <Image src={image} alt={name} width={40} height={40} className="avatar" />}
			<p className="text-lg font-bold">{name}</p>
			<a href={`https://ness-live.vercel.app/${slug}`} className="text-xs font-normal">
				ness-live.vercel.app/{slug}
			</a>

			<div className="flex w-full flex-col justify-center gap-3 font-semibold">
				<Link href="/dashboard" className="button">
					<Icon icon="material-symbols:id-card" className="icon text-2xl" />
					<p>Links</p>
				</Link>
				<hr />

				<Link href="/dashboard/appearance" className="button">
					<Icon icon="material-symbols:brush" className="icon text-2xl" />
					<p>Appearance</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="button">
					<Icon icon="material-symbols:analytics" className="icon text-2xl" />
					<p>Analytics</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="button">
					<Icon icon="material-symbols:settings" className="icon text-2xl" />
					<p>Preferences</p>
				</Link>
				<hr />

				<button onClick={togglePreview} className="button">
					<Icon icon="material-symbols:visibility" className="icon text-2xl" />
					<p>Preview</p>
				</button>
				<hr />
			</div>

			<div className="mt-2 flex w-full flex-col items-center justify-end">
				{isPreviewVisible && (
					<div className="w-full">
						<Preview />
					</div>
				)}
			</div>
		</div>
	)
}
