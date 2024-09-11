"use client"

import { useState } from "react"
import { trackClick } from "../lib/actions"

export default function LinkItem({ url, title, settings, linkId }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = async () => {
		await trackClick(linkId, "link")
	}

	return (
		<li className="flex flex-col items-center justify-center">
			<a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
				<div
					className="min-w-32 text-center"
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
