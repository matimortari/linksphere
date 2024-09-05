export default function LinkItem({ url, title }) {
	return (
		<li className="my-2 flex flex-col items-center justify-center">
			<div className="rounded-lg border border-foreground p-2">
				<a href={url} className="text-foreground hover:underline">
					{title}
				</a>
			</div>
		</li>
	)
}
