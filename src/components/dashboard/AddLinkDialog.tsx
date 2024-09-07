"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { useEffect, useRef, useState } from "react"

export default function AddLinkDialog({ onClose }) {
	const { addLink } = useGlobalContext()
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")
	const [error, setError] = useState(null)
	const dialogRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target)) {
				onClose()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [onClose])

	const handleSubmit = async (e) => {
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
							className="rounded-lg border border-muted bg-transparent p-2"
							required
						/>
					</div>

					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">URL:</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="rounded-lg border border-muted bg-transparent p-2"
							required
						/>
					</div>

					<div className="mt-4 flex justify-end space-x-2">
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
