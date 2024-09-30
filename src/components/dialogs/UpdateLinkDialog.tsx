"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import useDialog from "@/src/hooks/useDialog"
import { handleDialogFormSubmit } from "@/src/lib/actions"
import { useState } from "react"

export default function UpdateLinkDialog({ onClose, linkData }) {
	const { updateLink } = useGlobalContext()
	const [localUrl, setLocalUrl] = useState(linkData.url)
	const [localTitle, setLocalTitle] = useState(linkData.title)
	const { dialogRef, setError } = useDialog(onClose)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		handleDialogFormSubmit({
			contextFn: updateLink,
			formData: { ...linkData, title: localTitle, url: localUrl },
			onClose,
			onError: setError,
		})
	}

	const maxTitleLength = 32
	const isTitleTooLong = localTitle.length > maxTitleLength

	return (
		<div className="fixed inset-0 -top-2 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-xl shadow-lg">
				<h2 className="title">Update Link</h2>
				<hr />

				<form onSubmit={handleSubmit}>
					<div className="my-2 flex flex-col space-y-2">
						<label className="text-sm font-medium">Link Title (Max. {maxTitleLength} characters):</label>
						<input
							type="text"
							value={localTitle}
							onChange={(e) => setLocalTitle(e.target.value)}
							maxLength={maxTitleLength}
							className="form-container"
							required
						/>
						<p className={`text-sm font-bold ${isTitleTooLong ? "text-destructive" : "text-muted-foreground"}`}>
							{isTitleTooLong ? "Title is too long!" : `${localTitle.length} / ${maxTitleLength}`}
						</p>
					</div>

					<div className="my-4 flex flex-col space-y-2">
						<label className="text-sm font-medium">Link URL:</label>
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
						<button type="submit" className="button bg-primary text-primary-foreground" disabled={isTitleTooLong}>
							Update Link
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
