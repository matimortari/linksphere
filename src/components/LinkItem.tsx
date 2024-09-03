export default function LinkItem({ url, title }) {
	return (
		<li className="my-2">
			<a href={url} className="text-foreground hover:underline">
				{title}
			</a>
		</li>
	)
}
