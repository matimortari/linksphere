"use client"

import { useState } from "react"

export default function LinkItem({ url, title, settings, linkId }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleLinkClick = async () => {
		try {
			await fetch("/api/analytics", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: linkId, type: "link" }), // Include both ID and type
			})
		} catch (error) {
			console.error("Failed to increment click count:", error)
		}
	}

	return (
		<li className="flex flex-col items-center justify-center">
			<a href={url} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
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
