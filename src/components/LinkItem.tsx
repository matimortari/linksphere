"use client"

import { useState } from "react"
import { useGlobalContext } from "./context/GlobalContext"

export default function LinkItem({ url, title }) {
	const { settings } = useGlobalContext()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex w-full flex-col items-center justify-center">
			<a href={url} className="flex w-full justify-center text-foreground">
				<div
					className="min-w-[35vw] max-w-full rounded-3xl px-8 py-4 text-center"
					style={{
						backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
						color: settings.linkTextColor,
						transition: "background-color 0.3s ease",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<p className="text-base font-medium" style={{ color: settings.linkTextColor }}>
						{title}
					</p>
				</div>
			</a>
		</li>
	)
}
