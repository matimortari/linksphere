"use client"

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"

const queryClient = isServer
	? new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })
	: new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } })

export default function Providers({ children, session }: { children: React.ReactNode; session: any }) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	)
}
