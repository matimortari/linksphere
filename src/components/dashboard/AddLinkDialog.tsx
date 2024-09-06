"use client"

import { useState } from "react"

export default function AddLinkDialog({ onClose }: { onClose: () => void }) {
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!title || !url) {
			setError("Both title and URL are required.")
			return
		}

		try {
			const response = await fetch("/api/links", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, url }),
			})

			if (!response.ok) {
				throw new Error("Failed to add link")
			}

			setTitle("")
			setUrl("")
			setError(null)
			onClose()
		} catch (err) {
			setError("An error occurred while adding the link.")
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="content-container bg-background shadow-lg">
				<h2 className="mb-4 text-2xl font-semibold">Add New Link</h2>

				{error && <p className="mb-4 text-destructive">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="my-2">
						<label className="text-lg font-semibold text-foreground">Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="form-container my-2 block w-full"
							required
						/>
					</div>

					<div className="my-2">
						<label className="text-lg font-semibold text-foreground">URL</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="form-container my-2 block w-full"
							required
						/>
					</div>

					<div className="flex justify-end gap-2">
						<button type="button" className="button bg-destructive text-destructive-foreground" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="button bg-accent text-accent-foreground">
							Add Link
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
