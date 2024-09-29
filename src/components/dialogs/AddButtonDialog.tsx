"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { SOCIAL_ICONS } from "@/src/data/userSettings"
import useDialog from "@/src/hooks/useDialog"
import { handleDialogFormSubmit } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useState } from "react"

export default function AddButtonDialog({ onClose }) {
	const { dialogRef, error, setError } = useDialog(onClose)
	const { addButton } = useGlobalContext()
	const [selectedPlatform, setSelectedPlatform] = useState(null)
	const [url, setUrl] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		handleDialogFormSubmit({
			contextFn: addButton,
			formData: { platform: selectedPlatform, url, icon: SOCIAL_ICONS[selectedPlatform] },
			onClose,
			onError: setError,
		})
	}

	return (
		<div className="fixed inset-0 -top-2 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-3xl shadow-lg">
				<h2 className="title mb-2">Add Social Button</h2>
				{error && <p className="mb-4 text-destructive">{error}</p>}
				<hr />

				<form onSubmit={handleSubmit} className="flex flex-col">
					<div className="my-2 flex flex-col space-y-2">
						<label className="text-sm font-medium">Select Platform:</label>
						<div className="grid grid-cols-5 gap-2 md:grid-cols-9">
							{Object.entries(SOCIAL_ICONS).map(([platform, icon]) => (
								<div
									key={platform}
									onClick={() => setSelectedPlatform(platform)}
									className={`icon flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 ${selectedPlatform === platform ? "bg-muted" : "bg-transparent"}`}
								>
									<Icon icon={icon} className="text-xl" />
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
