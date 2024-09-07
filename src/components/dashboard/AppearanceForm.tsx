"use client"

import { BORDER_RADIUS_OPTIONS, defaultSettings, PADDING_OPTIONS } from "@/src/lib/utils"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function AppearanceForm() {
	const { settings, setSettings } = useGlobalContext()
	const [error, setError] = useState<string>("")
	const [success, setSuccess] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const response = await fetch(`/api/preferences`)
				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error)
				}

				if (data.settings) {
					setSettings(data.settings)
				} else {
					setSettings(defaultSettings)
					throw new Error("Settings data is missing")
				}
			} catch (error) {
				setError((error as Error).message)
				setSettings(defaultSettings)
			} finally {
				setLoading(false)
			}
		}

		fetchSettings()
	}, [setSettings])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			const response = await fetch(`/api/preferences`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(settings),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error)
			}

			setSuccess("Settings updated successfully!")
		} catch (error) {
			setError((error as Error).message)
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	const currentSettings = { ...defaultSettings, ...settings }

	return (
		<div className="content-container shadow-lg">
			<form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col space-y-4">
				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Background Color:</span>
					<input
						id="backgroundColor"
						type="color"
						value={currentSettings.backgroundColor}
						onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Background Color:</span>
					<input
						id="linkBackgroundColor"
						type="color"
						value={currentSettings.linkBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkBackgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Text Color:</span>
					<input
						id="linkTextColor"
						type="color"
						value={currentSettings.linkTextColor}
						onChange={(e) => setSettings({ ...settings, linkTextColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Hover Background Color:</span>
					<input
						id="linkHoverBackgroundColor"
						type="color"
						value={currentSettings.linkHoverBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkHoverBackgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Shadow Color:</span>
					<input
						id="linkShadowColor"
						type="color"
						value={currentSettings.linkShadowColor}
						onChange={(e) => setSettings({ ...settings, linkShadowColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex flex-col space-y-2">
					<span className="py-2 font-medium">Link Border Radius:</span>
					{BORDER_RADIUS_OPTIONS.map((option) => (
						<label key={option.value} className="flex items-center space-x-2">
							<input
								type="radio"
								name="linkBorderRadius"
								value={option.value}
								checked={currentSettings.linkBorderRadius === option.value}
								onChange={(e) => setSettings({ ...settings, linkBorderRadius: e.target.value })}
								className="h-5 w-5"
							/>
							<span>{option.label}</span>
						</label>
					))}
				</div>

				<div className="flex flex-col space-y-2">
					<span className="py-2 font-medium">Link Padding:</span>
					{PADDING_OPTIONS.map((option) => (
						<label key={option.value} className="flex items-center space-x-2">
							<input
								type="radio"
								name="linkPadding"
								value={option.value}
								checked={currentSettings.linkPadding === option.value}
								onChange={(e) => setSettings({ ...settings, linkPadding: e.target.value })}
								className="h-5 w-5"
							/>
							<span>{option.label}</span>
						</label>
					))}
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Header Text Color:</span>
					<input
						id="headerTextColor"
						type="color"
						value={currentSettings.headerTextColor}
						onChange={(e) => setSettings({ ...settings, headerTextColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<button type="submit" className="button bg-primary text-primary-foreground">
					Update Settings
				</button>
			</form>

			<div className="p-4 font-bold">
				{error && <p className="text-destructive">{error}</p>}
				{success && <p className="text-accent">{success}</p>}
			</div>
		</div>
	)
}
