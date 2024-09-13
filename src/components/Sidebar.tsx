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
		<div className="content-container flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center p-4">
				{image && <Image src={image} alt={name} width={40} height={40} className="avatar" />}
				<p className="text-lg font-bold">{name}</p>
				<a href={`https://ness-live.vercel.app/${slug}`} className="text-xs font-normal">
					ness-live.vercel.app/{slug}
				</a>
			</div>

			<div className="flex w-full flex-col justify-center gap-3 font-semibold">
				<Link href="/dashboard" className="button" style={{ justifyContent: "start" }}>
					<Icon icon="material-symbols:view-timeline-outline" className="icon text-2xl" />
					<p>My Links</p>
				</Link>
				<hr />

				<Link href="/dashboard/appearance" className="button" style={{ justifyContent: "start" }}>
					<Icon icon="material-symbols:slide-library" className="icon text-2xl" />
					<p>Appearance</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="button" style={{ justifyContent: "start" }}>
					<Icon icon="material-symbols:chart-data-outline" className="icon text-2xl" />
					<p>Analytics</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="button" style={{ justifyContent: "start" }}>
					<Icon icon="material-symbols:settings-applications-outline" className="icon text-2xl" />
					<p>Preferences</p>
				</Link>
				<hr />

				<button onClick={togglePreview} className="button" style={{ justifyContent: "start" }}>
					<Icon icon="material-symbols:preview" className="icon text-2xl" />
					<p>Preview</p>
				</button>
				<hr />
			</div>

			<div className="flex w-full flex-col items-center justify-center">
				{isPreviewVisible && (
					<div className="w-full">
						<Preview />
						<hr />
					</div>
				)}
			</div>
		</div>
	)
}
