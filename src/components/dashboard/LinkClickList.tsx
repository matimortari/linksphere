"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"

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
						<li
							key={`${item.type}-${item.id}`}
							className="flex flex-col items-center rounded-2xl border border-muted p-2 sm:flex-row"
						>
							<a href={item.url} className="flex w-full flex-col items-start sm:flex-row">
								{item.type === "link" ? (
									<div className="flex w-full flex-col items-start sm:flex-row md:items-center md:gap-2 md:space-x-4">
										<p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold sm:text-base">
											{item.title}
										</p>
										<span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
											{item.url}
										</span>
										<span className="text-sm text-muted-foreground">{item.clicks} clicks</span>
									</div>
								) : (
									<div className="flex w-full flex-col items-start sm:flex-row md:items-center md:space-x-4">
										<div className="flex flex-row items-center gap-2">
											<a href={item.url}>{item.icon && <Icon icon={item.icon} className="h-5 w-5" />}</a>
											<p className="text-lg font-semibold sm:text-base">{item.platform}</p>
										</div>
										<p className="font-medium">{item.title}</p>
										<span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
											{item.url}
										</span>
										<span className="text-sm text-muted-foreground">{item.clicks} clicks</span>
									</div>
								)}
							</a>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links yet.</p>
			)}
		</div>
	)
}
