import { useEffect, useState } from "react"

const useIsHomePage = () => {
	const [isHomePage, setIsHomePage] = useState(true)

	useEffect(() => {
		const handleRouteChange = (url) => {
			setIsHomePage(url === "/")
		}

		const handlePopState = () => {
			handleRouteChange(window.location.pathname)
		}

		// Set initial state
		handleRouteChange(window.location.pathname)

		// Add event listener for route changes
		window.addEventListener("popstate", handlePopState)

		// Clean up event listener
		return () => {
			window.removeEventListener("popstate", handlePopState)
		}
	}, [])

	return isHomePage
}

export default useIsHomePage
