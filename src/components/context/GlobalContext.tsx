"use client"

import { UserLink } from "@prisma/client"
import React, { createContext, useContext, useState } from "react"

interface GlobalContextType {
	slug: string
	description: string
	links: UserLink[]
	setSlug: React.Dispatch<React.SetStateAction<string>>
	setDescription: React.Dispatch<React.SetStateAction<string>>
	setLinks: React.Dispatch<React.SetStateAction<UserLink[]>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const useGlobalContext = () => {
	const context = useContext(GlobalContext)
	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalContextProvider")
	}
	return context
}

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [slug, setSlug] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [links, setLinks] = useState<UserLink[]>([])

	return (
		<GlobalContext.Provider value={{ slug, description, links, setSlug, setDescription, setLinks }}>
			{children}
		</GlobalContext.Provider>
	)
}
