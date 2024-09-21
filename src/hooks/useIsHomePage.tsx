import { useEffect, useState } from "react"

const useIsHomePage = () => {
	const [isHomePage, setIsHomePage] = useState(true)

	useEffect(() => {
		const handleRouteChange = () => {
			setIsHomePage(window.location.pathname === "/")
		}

		handleRouteChange()
		window.addEventListener("popstate", handleRouteChange)

		return () => {
			window.removeEventListener("popstate", handleRouteChange)
		}
	}, [])

	return isHomePage
}

export default useIsHomePage
