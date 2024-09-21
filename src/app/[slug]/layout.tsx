import { GlobalContextProvider } from "@/src/components/context/GlobalContext"
import Providers from "@/src/components/context/Providers"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "neSS",
	description: "Social media & link aggregator",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers session={session}>
					<GlobalContextProvider>{children}</GlobalContextProvider>
				</Providers>
			</body>
		</html>
	)
}
