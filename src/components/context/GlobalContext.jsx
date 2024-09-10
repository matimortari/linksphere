"use client"

import { fetchUserButtons, fetchUserData, fetchUserLinks, fetchUserSettings } from "@/src/lib/actions"
import { defaultSettings } from "@/src/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext(null)

export const GlobalContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [slug, setSlug] = useState("")
	const [name, setName] = useState("")
	const [image, setImage] = useState("")
	const [description, setDescription] = useState("")
	const [buttons, setButtons] = useState([]) // Social buttons state
	const [links, setLinks] = useState([])
	const [settings, setSettings] = useState(defaultSettings)
	const [error, setError] = useState(null)

	// State for managing form inputs
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const userData = await fetchUserData()
				const { slug, description = "", name = "", image = "" } = userData
				setSlug(slug)
				setDescription(description)
				setName(name)
				setImage(image)
				setUser(userData)

				// Fetch links and buttons
				setLinks(await fetchUserLinks(slug))
				setButtons(await fetchUserButtons(slug)) // Fetch social buttons

				setSettings((await fetchUserSettings()) || defaultSettings)
			} catch (error) {
				console.error("Error loading user data:", error)
				setError("Failed to load user data.")
			}
		}

		loadUserData()
	}, [])

	const addLink = async (newLink) => {
		try {
			const response = await fetch("/api/links", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newLink),
			})

			if (response.ok) {
				const link = await response.json()
				setLinks((prevLinks) => [...prevLinks, link])
			} else {
				const error = await response.json()
				throw new Error(error.error)
			}
		} catch (error) {
			console.error("Error adding link:", error)
			setError("Failed to add link.")
		}
	}

	const updateLink = async (updatedLink) => {
		try {
			const response = await fetch("/api/links", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedLink),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.error)
			}

			const link = await response.json()
			setLinks((prevLinks) => prevLinks.map((l) => (l.id === updatedLink.id ? link : l)))
		} catch (error) {
			console.error("Error updating link:", error)
			setError("Failed to update link.")
		}
	}

	const deleteLink = async (id) => {
		try {
			const response = await fetch(`/api/links?id=${id}`, { method: "DELETE" })

			if (response.status === 204) {
				setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id))
			} else {
				const error = await response.json()
				throw new Error(error.error)
			}
		} catch (error) {
			console.error("Error deleting link:", error)
			setError("Failed to delete link.")
		}
	}

	const addButton = async (newButton) => {
		try {
			const response = await fetch("/api/buttons", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newButton),
			})

			if (response.ok) {
				const button = await response.json()
				setButtons((prevButtons) => [...prevButtons, button])
			} else {
				const error = await response.json()
				throw new Error(error.error)
			}
		} catch (error) {
			console.error("Error adding button:", error)
			setError("Failed to add button.")
		}
	}

	const updateButton = async (updatedButton) => {
		try {
			const response = await fetch("/api/buttons", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedButton),
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.error)
			}

			const button = await response.json()
			setButtons((prevButtons) => prevButtons.map((b) => (b.id === updatedButton.id ? button : b)))
		} catch (error) {
			console.error("Error updating button:", error)
			setError("Failed to update button.")
		}
	}

	const deleteButton = async (id) => {
		try {
			const response = await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })

			if (response.status === 204) {
				setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id))
			} else {
				const error = await response.json()
				throw new Error(error.error)
			}
		} catch (error) {
			console.error("Error deleting button:", error)
			setError("Failed to delete button.")
		}
	}

	const updateSettings = async (newSettings) => {
		try {
			const response = await fetch("/api/preferences", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newSettings),
			})

			if (response.ok) {
				const updatedSettings = await response.json()
				setSettings(updatedSettings)
			} else {
				const error = await response.json()
				throw new Error(error.error)
			}
		} catch (error) {
			console.error("Error updating settings:", error)
			setError("Failed to update settings.")
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				slug,
				setSlug,
				name,
				setName,
				image,
				setImage,
				description,
				setDescription,
				links,
				setLinks,
				buttons,
				setButtons,
				settings,
				setSettings,
				updateSettings,
				addLink,
				updateLink,
				deleteLink,
				addButton,
				updateButton,
				deleteButton,
				title,
				setTitle,
				url,
				setUrl,
				error,
			}}
		>
			{children}
			<Analytics />
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
