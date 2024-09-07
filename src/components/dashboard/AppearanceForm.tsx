"use client"

import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

const BORDER_RADIUS_OPTIONS = [
	{ label: "Small", value: "4px" },
	{ label: "Medium", value: "8px" },
	{ label: "Large", value: "12px" },
	{ label: "Extra Large", value: "16px" },
]

const PADDING_OPTIONS = [
	{ label: "Small", value: "4px" },
	{ label: "Medium", value: "8px" },
	{ label: "Large", value: "12px" },
	{ label: "Extra Large", value: "16px" },
]

const defaultSettings = {
	linkBackgroundColor: "#ffffff",
	linkTextColor: "#000000",
	linkHoverBackgroundColor: "#eeeeee",
	shadowColor: "#000000",
	linkBorderRadius: "8px",
	linkPadding: "8px",
	headerTextColor: "#000000",
	backgroundColor: "#ffffff",
}

export default function AppearanceForm() {
	const { settings, setSettings } = useGlobalContext()
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(true)

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
					setSettings(defaultSettings) // Set default if no settings are fetched
					throw new Error("Settings data is missing")
				}
			} catch (error) {
				setError((error as Error).message)
				setSettings(defaultSettings) // Ensure settings have default values
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

	return (
		<div className="content-container shadow-lg">
			<form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col space-y-4">
				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Background Color:</span>
					<input
						id="backgroundColor"
						type="color"
						value={settings.backgroundColor || defaultSettings.backgroundColor}
						onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Background Color:</span>
					<input
						id="linkBackgroundColor"
						type="color"
						value={settings.linkBackgroundColor || defaultSettings.linkBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkBackgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Text Color:</span>
					<input
						id="linkTextColor"
						type="color"
						value={settings.linkTextColor || defaultSettings.linkTextColor}
						onChange={(e) => setSettings({ ...settings, linkTextColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Hover Background Color:</span>
					<input
						id="linkHoverBackgroundColor"
						type="color"
						value={settings.linkHoverBackgroundColor || defaultSettings.linkHoverBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkHoverBackgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Shadow Color:</span>
					<input
						id="shadowColor"
						type="color"
						value={settings.shadowColor || defaultSettings.shadowColor}
						onChange={(e) => setSettings({ ...settings, shadowColor: e.target.value })}
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
								checked={settings.linkBorderRadius === option.value}
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
								checked={settings.linkPadding === option.value}
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
						value={settings.headerTextColor || defaultSettings.headerTextColor}
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
