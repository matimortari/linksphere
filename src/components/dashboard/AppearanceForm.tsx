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
					throw new Error(data.error || "Failed to fetch settings")
				}

				if (data.settings) {
					setSettings(data.settings)
				} else {
					throw new Error("Settings data is missing")
				}
			} catch (error) {
				setError((error as Error).message)
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
				throw new Error(data.error || "Failed to update settings")
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
					<span className="py-2 font-medium">Link Background Color:</span>
					<input
						id="linkBackgroundColor"
						type="color"
						value={settings.linkBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkBackgroundColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Text Color:</span>
					<input
						id="linkTextColor"
						type="color"
						value={settings.linkTextColor}
						onChange={(e) => setSettings({ ...settings, linkTextColor: e.target.value })}
						className="h-8 w-16 rounded-lg border border-muted"
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Hover Background Color:</span>
					<input
						id="linkHoverBackgroundColor"
						type="color"
						value={settings.linkHoverBackgroundColor}
						onChange={(e) => setSettings({ ...settings, linkHoverBackgroundColor: e.target.value })}
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
