import Providers from "@/src/components/Providers"
import { authOptions } from "@/src/lib/auth"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import Footer from "../components/Footer"
import TopNav from "../components/TopNav"
import "./globals.css"

export const metadata: Metadata = {
	title: "neSS",
	description: "Social media & link aggregator",
}

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" className={inter.className}>
			<body>
				<Providers session={session}>
					<Analytics />
					<TopNav />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
