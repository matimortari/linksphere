"use client"

import {
	addButton,
	addLink,
	deleteButton,
	deleteLink,
	fetchUserButtons,
	fetchUserData,
	fetchUserLinks,
	fetchUserSettings,
	updateLink,
	updateSettings,
} from "@/src/lib/actions"
import { defaultSettings } from "@/src/lib/userSettings"
import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext(null)

export const GlobalContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [slug, setSlug] = useState("")
	const [name, setName] = useState("")
	const [image, setImage] = useState("")
	const [description, setDescription] = useState("")
	const [links, setLinks] = useState([])
	const [buttons, setButtons] = useState([])
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")
	const [settings, setSettings] = useState(defaultSettings)

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
				setButtons(await fetchUserButtons(slug))
				setSettings((await fetchUserSettings()) || defaultSettings)
			} catch (error) {
				console.error("Error loading user data:", error)
			}
		}

		loadUserData()
	}, [])

	const handleAddLink = async (newLink) => {
		try {
			const link = await addLink(newLink)
			setLinks((prevLinks) => [...prevLinks, link])
		} catch (error) {
			console.error("Error adding link:", error)
		}
	}

	const handleUpdateLink = async (updatedLink) => {
		try {
			const link = await updateLink(updatedLink)
			setLinks((prevLinks) => prevLinks.map((l) => (l.id === updatedLink.id ? link : l)))
		} catch (error) {
			console.error("Error updating link:", error)
		}
	}

	const handleDeleteLink = async (id) => {
		try {
			await deleteLink(id)
			setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id))
		} catch (error) {
			console.error("Error deleting link:", error)
		}
	}

	const handleAddButton = async (newButton) => {
		try {
			const button = await addButton(newButton)
			setButtons((prevButtons) => [...prevButtons, button])
		} catch (error) {
			console.error("Error adding button:", error)
		}
	}

	const handleDeleteButton = async (id) => {
		try {
			await deleteButton(id)
			setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id))
		} catch (error) {
			console.error("Error deleting button:", error)
		}
	}

	const handleUpdateSettings = async (newSettings) => {
		try {
			const updatedSettings = await updateSettings(newSettings)
			setSettings(updatedSettings)
		} catch (error) {
			console.error("Error updating settings:", error)
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
				buttons,
				setButtons,
				links,
				setLinks,
				settings,
				setSettings,
				updateSettings: handleUpdateSettings,
				addLink: handleAddLink,
				updateLink: handleUpdateLink,
				deleteLink: handleDeleteLink,
				addButton: handleAddButton,
				deleteButton: handleDeleteButton,
				title,
				setTitle,
				url,
				setUrl,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
