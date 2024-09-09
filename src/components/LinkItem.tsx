"use client"

import { useState } from "react"

export default function LinkItem({ url, title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex w-full flex-col items-center justify-center">
			<a href={url} className="flex justify-center text-foreground">
				<div
					className="min-w-[35vw] max-w-full rounded-3xl px-8 py-4 text-center"
					style={{
						backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
						boxShadow: `0 4px 6px ${settings.linkShadowColor}`,
						borderRadius: settings.linkBorderRadius,
						padding: settings.linkPadding,
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
