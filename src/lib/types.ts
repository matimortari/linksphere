// Account model type definition
export interface Account {
	id: string
	userId: string
	type: string
	provider: string
	providerAccountId: string
	refresh_token?: string
	access_token?: string
	expires_at?: number
	token_type?: string
	scope?: string
	id_token?: string
	session_state?: string
	user?: User // Optional relation to User
}

// Session model type definition
export interface Session {
	id: string
	sessionToken: string
	userId: string
	expires: Date
	user?: User // Optional relation to User
}

// User model type definition
export interface User {
	id: string
	name?: string
	email?: string
	emailVerified?: Date
	image?: string
	description?: string
	slug: string
	pubic?: boolean
	accounts?: Account[] // Optional relation to Account
	sessions?: Session[] // Optional relation to Session
	Link?: UserLink[] // Optional relation to UserLink
}

// UserLink model type definition
export interface UserLink {
	id: number
	url: string
	title: string
	userId: string
	createdAt: Date
	updatedAt: Date
	user?: User // Optional relation to User
}

// Type definitions for creating or updating entities
export interface CreateUserInput {
	name?: string
	email?: string
	emailVerified?: Date
	image?: string
	description?: string
	slug: string
	pubic?: boolean
}

export interface UpdateUserInput {
	name?: string
	email?: string
	emailVerified?: Date
	image?: string
	description?: string
	slug: string
	pubic?: boolean
}

export interface CreateUserLinkInput {
	url: string
	title: string
	userId: string
}

export interface UpdateUserLinkInput {
	url?: string
	title?: string
	userId?: string
}
