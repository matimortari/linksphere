"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import useDialog from "@/src/hooks/useDialog"
import { handleDialogFormSubmit } from "@/src/lib/actions"
import { useState } from "react"

export default function UpdateLinkDialog({ onClose, linkData }) {
	const { dialogRef, error, setError } = useDialog(onClose)
	const { updateLink } = useGlobalContext()
	const [localTitle, setLocalTitle] = useState(linkData.title)
	const [localUrl, setLocalUrl] = useState(linkData.url)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		handleDialogFormSubmit({
			contextFn: updateLink,
			formData: { ...linkData, title: localTitle, url: localUrl },
			onClose,
			onError: setError,
		})
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-xl shadow-lg">
				<h2 className="title">Update Link</h2>
				{error && <p className="title text-destructive">{error}</p>}
				<hr />

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
