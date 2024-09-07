import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { UpdateLinkDialogProps } from "@/src/lib/types"
import { useEffect, useRef, useState } from "react"

export default function UpdateLinkDialog({ onClose, onUpdateLink, linkData }: UpdateLinkDialogProps) {
	const { updateLink } = useGlobalContext()

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
			const updatedLink = { ...linkData, title, url }
			await updateLink(updatedLink)

			setTitle("")
			setUrl("")
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
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="rounded border border-gray-300 bg-gray-100 p-2"
							required
						/>
					</div>

					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">URL:</label>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="rounded border border-gray-300 bg-gray-100 p-2"
							required
						/>
					</div>

					<div className="mt-4 flex justify-end space-x-2">
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
