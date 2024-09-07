"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { useEffect, useRef, useState } from "react"

export default function UpdateLinkDialog({ onClose, onUpdateLink, linkData }) {
	const { updateLink } = useGlobalContext()
	const [localTitle, setLocalTitle] = useState(linkData.title || "")
	const [localUrl, setLocalUrl] = useState(linkData.url || "")
	const [error, setError] = useState(null)
	const dialogRef = useRef(null)

	useEffect(() => {
		// Initialize local state when linkData changes
		setLocalTitle(linkData.title || "")
		setLocalUrl(linkData.url || "")

		const handleClickOutside = (event: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [linkData, onClose])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!localTitle || !localUrl) {
			setError("Both title and URL are required.")
			return
		}

		try {
			const updatedLink = { ...linkData, title: localTitle, url: localUrl }
			await updateLink(updatedLink)

			setLocalTitle("") // Clear title after update
			setLocalUrl("") // Clear URL after update
			setError(null)
			onUpdateLink(updatedLink)
			onClose()
		} catch (error) {
			setError("An error occurred while updating the link.")
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="w-full max-w-sm rounded-lg bg-background p-8 shadow-lg">
				<h2 className="mb-4 text-xl font-semibold">Update Link</h2>

				{error && <p className="mb-4 text-red-600">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">Title:</label>
						<input
							type="text"
							value={localTitle}
							onChange={(e) => setLocalTitle(e.target.value)}
							className="form-container"
							required
						/>
					</div>

					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">URL:</label>
						<input
							type="url"
							value={localUrl}
							onChange={(e) => setLocalUrl(e.target.value)}
							className="form-container"
							required
						/>
					</div>

					<div className="button-container justify-end">
						<button type="button" className="button bg-destructive text-destructive-foreground" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="button bg-primary text-primary-foreground">
							Update Link
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
