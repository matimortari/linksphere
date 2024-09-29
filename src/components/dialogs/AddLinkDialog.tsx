"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import useDialog from "@/src/hooks/useDialog"
import { handleDialogFormSubmit } from "@/src/lib/actions"
import { useState } from "react"

export default function AddLinkDialog({ onClose }) {
	const { dialogRef, error, setError } = useDialog(onClose)
	const { addLink } = useGlobalContext()
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		handleDialogFormSubmit({
			contextFn: addLink,
			formData: { title, url },
			onClose,
			onError: setError,
		})
	}

	const maxTitleLength = 32
	const isTitleTooLong = title.length > maxTitleLength

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-xl shadow-lg">
				<h2 className="title">Add New Link</h2>
				<hr />

				<form onSubmit={handleSubmit}>
					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">Link Title (Max. {maxTitleLength} characters):</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength={maxTitleLength}
							className="form-container"
							required
						/>
						<p className={`text-sm font-bold ${isTitleTooLong ? "text-destructive" : "text-muted-foreground"}`}>
							{isTitleTooLong ? "Title is too long!" : `${title.length} / ${maxTitleLength}`}
						</p>
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
						<button type="submit" className="button bg-primary text-primary-foreground" disabled={isTitleTooLong}>
							Add Link
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
