import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { generateSlug } from "./actions"
import { db } from "./db"

declare module "next-auth" {
	interface Session {
		user: DefaultSession["user"] & {
			id: string
			slug: string
			description: string
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
		async signIn({ user, profile }) {
			const existingUser = await db.user.findUnique({
				where: { email: user.email },
			})

			if (!existingUser) {
				const slug = generateSlug(profile?.name ?? user.email ?? "")

				// Create user
				const newUser = await db.user.create({
					data: {
						email: user.email,
						name: profile?.name ?? user.name,
						image: user.image,
						slug,
					},
				})

				// Create default settings for the new user
				await db.userSettings.create({
					data: {
						userId: newUser.id,
						linkBackgroundColor: "#ffffff",
						linkTextColor: "#000000",
						linkHoverBackgroundColor: "#eeeeee",
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
			}
			return session
		},
	},
}
