"use client"

import Sidebar from "@/src/components/Sidebar"

export default function Settings() {
	return (
		<div className="h-screen p-4">
			<div className="flex flex-row">
				<Sidebar />

				<main className="p-8">
					<div className="flex flex-col pb-4">
						<h1 className="text-2xl font-semibold">Settings</h1>
						<p className="text-muted">Update your account settings here.</p>
					</div>

					<div className="rounded-lg border border-muted p-4"></div>
				</main>
			</div>
		</div>
	)
}
