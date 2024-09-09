import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { UserLink } from "@prisma/client"
import { DefaultSession, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { db } from "./db"
import { defaultSettings, generateSlug } from "./utils"

// Extend the default session with custom properties
declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			id: string
			slug: string
			description: string
			links: UserLink[]
			settings: typeof defaultSettings
		}
	}
}

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(db),
	session: {
		strategy: "database" as SessionStrategy,
	},
	callbacks: {
		async signIn({ user, account, profile, email }) {
			const existingUser = await db.user.findUnique({
				where: { email: user.email },
			})
			if (!existingUser) {
				const slug = generateSlug(profile?.name ?? user.email ?? "")
				const newUser = await db.user.create({
					data: {
						email: user.email,
						name: profile?.name ?? user.name,
						image: user.image,
						slug,
					},
				})
				await db.userSettings.create({
					data: {
						userId: newUser.id,
						...defaultSettings,
					},
				})
			} else {
				await db.user.update({
					where: { email: user.email },
					data: {
						image: user.image,
						name: profile?.name ?? existingUser.name,
					},
				})
			}
			return true
		},

		async session({ session, user }) {
			session.user.id = user.id
			const dbUser = await db.user.findUnique({ where: { id: user.id } })
			if (dbUser) {
				session.user.slug = dbUser.slug
				session.user.description = dbUser.description
				const links = await db.userLink.findMany({
					where: { userId: dbUser.id },
				})
				session.user.links = links
				const settings = await db.userSettings.findUnique({
					where: { userId: dbUser.id },
				})
				session.user.settings = settings || defaultSettings
			}
			return session
		},
	},
}
