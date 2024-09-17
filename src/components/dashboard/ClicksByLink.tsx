"use client"

import { useGlobalContext } from "@/src/components/context/GlobalContext"
import { Icon } from "@iconify/react"

export default function ClicksByLink() {
	const { links: contextLinks, buttons: contextButtons } = useGlobalContext()

	const items = [
		...contextLinks.map((link) => ({ type: "link", ...link })),
		...contextButtons.map((button) => ({ type: "button", ...button })),
	]

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const formattedDate = date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})

		return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
	}

	const LinkItem = ({ item }) => (
		<a href={item.url} className="flex w-full flex-col items-start">
			<div className="flex w-full flex-col items-start gap-1 px-2">
				<p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">{item.title}</p>
				<span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
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
				<p className="font-medium">{item.title}</p>
				<span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
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
						<li
							key={`${item.type}-${item.id}`}
							className="flex flex-col items-center rounded-2xl border border-muted p-2"
						>
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
