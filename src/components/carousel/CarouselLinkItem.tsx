"use client"

import { useState } from "react"

export default function CarouselLinkItem({ title, settings }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<li className="flex flex-col items-center justify-center">
			<div
				className="min-w-32 max-w-72 text-center"
				style={{
					backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
					boxShadow: settings.isLinkShadow ? `0 4px 6px ${settings.linkShadowColor}` : "none",
					borderRadius: settings.linkBorderRadius,
					padding: settings.linkPadding,
					transition: "background-color 0.3s ease, box-shadow 0.3s ease",
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<p className="overflow-hidden text-ellipsis font-medium" style={{ color: settings.linkTextColor }}>
					{title}
				</p>
			</div>
		</li>
	)
}
