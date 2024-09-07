import { User, UserLink } from "@prisma/client"

export interface UserSettings {
	linkBackgroundColor: string
	linkTextColor: string
	linkHoverBackgroundColor: string
}

export interface GlobalContextProps {
	slug: string
	description: string
	links: UserLink[]
	setSlug: React.Dispatch<React.SetStateAction<string>>
	setDescription: React.Dispatch<React.SetStateAction<string>>
	setLinks: React.Dispatch<React.SetStateAction<UserLink[]>>
	name: string
	image: string
	setName: React.Dispatch<React.SetStateAction<string>>
	setImage: React.Dispatch<React.SetStateAction<string>>
	settings: UserSettings
	setSettings: React.Dispatch<React.SetStateAction<UserSettings>>
	updateLink: (updatedLink: UserLink) => Promise<void>
	deleteLink: (id: number) => Promise<void>
	addLink: (newLink: { title: string; url: string }) => Promise<void>
	user: User | null
	loading: boolean
	setUser: React.Dispatch<React.SetStateAction<User | null>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UpdateLinkDialogProps {
	onClose: () => void
	onUpdateLink: (updatedLink: UserLink) => void
	linkData: UserLink
}

export interface AddLinkDialogProps {
	onClose: () => void
	onAddLink: (newLink: { id: string; title: string; url: string }) => void
}

export interface PreviewProps {
	slug: string
}

export interface LinkListProps {
	onUpdateLink: (updatedLink: UserLink) => void
	onDeleteLink: (id: number) => void
}
