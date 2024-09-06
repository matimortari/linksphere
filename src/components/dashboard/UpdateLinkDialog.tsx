"use client"

import { useEffect, useRef, useState } from "react"

export default function UpdateLinkDialog({
	onClose,
	onUpdateLink,
	linkData,
}: {
	onClose: () => void
	onUpdateLink: (link: { id: number; title: string; url: string }) => void
	linkData: { id: number; title: string; url: string }
}) {
	const [title, setTitle] = useState(linkData.title)
	const [url, setUrl] = useState(linkData.url)
	const [error, setError] = useState<string | null>(null)
	const dialogRef = useRef<HTMLDivElement>(null)

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

		if (!title || !url) {
			setError("Both title and URL are required.")
			return
		}

		try {
			const response = await fetch(`/api/links`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: linkData.id, title, url }),
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(message || "Failed to update link")
			}

			const updatedLink = await response.json()
			setTitle("")
			setUrl("")
			setError(null)
			onUpdateLink(updatedLink) // Update the global context with the updated link
			onClose()
		} catch (err) {
			setError("An error occurred while updating the link.")
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="rounded-lg bg-background p-16 shadow-lg">
				<h2 className="title">Update Link</h2>

				{error && <p className="mb-4 text-destructive">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="my-8 flex items-center space-x-2">
						<label className="subtitle">Title:</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="form-container bg-transparent"
							required
						/>
					</div>

					<div className="my-8 flex items-center space-x-2">
						<label className="subtitle">URL:</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="form-container bg-transparent"
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
