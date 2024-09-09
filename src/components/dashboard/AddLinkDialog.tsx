"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { useEffect, useRef, useState } from "react"

export default function AddLinkDialog({ onClose }) {
	const { addLink, title, setTitle, url, setUrl } = useGlobalContext()
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

		if (!title || !url) {
			setError("Both title and URL are required.")
			return
		}

		try {
			await addLink({ title, url })
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
			<div ref={dialogRef} className="w-full max-w-sm rounded-lg bg-background p-8 shadow-lg">
				<h2 className="mb-4 text-xl font-semibold">Add New Link</h2>

				{error && <p className="mb-4 text-destructive">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">Title:</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="form-container"
							required
						/>
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
							Add Link
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
