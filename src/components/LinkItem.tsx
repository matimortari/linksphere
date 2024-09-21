"use client"

import { trackClick } from "@/src/lib/actions"
import { useState } from "react"

export default function LinkItem({ url, title, settings, linkId }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = async () => {
		await trackClick(linkId, "link")
	}

	return (
		<li className="flex flex-col items-center justify-center">
			<a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
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
			</a>
		</li>
	)
}
