"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"

export default function LinkClickList() {
	const { links: contextLinks, buttons: contextButtons } = useGlobalContext()

	// Combine links and buttons into a single array
	const items = [
		...contextLinks.map((link) => ({ type: "link", ...link })),
		...contextButtons.map((button) => ({ type: "button", ...button })),
	]

	return (
		<div className="w-full space-y-2">
			{items.length > 0 ? (
				<ul className="space-y-2">
					{items.map((item) => (
						<li key={`${item.type}-${item.id}`} className="flex items-center border-b p-2 last:border-b-0">
							<a href={item.url} className="flex w-full items-center gap-4">
								{item.type === "link" ? (
									<div className="flex items-center gap-2">
										<p className="text-lg font-semibold">{item.title}</p>
										<span className="text-sm text-muted-foreground">{item.url}</span>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<p className="text-lg font-semibold">{item.platform}</p>
										<p className="font-medium">{item.title}</p>
										<span className="text-sm text-muted-foreground">{item.url}</span>
									</div>
								)}
								<span className="ml-4 text-sm text-muted-foreground">{item.clicks} clicks</span>
							</a>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No items available</p>
			)}
		</div>
	)
}
