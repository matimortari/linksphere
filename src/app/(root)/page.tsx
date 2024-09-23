import { CardCarousel } from "@/src/components/carousel/CardCarousel"
import { Icon } from "@iconify/react"
import { Bowlby_One } from "next/font/google"
import Link from "next/link"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

export default function Home() {
	return (
		<div className="main-container">
			<div className="absolute inset-0 z-0 mt-60 hidden md:block"></div>

			<main className="flex flex-col md:flex-row">
				<section className="flex px-4 pb-8 pt-16 md:w-7/12">
					<div className="flex flex-col items-center gap-6 md:items-start">
						<h1 className={`text-center text-3xl font-bold md:text-left md:text-6xl ${bowlby.className}`}>
							Keep all your stuff together!
						</h1>

						<h2 className={`text-center text-xl font-semibold md:text-left md:text-3xl ${bowlby.className}`}>
							Your link-in-bio page 🔗
						</h2>

						<p className="text-center text-lg text-muted-foreground md:text-left">
							Welcome to <strong>NeSS</strong>! Share your links, social profiles, contact information, and more in one
							convenient page. Create and customize your personalized page and share it seamlessly with your audience.
						</p>

						<hr />

						<form className="form-container">
							<span className="text-muted-foreground">ness-live.vercel.app/</span>
							<input type="text" placeholder="your_name" className="input flex-1" />
							<Link href="/login" className="button bg-primary text-primary-foreground">
								Get Started!
							</Link>
						</form>

						<hr className="my-12 w-full" />

						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:paint-brush-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Customizable Themes</p>
									<span className="text-muted-foreground">
										Customize your page with a variety of themes and colors to match your brand or style.
									</span>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:infinity-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Unlimited Links</p>
									<span className="text-muted-foreground">
										Add as many links as you want to your page, with no restrictions.
									</span>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:seo-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">SEO Friendly</p>
									<span className="text-muted-foreground">
										Optimized for search engines to help you get discovered.
									</span>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:line-chart-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Detailed Analytics</p>
									<span className="text-muted-foreground">
										Track your page views, link clicks, and more with detailed analytics.
									</span>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:share-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Share Across All Platforms</p>
									<span className="text-muted-foreground">
										Share your page on social media, email, or anywhere else to reach your audience.
									</span>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<span className="rounded-full bg-muted p-2">
									<Icon icon="ri:price-tag-3-fill" />
								</span>
								<div>
									<p className="text-lg font-bold">Free to Use!</p>
									<span className="text-muted-foreground">
										NeSS is completely free to use, with no hidden fees or charges.
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="flex px-4 pb-8 pt-16 md:w-6/12">
					<div className="w-full">
						<CardCarousel />
					</div>
				</section>
			</main>
		</div>
	)
}
