export default function LinkItem({ url, label }) {
	return (
		<li className="my-2">
			<a href={url} className="text-foreground hover:underline">
				{label}
			</a>
		</li>
	)
}
