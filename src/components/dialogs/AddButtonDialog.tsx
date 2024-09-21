"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { SOCIAL_ICONS } from "@/src/lib/userSettings"
import { Icon } from "@iconify/react"
import { useEffect, useRef, useState } from "react"

export default function AddButtonDialog({ onClose }) {
	const { addButton } = useGlobalContext()
	const [selectedPlatform, setSelectedPlatform] = useState(null)
	const [url, setUrl] = useState("")
	const [error, setError] = useState(null)
	const dialogRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [onClose])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!selectedPlatform || !url) {
			setError("Both platform and URL are required.")
			return
		}

		try {
			await addButton({ platform: selectedPlatform, url, icon: SOCIAL_ICONS[selectedPlatform] })
			setSelectedPlatform(null)
			setUrl("")
			setError(null)
			onClose()
		} catch (err) {
			console.error("Error adding button:", err)
			setError("An error occurred while adding the social button.")
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-3xl shadow-lg">
				<h2 className="title mb-2">Add Social Button</h2>
				<hr />

				{error && <p className="mb-4 text-destructive">{error}</p>}

				<form onSubmit={handleSubmit} className="flex flex-col space-y-2">
					<div className="my-4 flex flex-col space-y-4">
						<label className="text-sm font-medium">Select Platform:</label>
						<div className="my-4 grid grid-cols-9 gap-4">
							{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
								<div
									key={platform}
									onClick={() => setSelectedPlatform(platform)}
									className={`icon flex cursor-pointer flex-col items-center justify-center rounded-lg border ${selectedPlatform === platform ? "border-primary" : "border-transparent"}`}
								>
									<Icon icon={icon} className="text-2xl" />
									<p className="mt-1 text-center text-xs">{platform.charAt(0).toUpperCase() + platform.slice(1)}</p>
								</div>
							))}
						</div>
					</div>

					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">URL:</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="form-container"
							required
						/>
					</div>

					<div className="button-container justify-end">
						<button type="button" className="button bg-destructive text-destructive-foreground" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="button bg-primary text-primary-foreground">
							Add Button
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
