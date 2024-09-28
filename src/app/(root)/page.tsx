import { CardCarousel } from "@/src/components/carousel/CardCarousel"
import { Icon } from "@iconify/react"
import { Bowlby_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

export default function Home() {
	return (
		<div className="main-container relative">
			<div className="absolute inset-x-0 bottom-0 h-3/6 opacity-35">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<main className="relative flex flex-col md:flex-row">
				<section className="flex px-4 py-16 md:w-6/12">
					<div className="flex flex-col items-center gap-4 md:items-start">
						<h1 className={`text-center text-3xl font-bold md:text-left md:text-6xl ${bowlby.className}`}>
							Keep all your stuff together!
						</h1>

						<h2 className={`text-center text-xl font-semibold md:text-left md:text-3xl ${bowlby.className}`}>
							Your link-in-bio page 🔗
						</h2>

						<p className="text-center text-lg text-muted-foreground md:text-left">
							Welcome to <strong>LinkSphere</strong>! Share your links, social profiles, contact information, and more
							in one convenient page. Create and customize your personalized page and share it with your audience.
						</p>

						<form className="form-container">
							<span className="text-muted-foreground">linksphere-live.vercel.app/</span>
							<input type="text" placeholder="your_name" className="input flex-1" />
							<Link href="/login" className="button bg-primary text-primary-foreground">
								Get Started!
							</Link>
						</form>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="content-container flex items-start gap-2">
								<span className="icon rounded-full bg-muted p-2">
									<Icon icon="ri:paint-brush-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Fully Customizable</p>
									<span className="text-muted-foreground">
										Customize your page with any color you want, add shadows, or change the size of your links.
									</span>
								</div>
							</div>

							<div className="content-container flex items-start gap-2">
								<span className="icon rounded-full bg-muted p-2">
									<Icon icon="ri:infinity-fill" />
								</span>
								<div>
									<p className="font-bold">Unlimited Links</p>
									<span className="text-muted-foreground">
										Add as many links or social buttons as you want to your personal page.
									</span>
								</div>
							</div>

							<div className="content-container flex items-start gap-2">
								<span className="icon rounded-full bg-muted p-2">
									<Icon icon="ri:line-chart-fill" />
								</span>
								<div>
									<p className="font-bold">Detailed Analytics</p>
									<span className="text-muted-foreground">
										Track your page views, link clicks, and more with detailed analytics.
									</span>
								</div>
							</div>

							<div className="content-container flex items-start gap-2">
								<span className="icon rounded-full bg-muted p-2">
									<Icon icon="ri:price-tag-3-fill" />
								</span>
								<div>
									<p className="font-bold">Free to Use!</p>
									<span className="text-muted-foreground">
										LinkSphere is completely free to use, with no hidden fees or charges.
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="flex px-4 py-16 md:w-6/12">
					<div className="w-full">
						<CardCarousel />
					</div>
				</section>
			</main>
		</div>
	)
}
