"use client"

import { useEffect, useState } from "react"
import { fetchUserSettings } from "../lib/actions"

export default function LinkItem({ url, title }) {
	const [settings, setSettings] = useState({
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
	})
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		const getSettings = async () => {
			try {
				const fetchedSettings = await fetchUserSettings()
				setSettings(fetchedSettings)
			} catch (error) {
				console.error("Failed to fetch settings:", error)
			}
		}

		getSettings()
	}, [])

	return (
		<li className="flex w-full flex-col items-center justify-center">
			<a href={url} className="flex w-full justify-center text-foreground">
				<div
					className="min-w-[40vw] max-w-full rounded-3xl px-10 py-4 text-center"
					style={{
						backgroundColor: isHovered ? settings.linkHoverBackgroundColor : settings.linkBackgroundColor,
						color: settings.linkTextColor,
						transition: "background-color 0.3s ease",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<p
						className="text-base font-medium"
						style={{
							color: settings.linkTextColor,
						}}
					>
						{title}
					</p>
				</div>
			</a>
		</li>
	)
}
