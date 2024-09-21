import { useEffect, useRef, useState } from "react"

const useDialog = (onClose) => {
	const dialogRef = useRef<HTMLDivElement>(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target)) {
				onClose()
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [onClose])

	return { dialogRef, error, setError }
}

export default useDialog
