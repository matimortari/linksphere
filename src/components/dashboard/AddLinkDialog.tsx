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
			// Assuming there's an API route for adding a link
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

			// Clear the form
			setTitle("")
			setUrl("")
			setError(null)
			onClose() // Close the dialog after successful submission
		} catch (err) {
			setError("An error occurred while adding the link.")
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="rounded-lg bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-xl font-semibold">Add New Link</h2>

				{error && <p className="mb-4 text-red-500">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">URL</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							required
						/>
					</div>

					<div className="flex justify-end gap-2">
						<button type="button" className="button bg-gray-300 text-gray-700" onClick={onClose}>
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
