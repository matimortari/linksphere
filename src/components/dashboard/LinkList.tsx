"use client"

import { UserLink } from "@prisma/client"

interface LinkListProps {
	links: UserLink[]
}

export default function LinkList({ links }: LinkListProps) {
	return (
		<div className="w-[542px] space-y-2">
			{links.length > 0 ? (
				<ul className="list-inside list-disc space-y-2">
					{links.map((link) => (
						<li key={link.id} className="content-container flex items-center overflow-hidden">
							<div className="flex flex-col justify-start gap-1">
								<p>{link.title}</p>
								<a href={link.url} className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
									{link.url}
								</a>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted-foreground">No links available</p>
			)}
		</div>
	)
}
