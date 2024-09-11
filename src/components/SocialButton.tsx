"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"
import { trackClick } from "../lib/actions"

export default function SocialButton({ url, icon, settings, buttonId }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = async () => {
		await trackClick(buttonId, "button")
	}

	return (
		<li className="flex flex-row items-center justify-center">
			<a href={url} onClick={handleClick}>
				<div
					className="flex h-10 w-10 items-center justify-center rounded-full"
					style={{
						backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
						boxShadow: `0 4px 6px ${settings.buttonShadowColor}`,
						transition: "background-color 0.3s ease",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{icon && <Icon icon={icon} className="h-5 w-5" style={{ color: settings.buttonIconColor }} />}
				</div>
			</a>
		</li>
	)
}
