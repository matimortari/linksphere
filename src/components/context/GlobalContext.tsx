"use client"

import { GlobalContextProps, UserSettings } from "@/src/lib/types"
import { User, UserLink } from "@prisma/client"
import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

const fetchUserData = async () => {
	try {
		const response = await fetch("/api/user")
		if (!response.ok) throw new Error("Failed to fetch user data")
		return await response.json()
	} catch (error) {
		console.error("Error fetching user data:", error)
		throw error
	}
}

const fetchUserLinks = async (slug: string): Promise<UserLink[]> => {
	try {
		const response = await fetch(`/api/links?slug=${slug}`)
		if (!response.ok) throw new Error("Failed to fetch links")
		return await response.json()
	} catch (error) {
		console.error("Error fetching user links:", error)
		throw error
	}
}

const fetchUserSettings = async () => {
	try {
		const response = await fetch(`/api/preferences`)
		if (!response.ok) {
			const data = await response.json()
			throw new Error(data.error || "Failed to fetch settings")
		}
		const data = await response.json()
		return (
			data.settings || {
				linkBackgroundColor: "#ffffff",
				linkTextColor: "#000000",
				linkHoverBackgroundColor: "#eeeeee",
			}
		)
	} catch (error) {
		console.error("Error fetching user settings:", error)
		return {
			linkBackgroundColor: "#ffffff",
			linkTextColor: "#000000",
			linkHoverBackgroundColor: "#eeeeee",
		}
	}
}

export const GlobalContextProvider = ({ children }) => {
	const [slug, setSlug] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [image, setImage] = useState<string>("")
	const [links, setLinks] = useState<UserLink[]>([])
	const [settings, setSettings] = useState<UserSettings>({
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
	})

	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const userData = await fetchUserData()
				setSlug(userData.slug)
				setDescription(userData.description || "")
				setName(userData.name || "")
				setImage(userData.image || "")

				const linksData = await fetchUserLinks(userData.slug)
				setLinks(linksData)

				const settingsData = await fetchUserSettings()
				setSettings(settingsData)

				setUser(userData)
			} catch (error) {
				console.error("Error loading user data:", error)
			} finally {
				setLoading(false)
			}
		}

		loadUserData()
	}, [])

	const updateLink = async (updatedLink: UserLink) => {
		try {
			const response = await fetch(`/api/links`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedLink),
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(message || "Failed to update link")
			}

			setLinks((prevLinks) => prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
		} catch (error) {
			console.error("Error updating link:", error)
		}
	}

	const deleteLink = async (id: number) => {
		try {
			const response = await fetch(`/api/links?id=${id}`, {
				method: "DELETE",
			})

			if (response.status === 204) {
				// Handle 204 No Content response
				setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id))
			} else if (!response.ok) {
				const errorResponse = await response.json()
				throw new Error(errorResponse.error || "Failed to delete link")
			}
		} catch (error) {
			console.error("Error deleting link:", error)
		}
	}

	const addLink = async (newLink: { title: string; url: string }) => {
		try {
			const response = await fetch("/api/links", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newLink),
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(message || "Failed to add link")
			}

			const link = await response.json()
			setLinks((prevLinks) => [...prevLinks, link])
		} catch (error) {
			console.error("Error adding link:", error)
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				slug,
				description,
				links,
				setSlug,
				setDescription,
				setLinks,
				name,
				image,
				setName,
				setImage,
				settings,
				setSettings,
				updateLink,
				deleteLink,
				addLink,
				user,
				loading,
				setUser,
				setLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => {
	const context = useContext(GlobalContext)
	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalContextProvider")
	}
	return context
}
