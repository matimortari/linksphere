"use client"

import { fetchUserData, fetchUserLinks, fetchUserSettings } from "@/src/lib/actions"
import { Analytics } from "@vercel/analytics/react"
import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext(null)

export const GlobalContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [slug, setSlug] = useState("")
	const [name, setName] = useState("")
	const [image, setImage] = useState("")
	const [description, setDescription] = useState("")
	const [links, setLinks] = useState([])
	const [settings, setSettings] = useState({
		linkBackgroundColor: "#ffffff",
		linkTextColor: "#000000",
		linkHoverBackgroundColor: "#eeeeee",
	})

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
				setLinks(await fetchUserLinks(slug))
				setSettings(await fetchUserSettings())
			} catch (error) {
				console.error("Error loading user data:", error)
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
				setUser,
			}}
		>
			{children}
			<Analytics />
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
