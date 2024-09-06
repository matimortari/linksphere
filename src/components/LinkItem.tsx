export default function LinkItem({ url, title }) {
	return (
		<li className="flex w-full flex-col items-center justify-center">
			<a href={url} className="flex w-full justify-center text-foreground">
				<div className="min-w-[40vw] max-w-full rounded-3xl bg-background px-10 py-4 text-center hover:bg-secondary">
					<p className="text-base font-medium text-accent">{title}</p>
				</div>
			</a>
		</li>
	)
}
