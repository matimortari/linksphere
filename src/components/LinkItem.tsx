"use client"

import { useState } from "react"

export default function LinkItem({ url, title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-col items-center justify-center">
			<a href={url}>
				<div
					className="min-w-[35vw] text-center"
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
					<p className="font-medium" style={{ color: settings.linkTextColor }}>
						{title}
					</p>
				</div>
			</a>
		</li>
	)
}
