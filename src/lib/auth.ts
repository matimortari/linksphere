import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { DefaultSession, SessionStrategy } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./db"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string
		} & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string
	}
}

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? "",
			clientSecret: process.env.GOOGLE_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "database" as SessionStrategy,
	},
	callbacks: {
		async session({ session, user }) {
			if (user) {
				session.user = { ...user } // Copy user data to session
			}
			return session
		},

		async jwt({ token, user }) {
			if (user) {
				token = { ...user } // Copy user data to token
			} else {
				const dbUser = await prisma.user.findFirst({
					where: { email: token.email },
				})
				if (dbUser) {
					token = { ...dbUser } // Copy dbUser data to token
				}
			}
			return token
		},
	},
}
