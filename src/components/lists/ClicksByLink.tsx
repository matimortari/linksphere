"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { links: contextLinks, buttons: contextButtons } = useGlobalContext()

	const items = [
		...contextLinks.map((link) => ({ type: "link", ...link })),
		...contextButtons.map((button) => ({ type: "button", ...button })),
	]

	const LinkItem = ({ item }) => (
		<a href={item.url} className="flex w-full flex-col items-start">
			<div className="flex w-full flex-col items-start gap-1 px-2">
				<p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">{item.title}</p>
				<span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
					{item.url}
				</span>
				<span className="text-sm text-muted-foreground">Created at {formatDate(item.createdAt)}</span>
				<span className="text-sm font-medium">{item.clicks} clicks</span>
			</div>
		</a>
	)

	const ButtonItem = ({ item }) => (
		<a href={item.url} className="flex w-full flex-col items-start">
			<div className="flex w-full flex-col items-start gap-1 px-2">
				<div className="flex flex-row items-center gap-2">
					{item.icon && <Icon icon={item.icon} className="h-5 w-5" />}
					<p className="text-lg font-semibold">{item.platform}</p>
				</div>
				<p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium">{item.title}</p>
				<span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
					{item.url}
				</span>
				<span className="text-sm text-muted-foreground">Created at {formatDate(item.createdAt)}</span>
				<span className="text-sm font-medium">{item.clicks} clicks</span>
			</div>
		</a>
	)

	return (
		<div className="w-full">
			{items.length > 0 ? (
				<ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{items.map((item) => (
						<li key={`${item.type}-${item.id}`} className="link-list-item flex-col">
							{item.type === "link" ? <LinkItem item={item} /> : <ButtonItem item={item} />}
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links yet.</p>
			)}
		</div>
	)
}
