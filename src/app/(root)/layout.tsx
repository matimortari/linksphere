import { GlobalContextProvider } from "@/src/components/context/GlobalContext"
import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import Navbar from "@/src/components/Navbar"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	const metadata: Metadata = {
		title: "neSS",
		description: "Social media & link aggregator",
	}

	return (
		<html lang="en">
			<head>
				<title>{String(metadata.title)}</title>
				<meta name="description" content={metadata.description} />
			</head>

			<body className={inter.className}>
				<Providers session={session}>
					<GlobalContextProvider>
						<Navbar />
						<div className="p-2 md:p-8">{children}</div>
						<Footer />
					</GlobalContextProvider>
				</Providers>
			</body>
		</html>
	)
}
