import { useEffect, useState } from "react"

export default function AppearanceForm() {
	const [settings, setSettings] = useState({
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
	})
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(true)

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
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")
		setSuccess("")
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
						className="h-8 w-16 rounded-lg border border-muted"
						readOnly
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Text Color:</span>
					<input
						id="linkTextColor"
						type="color"
						value={settings.linkTextColor}
						className="h-8 w-16 rounded-lg border border-muted"
						readOnly
					/>
				</div>

				<div className="flex items-center space-x-2">
					<span className="py-2 font-medium">Link Hover Background Color:</span>
					<input
						id="linkHoverBackgroundColor"
						type="color"
						value={settings.linkHoverBackgroundColor}
						className="h-8 w-16 rounded-lg border border-muted"
						readOnly
					/>
				</div>

				<button type="submit" className="button bg-accent text-accent-foreground">
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
