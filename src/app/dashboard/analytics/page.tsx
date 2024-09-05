import Sidebar from "@/src/components/Sidebar"

export default function Analytics() {
	return (
		<div className="h-screen p-4 pt-16">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-4">
					<div className="flex flex-col pb-8">
						<h1 className="text-2xl font-semibold">Analytics</h1>
						<p className="text-muted">View your profile analytics here.</p>
					</div>

					<section className="flex flex-col">
						<p className="mb-2 text-xl font-semibold">TBA</p>
					</section>
				</main>
			</div>
		</div>
	)
}
